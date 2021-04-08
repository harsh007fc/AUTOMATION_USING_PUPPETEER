let puppeteer = require("puppeteer");
let {email,password} = require("./secret");

let browserWillBeLaunchedPromise = puppeteer.launch( //browser launch ka promise
    {headless : false,
    defaultViewport: null,
    args:['--start-maximized']});

let page;


browserWillBeLaunchedPromise.then(function(browserInstance)  //page launch ka promise
{
    let newPagePromise = browserInstance.newPage();
    return newPagePromise;
}).then(function(newTab)                           ////new Tab  ka promise
{
    page = newTab; //capture kiya tab yahaan
    let loginPageOpenPromise = newTab.goto("https://www.facebook.com/?stype=lo&jlou=Afc2OyCs0CCFZq_gaeh2iMEJ6y0bKyAYgMf0TK8NlsmIEx6EC76SOe7a5oYV0TlOvPS2g4JqyHSzMljPvoL_iSCw_PfdcY9S-xx0fDNMOyUhPQ&smuh=51563&lh=Ac9Wyhx-yGb4QQv--Zo");
    return loginPageOpenPromise;
}).then(function()
{
    let emailWillBeTypedPromise = page.type("#email",email,{delay:200});       //email typing with delay
    return emailWillBeTypedPromise;
}).then(function()
{
    let passwordWillBeTypedPromise = page.type("#pass",password,{delay:200}); //password typing with delay
    return passwordWillBeTypedPromise;
}).then(function()
{
    let loginWillBeClickedPromise = page.click("button[name='login']");   //clicking on login button
    return loginWillBeClickedPromise;
}).then(function()
{
    let clickAwayPromise = waitAndClick("div[aria-label='Facebook']");   //click away to get rid of popup
    return clickAwayPromise;
}).then(function()
{
    let clickOnFacebookIconPromise = waitAndClick("a[aria-label='Home']");  //click on facebook icon to go to home
    return clickOnFacebookIconPromise;
}).then(function()
{
    console.log("logged into facebook and went to home page successfully");
}).catch(function (err)
{
    console.log(err);
})

    


function waitAndClick(selector) {
return new Promise(function(resolve,reject)
{
    let selectorWaitPromise = page.waitForSelector(selector,{visible:true})   //waitForSelector is inbuilt of puppetter and it takes two param as given
    
    selectorWaitPromise.then(function()
    {
        // let clickOnSelectorPromise = page.click("div[data-pagelet='root']");  //click away selector to avoid notification popup
        let clickOnSelectorPromise = page.click(selector); 
        return clickOnSelectorPromise;
    }).then(function ()
    {
        resolve();
    }).catch(function(err)
    {
        reject(err);
    })
})
}
