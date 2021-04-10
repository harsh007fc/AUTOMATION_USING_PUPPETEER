let fs = require("fs");

console.log("before");

 let f1p = fs.promises.readFile("f1.txt");
 let f2p =fs.promises.readFile("f2.txt");
 let f3p =fs.promises.readFile("f3.txt");
 let f4p =fs.promises.readFile("f4.txt");

 f1p.then(cb);
 f2p.then(cb);
 f3p.then(cb);
 f4p.then(cb);
 
function cb(data,err)
{
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log("Content->"+data);
    }
}
console.log("after");