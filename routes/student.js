import express from 'express';
const studentRouter = express.Router();
import Student from '../models/Student.js';

studentRouter.get("/", async (req, res) => {
    try {
      const response = await Student.find();
      res.json(response)

    } catch(err){
        res.status(500).json(err)
    }
})

studentRouter.get("/id/:id", async (req, res) => {
    const {id} = req.params;
    try {
      const response = await Student.findById(id);
      res.json(response)

    } catch(err){
        res.status(500).json(err)
    }
})



studentRouter.post("/", async (req, res) => {
    try {
      const {name, first_name, email} = req.body;
      const response = await Student.create({name, first_name, email});

     res.json(response)
     
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


studentRouter.put("/id/:id", async (req, res) => {
    try {
        const {name, first_name, email} = req.body;
        const {id} = req.params;
        const response = await Student.findByIdAndUpdate(id, {name, first_name, email});
        console.log(response);
        res.json(response)
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
            res.status(404).json({message: `Student with given id doesn't exist`})
        } else {
            res.json({ message: 'User deleted', data: response })}
    } catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})







export default studentRouter;