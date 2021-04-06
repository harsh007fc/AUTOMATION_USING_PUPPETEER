let fs = require("fs");
console.log("before");


//callback is an older way to do async programming
// fs.readFile("f1.txt",function cb(err,data,res)
// {
//     if(err)
//     {
//         console.log(err);
//     }
//     else
//     {
//         console.log("data->"+data);
//     }

// });


//promise ki initial state pending hoti  hai 
// let promise = fs.promises.readFile("f1.txt");//with settimeout and .then
// console.log("INItial state",promise);//same commenta as above line
console.log("after");



let promise = fs.promises.readFile("f2.txt");
console.log("INItial state",promise);

//consumer function ->it will bea called when a promise  is fulfilled
promise.then(function (data)
{
    console.log(data);
})

//if an err occcurs
promise.catch(function (err)
{
    console.log("err->",err);
})



//set timeout acha tarika nhi hai kyunki humein asli task ka ni pta kitna tym lega voh
// setTimeout(() => {
//     console.log("final state",promise);
// },2000);

console.log("hello");