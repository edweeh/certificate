import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Buffer
 } from 'buffer'
const Certificateview = () => {
    var [certview,setCertview]=useState([])

    useEffect(()=>{
        axios.get("http://localhost:4005/cview")
        .then(response =>{
            console.log(response.data)
            setCertview(response.data)
        })
        .catch(err=>console.log(err))
    },[])

  return (
    <div>
      <Typography>STUDENT VIEW</Typography><br/><br/>
<TableContainer>
<Table >
  <TableHead>
    <TableRow>
      <TableCell >cert ID</TableCell>
      <TableCell >SID</TableCell>
      <TableCell >Sname</TableCell>
      <TableCell >Qualification</TableCell>
      <TableCell>certphoto</TableCell>

    </TableRow>
  </TableHead>
  <TableBody>
      {certview.map((value,index)=>{
          return(
              <TableRow key={index}>
                  <TableCell>{value._id}</TableCell>
                  <TableCell>{value.sid}</TableCell>
                 
                  <TableCell>{value.stud[0].Sname}</TableCell>
                  <TableCell>{value.qualification}</TableCell>
                  <TableCell>
                    <img src={`data:imag/jpeg;base64,${Buffer.from(value.certphoto.data)}`} width="50" height="50" alt='Error'></img>
                  </TableCell>
              </TableRow>
          )
      })}
  </TableBody>
</Table>
</TableContainer>
    </div>
  )
}

export default Certificateview
