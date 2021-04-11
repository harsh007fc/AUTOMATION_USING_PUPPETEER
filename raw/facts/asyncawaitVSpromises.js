const { Console } = require("console");
let fs = require("fs");

let frp = fs.promises.readFile("f1.txt");

console.log("before");

// frp.then(cb);
// function cb(data)
// {
//     console.log("data->"+data);
//     return fs.promises.readFile("f2.txt");
// }
// ====================FACTS OF THIS CODE==========
//1->await is nothing but alternative of then
//2-> await always lis in bw async function
// 3-> dont forgot to call async function of make it an IIFE
// 4-> async await is syntactical sugar for consuming promises
// async fnctn will stop for await but  js stack doesnt stop for await
// ================================================

//==============AWAIT WALA CODE HAI YEH========================
(async function ()
{
     let frp = fs.promises.readFile("f1.txt");
     console.log("before adding await");
     let data = await frp;
     console.log("data->"+data);
     console.log("after reading data of of file 1");
     let f2p = fs.promises.readFile("f2.txt");
     data = await f2p;
     console.log("data->"+data);
     console.log("after reading data of file 2");
})();
//=========================================



// ================then wala coe hai yeh====================
// (async function ()
// {
//      let frp = fs.promises.readFile("f1.txt");
//      console.log("before adding await");
//      frp.then(function(data)
//      {
//         console.log("data->"+data);
//         console.log("after reading data of file 1");
//         let f2p =  fs.promises.readFile("f2.txt");
//         return f2p;
//      }).then(function(data)
//      {
//          console.log("data->"+data);
//          console.log("after reading data of file 2");
//      })
     
// })();
// ================================================




console.log("after");
console.log("other");