//yahaan chaining bhi ho skti hai thens ki
let fs = require("fs").promises;  //ese bhi kr skte hain

console.log("before");
//cons-> yeh hai ki yahaan bhut saare .catch lgane pdenge
let f1p = fs.readFile("f1.txt");
f1p.then(cb);
function cb(data,err)
{
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log("Content->"+data);
        let f2p = fs.readFile("f2.txt");
        f2p.then(cb1);
    }
}
function cb1(data,err)
{
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log("Content->"+data);
        let f3p = fs.readFile("f3.txt");
        f3p.then(cb2);
    }
}
function cb2(data,err)
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