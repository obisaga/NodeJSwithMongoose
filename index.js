import express from 'express';
import 'dotenv/config';
import client from './db/db.js';
import studentRouter from './routes/student.js';


const app = express();
app.use(express.json());
app.use('/api/students', studentRouter);


const port = process.env.PORT || 3000;

client.on('connected', () => {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`)
    })
})

