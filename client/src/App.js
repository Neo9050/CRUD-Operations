import {GrClose} from "react-icons/gr";
import './App.css';
import { useState } from "react";
import axios from "axios";

axios.default.baseURL="http://localhost:8080/"

function App() {
const [addForm, setAddForm] = useState(false)
const [formData, setFormData] = useState({
  name:"",
  email: "",
  mobile:"",
})

const handleOnChange= (e) => {
  const {value, name} = e.target
  setFormData((preve) => {
    return{
      ...preve,
      [name] : value
    }
  })
}

  const handleSubmit = async(e) => {
    e.preventDefault()
    const data = await axios.post("/create", formData )
    console.log(data)
    // console.log(formData)
  }

  return (
   <>
    <div className="container">
       <button className="btn btn-add" onClick={() => setAddForm(true)}> Add</button>

       {
        addForm && (
          <div className="addContainer">
          <form onSubmit={handleSubmit}>
          <div className="close-btn" onClick={() => setAddForm(false) }>  <GrClose/> </div>
           <label htmlFor="name" >Name:</label>
           <input type="text" id="name" name="name" onChange={handleOnChange}/>

           <label htmlFor="email">Email:</label>
           <input type="email" id="email" name="email" onChange={handleOnChange}/>

           <label htmlFor="mobile">Mobile No:</label>
           <input type="number" id="mobile" name="mobile" onChange={handleOnChange}/>

           <button className="btn" > Submit</button>

        </form>
       </div>
        )
       }
      

    </div>
   </>
  );
}

export default App;
