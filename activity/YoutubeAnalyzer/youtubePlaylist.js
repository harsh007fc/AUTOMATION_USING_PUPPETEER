let puppeteer = require("puppeteer");
let fs = require("fs"); 
const { count } = require("console");
//views easily done 
//no of videos easily done
//watch time ->get
//list of videos in exel format ->get
//pehle get kr lo fir loader dekh lenge

//==================CONSOLERUNFNCTN===================
// let arr = document.querySelectorAll("#stats .style-scope.ytd-playlist-sidebar-primary-info-renderer");
// let newarr = [];
// newarr.push(arr[0].innerText,arr[1].innerText);
// console.log(newarr);
//====================================================
// ==========SELECTORS==============================
// selector for durration -> span[class="style-scope ytd-thumbnail-overlay-time-status-renderer"]
//selector for video name-> #video-title
// ===================================================
// =====================STEPS=====================
 //get videoName
// get duration   
      
//steps-> data extract->first set of videos
 // fir scroll
// fir data extract for next set of videos
// ==========================================


console.log("Before");

(async function () {
    try {
        let browserInstance = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized",]
        });
        let newPage = await browserInstance.newPage();

        await newPage.goto("https://www.youtube.com/playlist?list=PLRBp0Fe2GpgnIh0AiYKh7o7HnYAej-5ph");


        let detailsArr = await newPage.evaluate(consoleFn);
        //    console.table(detailsArr);

        let videoCount = detailsArr[0].split(" ")[0];
        videoCount = Number(videoCount);
        console.log(detailsArr[0]);
        console.log(detailsArr[1]);

        

        let currentPageVideoCount =  await scrollToBottom(newPage,"#video-title");

        while (videoCount - 50 > currentPageVideoCount) {
            // console.log("scrolled");
            currentPageVideoCount =  await scrollToBottom(newPage,"#video-title");
        }

        


        let nameNdurationArr = await newPage.evaluate(getStats, "span[class='style-scope ytd-thumbnail-overlay-time-status-renderer']", "#video-title");

        // console.table(nameNdurationArr);
        console.log(currentPageVideoCount);

    }
    catch (err) {
        console.log(err);
    }
})();


function consoleFn(selector) {
    let Arr = document.querySelectorAll("#stats .style-scope.ytd-playlist-sidebar-primary-info-renderer");
    let newArr = [];
    newArr.push(Arr[0].innerText, Arr[1].innerText);
    //    console.log(newArr);
    return newArr;
}


function getStats(durationOfVideo,nameOfVideo)
{
    let durationElemsArr = document.querySelectorAll(durationOfVideo);
    let nameElemsArr = document.querySelectorAll(nameOfVideo);
    let nameNdurationArr = [];
    for(let i = 0; i < durationElemsArr.length; i++)
    {
        let duration = durationElemsArr[i].innerText;
        let name = nameElemsArr[i].innerText;
        nameNdurationArr.push({duration,name});
        
    }
    return nameNdurationArr;
}

async function scrollToBottom(page,nameOfVideo)
{
    function getLengthConsoleFn(nameOfVideo)
    {
        window.scrollBy(0,window.innerHeight);
        let nameElemsArr = document.querySelectorAll(nameOfVideo);
        console.log("titleLength",nameElemsArr.length);
        if(nameElemsArr.length == 899)
        {
            console.log(nameElemsArr);
        }
        return nameElemsArr.length;
    }
    
    return page.evaluate(getLengthConsoleFn,nameOfVideo);    
}

console.log("After");