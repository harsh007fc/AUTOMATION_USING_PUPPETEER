//callBack -> Promise mein convert kiya ja skta hai

//nodejs -> fs.promises.redFile
//resolve -> work complete
//reject -> work fail


let fs = require("fs");
function promiseReadFile(filePath)
{
    //starting mein return  -> pensding state promise
    return new Promise(function(resolve,reject)
    {
        fs.readFile(filePath, function cb(err, data, res) {
            if (err) {
                // console.log(err);
                reject(err);
            }
            else {
                resolve(data);
                // console.log("data->" + data);
            }
    
        });
    })


}
//achive user
let fReadPromise = promiseReadFile("f1.txt");


console.log(fReadPromise);
fReadPromise.then(function (data) {
    console.log("content->" + data);
})
fReadPromise.catch(function (err) {
    console.log("error->" + err);
})