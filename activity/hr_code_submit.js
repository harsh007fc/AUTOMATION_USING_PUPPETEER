//extra code deleted but i can see it in github commits
//actually promises are not used in production level
//at production level we use ->async await
let puppeteer = require("puppeteer");
let {email,password} = require("../raw/pocs/secrets");
let {codes} = require("./code");
let page;
console.log("before");

let browserPromise = puppeteer.launch({
    headless :false,
    defaultViewport:null,
    args:["--start-maximize"]
})


browserPromise.then(function (browserInstance)
{
    let newTabpromise = browserInstance.newPage();
    return newTabpromise;
}).then(function (newTab)
{
    page = newTab;//tab capture kiya yahaan
    let loginPageWillBeOpenedPromise = newTab.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
    return loginPageWillBeOpenedPromise;
}).then(function ()
{
    let emailWillBeTypedPromise  = page.type("#input-1",email,{delay:200});
    return emailWillBeTypedPromise;
    // console.log("login page opened");
}).then(function ()
{
    let passwordWillBeTypedPromise  = page.type("#input-2",password,{delay:200});
    return passwordWillBeTypedPromise;
    // console.log("login page opened");
}).then(function ()
{
    let loginPageWillBeClickedPromise = page.click("button[data-analytics='LoginPassword']");
    return loginPageWillBeClickedPromise;
}).then(function ()
{
    
    let clickIpKit = waitAndClick(".card-content h3[title='Interview Preparation Kit']");
    return clickIpKit;
})

.then(function ()
{
    let warmupClick =  waitAndClick("a[data-attr1='warmup']");
    return warmupClick;
}).then(function()
{
    // console.log(url);  //just url print kraya tha
    let url = page.url();
    let questionObj = codes[0];
    
    //call questionsolver
    let fqsp = questionSolver(url,questionObj.qname,questionObj.soln);
    for(let i = 1; i < codes.length; i++)
    {
        fqsp = fqsp.then(function()
        {
            return questionSolver(url,codes[i].qname,codes[i].soln);
        })
    }
    return fqsp;
}).then(function ()
{
    console.log("CODE SUBMITTED");
}).catch(function (err)
{
    console.log(err);
})


function waitAndClick(selector)
{
    return new Promise(function (resolve,reject)
    {
        let selectorWaitPromise = page.waitForSelector(selector,{visible:true});

        selectorWaitPromise.then(function ()
        {
            let selectorClickPromise =  page.click(selector);
            return selectorClickPromise;
        }).then(function ()
        {
            resolve();
        }).catch(function(err)
        {
            reject(err);
        })
    })
}

//question solver function starts here
function questionSolver(modulePageUrl,questionName,code)
{
    return new Promise(function (resolve,reject)
    {
        //page visit
        let reachedPageUrlPromise = page.goto(modulePageUrl);
        reachedPageUrlPromise.then(function()
        {
// page h4 ->maching h4->click krvana hai
         //below fnctn will run in console of browser
          function browserconsolerunFn(questionName)
          {
              let allH4Elems = document.querySelectorAll("h4");
               let textArr =  [] ;
               for(let i = 0 ; i < allH4Elems.length ; i++)
               {
                   let myQuestion = allH4Elems[i].innerText.split("\n")[0];//sbke text ko \n se split krke pehla ele utha liya
                   textArr.push(myQuestion);
               }
                
               let idx = textArr.indexOf(questionName);
               console.log(idx); //yeh browser k console pr print hoga
               allH4Elems[idx].click(); //yeh dom wala click hai puppeteer wala ni
          }
          let pageClickPromise = page.evaluate(browserconsolerunFn,questionName);//evaluate built-in fnctn hai pupaeteer ka aur yeh console k andr chalta hai browseer k
          
          return pageClickPromise;
        })
        .then(function()  //checkbox pr click
        {
            let inputWillBeClickedPromise = waitAndClick(".custom-checkbox.inline");
            return inputWillBeClickedPromise;
        }).then(function()  //type inside checkbox
        {
          let codeWillBeTypedPromise =  page.type(".custominput",code); 
          return codeWillBeTypedPromise;
        }).then(function()   //control is hold down
        {
            //yeh bhi google kiya kaise use krte hein ctrl+a in puppeteer
            let controlIsHoldPromise = page.keyboard.down("Control");
            return controlIsHoldPromise;
            // page.keyboard.("A");
        }).then(function()  //a is pressed
        {
            let aIspressPromise = page.keyboard.press("a");
            return aIspressPromise;
        }).then(function()  //x is pressed
        {
            let cutPromise = page.keyboard.press("x");
            return cutPromise;
        }).then(function(){
            let editorWillBeClickedpromise = page.click(".monaco-editor.no-user-select.vs");
            return editorWillBeClickedpromise;
        }).then(function()  //a is pressed again to select
        {
            let aIspressPromise = page.keyboard.press("a");
            return aIspressPromise;
        }).then(function()  //v is pressed
        {
            let vIspressPromise = page.keyboard.press("v");
            return vIspressPromise;
        }).then(function()  //ctrl is released  
        {
            let controlIsReleasedPromise = page.keyboard.up("Control");
            return controlIsReleasedPromise;
        }).then(function () {  //clicked on submit
            let submitIsClickedPromise = page.click(".pull-right.btn.btn-primary.hr-monaco-submit");
            return submitIsClickedPromise;
        }).then(function()
        {
            resolve();
        }).catch(function(err)
        {
            reject(err);
        })
        //question name -> click
        //read ->copy->paste
        //code paste
        //sibmit
    })
}

console.log("after");