//Required Modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = 5000;
const app = express();

app.use(express.json({limit:'10mb'}));
app.use(cors({
    origin: 'https://transaction-system-frontend.vercel.app', // Frontend URL for CORS
    credentials: true
}));

//Connection
mongoose.connect(`mongodb+srv://nimish1308:Nimish1308@employee.4zjpt.mongodb.net/?retryWrites=true&w=majority&appName=employee`).then(() => {
    console.log("DB Connected")
}).catch(() => {
    console.log("DB Connection Failed")
})

//Schema    
const empSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    field: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photo:{
        type:String,
        required:false
    }
},
    { timestamps: true }
)

//Collection
const Emp=mongoose.model('employee',empSchema);

//API
app.get("/", (req, res) => {
    res.send(`!!!!!!Sample API is running!!!!!!`)
})

//Create
app.post("/create",async(req,res)=>{
    try {
        const empBody=req.body;
        const empObject=new Emp(empBody);
        const empSave=await empObject.save();
        res.send(empSave)
    } catch (error) {
        res.send(error)
    }
})

//Find by id
app.get("/findbyid/:id",async(req,res)=>{
    try {
        const id=req.params.id;
        const data=await Emp.findById({_id:id});
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})

//Find all
app.get("/find",async(req,res)=>{
    try {
        const data=await Emp.find({});
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})

//Update
app.put("/update/:id",async(req,res)=>{
    try {
        const id=req.params.id;
        const data=await Emp.findByIdAndUpdate({_id:id},req.body,{new:true});
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})

//Delete
app.delete("/delete/:id",async(req,res)=>{
    try {
        const id=req.params.id;
        const data=await Emp.findByIdAndDelete({_id:id});
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})

//Delete all
app.delete("/deleteall",async(req,res)=>{
    try {
       
        const data=await Emp.deleteMany({});
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})
app.listen(PORT, () => {
    console.log(`Server is running at port no :${PORT}`)
})

module.exports = app;