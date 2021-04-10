let fs = require("fs");
let arr = ["./f1.txt", "./f2.txt", "./f3.txt", "./f4.txt"];
// parallely read 
console.log("before");
for (let i = 0; i < arr.length; i++) {
    let frp = fs.promises.readFile(arr[i])
    frp.then(cb)
}
console.log("after");

function cb(data,err) {
    if (err) {
        console.log(err);
    } else {
        console.log("data->" + data);
    }
}