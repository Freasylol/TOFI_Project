import React from 'react';
import Axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Divider, Container, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  label: {
    paddingTop: 100,
    display: 'block'
  },
  
}))
 
const Admin = () => {
  const classes = useStyles();
  // let columns = [
  //   {field: 'id', headerName: 'ID', width: 100},
  //   {field: 'name', headerName: "NAME", width: 150},
  //   {field: 'lastName', headerName: 'LAST NAME', width: 200},
  //   {field: 'email', headerName: 'EMAIL', width: 300},
  //   {field: 'password', headerName: 'PASSWORD', width: 200},
  //   {field: 'userRole', headerName: 'USER ROLE', width: 200}
  // ];
  // const [dataArr, setDataArr] = useState([]);

  // useEffect(() => Axios.get('https://itransition-final-project.herokuapp.com/users').then((response) => setDataArr(response.data)));

  // let rows = dataArr;
  // return (
  //     <div style={{height: '95vh', maxWidth: '100%'}}>
  //       <DataGrid 
  //         rows={rows}
  //         columns={columns}
  //         pageSize={5}
  //         rowsPerPageOptions={[5]}
  //         checkboxSelection
  //         disableSelectionOnClick
  //        />
  //     </div>

  // )
  return (
    <div>
      <Typography className={classes.label}>Admin</Typography>
    </div>
  )
}

export default Admin;