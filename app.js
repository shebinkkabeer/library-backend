require("dotenv").config();
const express=require("express")
const bodyParser=require("body-parser")
const cookieParser=require("cookie-parser")
const cors=require("cors")
const authRoutes=require("./routes/auth")
const userRoutes=require("./routes/user")
const bookRoutes=require("./routes/book")

const mongoose=require("mongoose")
const app=express()

//DB connnection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  });




//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


//PORT

const port=process.env.PORT || 8000;

//Routes
app.use("/api",authRoutes)
app.use("/api",userRoutes)
app.use("/api",bookRoutes)

//Server

app.listen(port,()=>{
    console.log(`Server is running at ${port}`);
})


