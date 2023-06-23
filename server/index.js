import express from "express";
import cors from "cors";
import mongoose from 'mongoose';

const app = express();
app.use(cors());
app.use(express.json());

// Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
},
{
  timestamps: true,
});



const userModel = mongoose.model('user', userSchema);

//read
//http://localhost:8080/
app.get('/', async (req, res) => {
  const data = await userModel.find({});
  res.json({ success: true, data: data });
});

//create || save data
//http://localhost:8080/create
/*
{
    "name" : "name",
    "email" : "akjhg23@gmail.com",
    "mobile" : 87675432323
}
*/
app.post('/create', async(req,res)=>{
    console.log(req.body)
    const data = new userModel(req.body)
    await data.save()

    res.send({success: true, message:"Data saved in mongodb", data : data})
})

//update
//http://localhost:8080/update
/*
{
    "id" : "",
    "name" : "name",
    "email" : " nskjdh626@gmail.com"
    "mobile" : 8765423454
}
*/

app.put('/update', async(req,res) =>{
 console.log(req.body)
 const { id, ...rest} = req.body

 console.log(rest)
 const data = await userModel.updateOne({_Id:id},rest)
 res.send({success:true, message:'Data updated Successfully', data:data})
})

//delete
//http://localhost:8080/delete/647e88ab464344c207902f77
//http://localhost:8080/delete/:id
app.delete("/delete/:id", async(req,res) => {
    const id = req.params.id
    console.log(id)
    const data = await userModel.deleteOne({_id:id})
    res.send({success:true, message :"data deleted successfully", data:data})
} )
// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://user01:user02@cluster0.azytdvr.mongodb.net/sampledb?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    const PORT = process.env.PORT || 8080;
    console.log('Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });
