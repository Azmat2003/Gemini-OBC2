import express from 'express';
import "dotenv/config";
import cors from 'cors';

// Routes
import chatRoutes from './routes/chatRoutes.js'


const app = express();


// middleware
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res)=>{
    res.send('Running...');
})

app.use('/api/chat', chatRoutes);

app.listen(PORT, ()=>{
    console.log("Running on port",PORT);
})
