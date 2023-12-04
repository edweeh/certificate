import { Button, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Certificate = () => {

    var [inputs,setInputs]=useState({"sid":'',"qualification":''})
    var[students,setStudents] = useState([]);
    var[selectedimage,setSelectedimage] = useState(null);


    useEffect(()=>{
        axios.get("http://localhost:4005/sview")
        .then(response =>{
            console.log(response.data)
            setStudents(response.data)
        })
        .catch(err=>console.log(err))
    },[])


    const inputhandler =(event)=> {
        const {name,value}=event.target
        setInputs((inputs)=>({...inputs,[name]:value}))
        console.log(inputs)
    }

    const handleimage =(event)=>{
        const file = event.target.files[0];
        setSelectedimage(file)
        inputs.certphoto=file;
    }

    const savedata =()=>{
        const formdata = new FormData();
        formdata.append('sid',inputs.sid);
        formdata.append('qualification',inputs.qualification);
        formdata.append('certphoto',selectedimage)

        fetch('http://localhost:4005/certnew',
        {method:'post',body:formdata,})
        .then((response)=>response.json())
        .then((data)=>{
            alert("record saved")
        })
        .catch((err)=>{
           console.log("error")
        })

    }



  return (
    <div>
        <form>
<InputLabel >Studemt Name</InputLabel>
    <Select name="sid" value={inputs.sid} onChange={inputhandler}  >
        {
            students.map((value,index)=>{
                return(
                    <option key={index} value={value._id}>{value.Sname}</option>
                )
            })
        }
    </Select>
    <br/><br/><br/>
  <TextField id="outlined-basic" name="qualification" onChange={inputhandler} value={inputs.qualification} /><br/><br/><br/>
  CERTIFICATE<input type="file"   onChange={handleimage}/><br/><br/><br/>
  <Button variant="outlined" onClick={savedata}>SUBMIT</Button>
  </form>
    </div>
  )
}

export default Certificate
