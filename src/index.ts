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
app.use(cors());

app.get('/health' , async (res:Response , req:Request ) =>{
    res.send({message:"Health ok"})
})

app.use("/api/my/user" , MyUserRoute);
 

app.listen(8080 , () =>{
    console.log("Server Listening on port:8080");
})