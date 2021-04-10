let fs = require("fs");

console.log("before");

fs.readFile("f1.txt","utf8",cb);
fs.readFile("f2.txt","utf8",cb);
fs.readFile("f3.txt","utf8",cb);
fs.readFile("f4.txt","utf8",cb);

function cb(err,data)
{
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log("Content->",data);
    }
}
console.log("after");