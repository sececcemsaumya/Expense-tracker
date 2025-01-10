const fs = require('fs')
const http = require('http')
/*fs.readFile('./sample.txt','utf8',(err,data)=>{
    if(err){
        console.log("Cannot open file");
        return ;
    }
        console.log(data);
    
})
fs.readFile('./sample.json','utf8',(err,data)=>{
    if(err){
        console.log("Cannot open file");
        return ;
    }
        //console.log(data);  reads the data from the json file in string format
        console.log(JSON.parse(data)); //converts the data read in string to json format
    
})*/
/*fs.readFile('./sample.json','utf8',(err,data)=>{
    if(err){
        res.write("Cannot open file");
        return ;
    }
        const users=data; //reads the data from the json file in string format
    

const http = require('http')
const server = http.createServer((req,res)=>{
    res.writeHead(200,{"Content-Type":"text/plain"});
    res.write(users);
    res.end();
});
server.listen(3000,()=>{
    console.log("server is running on port 3000")
})

})*/

fs.readFile('./sample.json','utf8',(err,data)=>{
    if(err){
        console.log("Cannot open file");
        return ;
    }
    const jsonData = JSON.parse(data);
    const filteredData = jsonData.filter((user)=>user.amount>1500);
    fs.writeFile("./data.json",JSON.stringify(filteredData),(err)=>{
        if(err){
            console.log("Error Writing File");
            return;
        }
    });
});

