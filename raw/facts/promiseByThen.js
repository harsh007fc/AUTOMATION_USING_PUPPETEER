let fs = require("fs");

let frP = fs.promises.readFile("f1.txt");
console.log("before");

let thenKp  =frP.then(cb);  //thenKp then ke andr callback pr depend krta hai jo callback return krega vo uski future valure hogi 

console.log("then ka pomise",thenKp)

function cb(data)
{
    console.log("data->"+data);
    return 10; //yeh thenKp ki future value hogi
    // return new Promise;
}

setTimeout(function()
{
    console.log("then ka promise",thenKp);
},1000);

console.log("after");
console.log("```````````````````````````````````");

//conslusion hai ki

// thenKp depends upon cb return value
// return value -> get value
// return nothing-> get undefined
// return pending promise -> thenKp will wait for that pending promise
// return error -> then will not run
