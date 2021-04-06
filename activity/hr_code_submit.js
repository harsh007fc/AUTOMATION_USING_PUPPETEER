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
    
    // let combinedPromise1 = Promise.all([loginPageWillBeClickedPromise,page.waitForNavigation({waitUntil:"networkidle0"})]);
    // return combinedPromise1;

    let loginPageWillBeClickedPromise = page.click("button[data-analytics='LoginPassword']");
    return loginPageWillBeClickedPromise;
}).then(function ()
{
    
    // let clickOnInterviwPrepPromise = page.click(".card-content h3[title='Interview Preparation Kit']");
    // let warmupChallengeElePromise = page.waitForSelector("a[data-attr1='warmup']",{visible:true});
    // let combinedPromise2 = Promise.all([clickOnInterviwPrepPromise,page.waitForNavigation({waitUntil:"networkidle0"}),warmupChallengeElePromise]);
    // return combinedPromise2;


    let clickIpKit = waitAndClick(".card-content h3[title='Interview Preparation Kit']");
    return clickIpKit;
})
// .then(function ()
//     {
//         let warmupChallengeElePromise = page.waitForSelector("a[data-attr1='warmup']",{visible:true});
//         return warmupChallengeElePromise;
//     }
// )
.then(function ()
{
    // let clickOnWarmupChallenges= page.click("a[data-attr1='warmup']");
    // let sockmerchantPromise = page.waitForSelector("a[data-attr1='sock-merchant']",{visible:true});
    // let combinedPromise3 = Promise.all([clickOnWarmupChallenges,page.waitForNavigation({waitUntil:"networkidle0"}),sockmerchantPromise]);
    // return combinedPromise3;

    let warmupClick =  waitAndClick("a[data-attr1='warmup']");
    return warmupClick;
}).then(function ()
{
    return page.url(); //google se mila search krke yeh
}).then(function(url)
{
    // console.log(url);  //just url print kraya tha
    let questionObj = codes[0];
    
    //call questionsolver
    questionSolver(url,questionObj.qname,questionObj.soln);
})





// .then(function () // yeh snippet selector ka wait krne k liye hai
// {                  ///yeh kaam upr hi kr dete hai
//     let sockmerchantPromise = page.waitForSelector("a[data-attr1='sock-merchant']",{visible:true});
//     return sockmerchantPromise;
// })
// .then(function () //question pr click
// {
//     // let clickOnFirstQues= page.click("a[data-attr1='sock-merchant']"); 
//     // return clickOnFirstQues;

//     let clickOnQuestionFirst = waitAndClick("a[data-attr1='sock-merchant']");
//     return clickOnQuestionFirst;
// })
// .then(function (){ //yeh hai khud ka promise
//     let questionSolverPromise = questionSolver();
//     return questionSolverPromise;
// })
.then(function ()
{
    console.log("CODE SUBMITTED");
}).catch(function (err)
{
    console.log(err);
})



//promise based function -> that do wait and then click
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

//question solver function starts her
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
        // .then(function()
        // {
        //     let codeIsTypedIntoInput = typeCodeIntoInput(code);
        //     return codeIsTypedIntoInput; 
        // })
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
        }).then(function () {  //clicked on submit
            let submitIsClickedPromise = page.click(".pull-right.btn.btn-primary.hr-monaco-submit");
            return submitIsClickedPromise;
        }).then(function()  //ctrl is released  
        {
            let controlIsReleasedPromise = page.keyboard.up("Control");
            return controlIsReleasedPromise;
        })
        .then(function()
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


//-------------------------------------------------------------------------------------------
//settinghandler fnctn
//===========================================start=========================================
// function settingHandler()
// {
//     return new Promise(function(resolve,reject)
//     {
//         //first wait to load then click 
//         let settingClickPromise = waitAndClick("button[aria-label='Editor Settings']");

//         settingClickPromise.then(function()
//         {
//             let autoCompleteDisablePromise = waitAndClick("button[aria-label='Disable Autocomplete']");
//             return autoCompleteDisablePromise;
//         }).then(function()
//         {
//             let settingAgainClickPromise = page.click("button[aria-label='Editor Settings']");
//         }).then(function()
//         {
//             resolve();
//         }).catch(function(err)
//         {
//             reject(err);
//         })

//         //autocomplete disable
        
//         //then click again on setting button
//     })
// }
//==========================================END=====================================================
//---------------------------------------------------------------------
//this is just a statement










//=========================================
// .then(function(){
//     let editorWillBeClickedpromise = page.click(".monaco-editor.no-user-select.vs");
//     return editorWillBeClickedpromise;
    
// }).then(function()
// {
//     //yeh bhi google kiya kaise use krte hein ctrl+a in puppeteer
//     let controlIsHoldPromise = page.keyboard.down("Control");
//     return controlIsHoldPromise;
//     // page.keyboard.("A");
// }).then(function()
// {
//     let aIspressPromise = Page.keyboard.press("a");
//     return aIspressPromise;
// }).then(function()
// {
//     let controlIsReleasedPromise = page.keyboard.up("Control");
//     return controlIsReleasedPromise;
// }).then(function()
// {
//     let backSpacePressedPromise = page.keyboard.press("Backspace");
//     return backSpacePressedPromise;
// }).then(function(){

//     page.type(".inputarea",code);
// })

//===============================================================