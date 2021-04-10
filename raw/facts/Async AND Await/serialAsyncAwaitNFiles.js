let fs = require("fs");
let arr = ["./f1.txt", "./f2.txt", "./f3.txt", "./f4.txt"];
console.log("before");

//syntax sugar hai async await bs
async function fn() {
    for (let i = 0; i < arr.length; i++) {
        let data;
        data = await fs.promises.readFile(arr[i]);
        console.log("content->" + data);

    }
}

fn(); 

console.log("after");