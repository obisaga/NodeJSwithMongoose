import express from 'express';
const studentRouter = express.Router();
import Student from '../models/Student.js';

studentRouter.get("/", async (req, res) => {
    try {
      const response = await Student.find();
      const numberOfStudents = await Student.countDocuments({});
      res.json({"studentsCount": numberOfStudents, details: response})

    } catch(err){
        res.status(500).json(err)
    }
})

studentRouter.get("/id/:id", async (req, res) => {
    const {id} = req.params;

    try {
        const response = await Student.findById(id);
        res.json(response);

    } catch(err) {
        res.status(404).json(`Student with ID: ${id} not found.`);
        
    } 
})



studentRouter.post("/", async (req, res) => {
    try {
      const {name, first_name, email} = req.body;
      const response = await Student.create({name, first_name, email});

     res.status(201).json({message: "Student account created", details: response})
     
    } catch(err){
        res.status(500).json(err)
    }
})



studentRouter.put("/name/:name", async (req, res) => {
    try {
        const {name} = req.params;
        const {newname} = req.body;
        const response = await Student.updateMany({ name }, { $set: { name: newname } });
            if(response.modifiedCount > 0) {
            const data = await Student.find({ name: newname});
            res.json(data)
          } else {
            res.json('Nothing to change')
            }
        
    } catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})


// by using runValidators: true  validation makes an error because of the  email - it says it already exists 
// FIND a way to resolve this problem

studentRouter.put("/id/:id", async (req, res) => {
    const {name, first_name, email} = req.body;
    const {id} = req.params;
    const opts = { runValidators: true };
    try {      
        const response = await Student.findByIdAndUpdate(id, {name, first_name, email}, opts);
        if (response === null) {
            res.status(404).json({message: `Student with ID ${id} doesn't exist`})
        }
        const updated = await Student.findByIdAndUpdate(id);
        res.status(201).json({message:"Data changed successfully", data: updated})

    } catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

studentRouter.delete("/:id", async (req, res) => {
    const {id} = req.params;

    try {
        const response = await Student.findByIdAndDelete(id);
        if (response === null) {
            res.status(404).json({message: `Student with ID ${id} doesn't exist`})
        } else {
            const updatedList = await Student.find();
            const numberOfStudents = await Student.countDocuments({});
            res.json({ message: `Student ${id} deleted from the list`,  remaining: numberOfStudents, students: updatedList})}
          
    } catch(err){
        res.status(500).json(err)
    }
})




export default studentRouter;