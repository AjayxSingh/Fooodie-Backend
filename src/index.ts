import  express , {Response , Request}  from "express";
import cors from 'cors'
import "dotenv/config"
import mongoose from "mongoose";
import MyUserRoute from './routes/MyUserRoutes'
mongoose
.connect(process.env.MONGODB_CONNECTION_STRING as string)
.then(()=>{
    console.log("Database Connected");
})


const app = express();

app.use(express.json());
const corsOptions = {
    origin: 'https://fooodie-frontend.onrender.com',
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
  };
app.use(cors(corsOptions));

app.get('/health' , async (res:Response , req:Request ) =>{
    res.send({message:"Health ok"})
})

app.use("/api/my/user" , MyUserRoute);
 

app.listen(8080 , () =>{
    console.log("Server Listening on port:8080");
})
