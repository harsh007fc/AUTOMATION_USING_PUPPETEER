let puppeteer = require("puppeteer");


let fs = require("fs"); 
let links = ["https://www.amazon.in/","https://www.flipkart.com/","https://paytmmall.com/"];

let pName = process.argv[2];

console.log("Before");

(async function () {
    try 
    {
        let browserInstance = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized",]
        });
       
       let amazonArr =  await getListingsFromAmazon(links[0],browserInstance,pName);
       console.log("Amazon Prices");
    console.table(amazonArr);
       let flipkartArr = await getListingsFromFlipkart(links[1],browserInstance,pName);
       console.log("Flipcart Prices");
       console.table(flipkartArr);
       let paytmArr = await getListingsFromPaytm(links[2],browserInstance,pName);
       console.log("Paytm Prices");
       console.table(paytmArr);
       
    }
    catch (err)
    {
        console.log(err);
    }
})();


//it takes product name,site link,browserInstance
// give us -> price and full names of matching top five products
async function getListingsFromAmazon(link,browserInstance,pName)
{
    let newPage = await browserInstance.newPage();
     await newPage.goto(link);
     await newPage.type("#twotabsearchtextbox",pName,{delay:200});
     await newPage.click("#nav-search-submit-button");
     await newPage.waitForSelector(".a-price-whole",{visible:true});
     await newPage.waitForSelector(".a-size-medium.a-color-base.a-text-normal",{visible:true});


     function consoleFn(priceSelector,nameSelector){
        let priceArr = document.querySelectorAll(priceSelector);
        let nameArr = document.querySelectorAll(nameSelector);
        let detailsArr = [];

        for(let i = 0; i < 5; i++)
        {
            let price = priceArr[i].innerText;

            let name =  nameArr[i].innerText;

            detailsArr.push({price,name});
        }

        return detailsArr;
     }
    let detailsArr =  await newPage.evaluate(consoleFn,".a-price-whole",".a-size-medium.a-color-base.a-text-normal");
    return detailsArr;
    // console.table(detailsArr);
};

//=======================SELECTORS of amazon==================================
 //card selector -> .s-include-content-margin.s-border-bottom.s-latency-cf-section

    //  name selector -> .a-size-medium.a-color-base.a-text-normal

    // price selector -> .a-price-whole
//====================================================================

//flipkart wali scrapping
async function getListingsFromFlipkart(link,browserInstance,pName)
{
    let newPage = await browserInstance.newPage();
     await newPage.goto(link);
     await newPage.click("._2KpZ6l._2doB4z")
     await newPage.type("input[title='Search for products, brands and more']",pName,{delay:200});
     await newPage.click("button[type='submit']");
     await newPage.waitForSelector("._4rR01T",{visible:true});
     await newPage.waitForSelector("._30jeq3._1_WHN1",{visible:true});


     function consoleFn(priceSelector,nameSelector){
        let priceArr = document.querySelectorAll(priceSelector);
        let nameArr = document.querySelectorAll(nameSelector);
        let detailsArr = [];

        for(let i = 0; i < 5; i++)
        {
            let price = priceArr[i].innerText;

            let name =  nameArr[i].innerText;

            detailsArr.push({price,name});
        }

        return detailsArr;
     }
    let detailsArr =  await newPage.evaluate(consoleFn,"._30jeq3._1_WHN1","._4rR01T");
    return detailsArr;
    // console.table(detailsArr);
};

//paytmmall wali scrapping
async function getListingsFromPaytm(link,browserInstance,pName)
{
    let newPage = await browserInstance.newPage();
     await newPage.goto(link);
     await newPage.type("#searchInput",pName,{delay:200});
     await newPage.keyboard.press("Enter");
     await newPage.waitForSelector("._1kMS",{visible:true});
     await newPage.waitForSelector(".UGUy",{visible:true});


     function consoleFn(priceSelector,nameSelector){
        let priceArr = document.querySelectorAll(priceSelector);
        let nameArr = document.querySelectorAll(nameSelector);
        let detailsArr = [];

        for(let i = 0; i < 5; i++)
        {
            let price = priceArr[i].innerText;

            let name =  nameArr[i].innerText;

            detailsArr.push({price,name});
        }

        return detailsArr;
     }
    let detailsArr =  await newPage.evaluate(consoleFn,"._1kMS",".UGUy");
    return detailsArr;
    // console.table(detailsArr);
};

console.log("after");