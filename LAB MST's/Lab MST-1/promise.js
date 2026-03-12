let promise = new Promise(function(resolve, reject){
    setTimeout(function(){
        resolve("Data not fetched");
    },2000);
});
promise
.then(function(result){
    console.log(result);
})
.catch(function(error){
    console.log(error);
});