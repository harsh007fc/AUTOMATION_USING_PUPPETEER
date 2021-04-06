//is code se kisi chromium k browser se ek new tab open kr ke ek nye page i.e. desired page pe jaane ka code hai

let puppeteer = require("puppeteer");
//browser launch kiya yahhann
let browserWillBeLaunchedPromise  = puppeteer.launch({
    headless:false  ///yeh visibility of chromium
})


///new tab ka promise mila 
//auryeh code bhi callbackhell jaisa hi hai
// browserWillBeLaunchedPromise
// .then(function (browserInstance)
// {
//     //new tab ka promise
//     let newpagePromise = browserInstance.newPage();
//     newpagePromise.then(function (newPage)
//     {
//         console.log("new tab opened");

//         //go to site ka promise
//         let pageWillBeOpenedPromise = newPage.goto("https://pepcoding.com");

//         pageWillBeOpenedPromise.then(function()
//         {
//             console.log("Page is opened");
//         })
//     })

// })

//same code asa above but here readability will be more

browserWillBeLaunchedPromise
.then(function (browserInstance)
{
    //new tab ka promise
    let newpagePromise = browserInstance.newPage();
    return newpagePromise

}).then(function (newPage)
{
    console.log("new tab opened");

    //go to site ka promise
    let pageWillBeOpenedPromise = newPage.goto("https://pepcoding.com");

    return pageWillBeOpenedPromise
}).then(function()
{
    console.log("Page is opened");
}).catch(function (err)
{
    console.log(err);
})

