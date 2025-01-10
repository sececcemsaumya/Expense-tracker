
/*const app = express();
app.get("/api/sayhello",(req,res)=>{
    res.send("Hello CCE");
    res.end();
});

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})*/
var express = require('express')
const{v4:uuidv4}=require('uuid') //Import uuid
const app = express();
const mongoose = require('mongoose');
app.use(express.json()) //Middleware


mongoose.connect("mongodb+srv://saumya:saumya2005@cluster0.ii2ki.mongodb.net/").then(()=>{
    console.log("connected to database")
})

const expenseSchema = new mongoose.Schema({  //create a schema
    id:{type:String,required:true,unique:true},
    title:{type:String,required:true},
    amount:{type:Number,required:true},
})
const Expenses = mongoose.model("expenses",expenseSchema)  //create a model using schema
app.post("/api/expenses",async(req,res)=>{
    //console.log(req.body)
    const {title,amount}=req.body
    try{
    const newExpense=new Expenses({
        id:uuidv4(), //generates an id automatically
        title:title,
        amount:amount,
    })
    const savedExpense = await newExpense.save()
    //console.log(title)
    //console.log(newExpense)
    res.status(200).json(savedExpense)
}
catch(err){
    res.status(500).json({message:"Error in creating expense"})
}
})
app.get("/api/expenses",async(req,res)=>{
    try{
  const expenses = await Expenses.find()
  res.status(200).json(expenses)
    }
    catch(error){
        res.status(500).json({message:"Failed to fetch expenses"})
    }
})
app.get("/api/expenses/:id",async(req,res)=>{
    try{
        const {id}=req.params
        const expense = await Expenses.findOne({id})
        if(!expense){
            return res.status(404).json({message:"Expense not found"})
        }
        res.status(200).json(expense)
    }
    catch(error){
        res.status(500).json({message:"Error in fetching expenses"})
    }
})
app.put("/api/expenses/:id",async(req,res)=>{
    const {id} = req.params
    const {title,amount} = req.body
    try{
    const updateExpense = await Expenses.findOneAndUpdate(
        {id},
        {title,amount},
    )
    if(!updateExpense){
        return res.status(404).json({message:"Expense  not found"})
    }
    res.status(200).json({message:"Updated Successfully"})
}
catch(error){
    res.status(500).json({message:"Error in updating expense"})
}
})
app.delete("/api/expenses/:id",async(req,res)=>{
    const {id} = req.params
    try{
        const deleteExpense = await Expenses.findOneAndDelete(
            {id}
        )
        if(!deleteExpense){
            return res.status(404).json({message:"Expense  not found"})
        }
        res.status(200).json({message:"Expense deleted Successfully"})
    }
    catch(error){
        res.status(500).json({message:"Error in deleting Expense"})
    }
}   
)
/*app.delete("/api/expenses/:id",async(req,res) => {
    const {id} = req.params ;
    try{
        const deleteExpense = await Expenses.findOneAndDelete(
            {id}
        )
        if(!deleteExpense){
            return res.status(404).json({message: "Expense not found"})
        }
        res.status(200).json(deleteExpense);
    }catch{
        res.status(500).json({message: "Error in deleting expense"});
    }
}
)*/
/*const students =[{
    name:"Suriya",
    age:20,
    rollno:1
},{
    name:"Vijay",
    age:21,
    rollno:2
}]
app.get("/api/sayhello",(req,res)=>{
    res.send("Hello CCE");
    res.end();
});

app.get("/api/student",(req,res)=>{
    res.status(200).json({name:"Akil",age:25});
});

app.get("/api/students",(req,res)=>{
    res.status(200).json(students);
});

/*app.get("/api/students/:rollno",(req,res)=>{
    const {rollno} = req.params;
    const student = students.find((student)=>student.rollno==rollno);
    if(!student){
        res.status(404).json({message:"Student not found"});
    }
    else{
    res.status(200).json(student);
    }
});*/

/*app.get("/api/students/:age",(req,res)=>{
    const {age} = req.params;
    const student = students.find((student)=>student.age==age);
    if(!student){
        res.status(404).json({message:"Student not found"});
    }
    else{
    res.status(200).json(student);
    }
});
*/


app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})