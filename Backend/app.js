const express = require('express')
const mongoose = require('mongoose');
const app = express()
const cors  = require('cors');

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}));

require("dotenv").config();
app.use(express.json());
app.use("/api/auth", require("./routes/authroutes"));




app.get('/', (req, res) => {
  res.send('The api is running')
})

mongoose.connect(process.env.MONGODB_URI).then(
    ()=> console.log("connected to mongodb")
)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})