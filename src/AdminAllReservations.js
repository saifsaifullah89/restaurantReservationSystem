import React , { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { format } from "date-fns"

import {
  Typography,
  Card,
  CardActions,
  CardContent,
  Button,
} from "@mui/material";
import Box from '@mui/material/Box';
import Feedback from './Feedback';
import FailFeedback from './FailFeedback';
import { useAuth } from './services/AuthContext';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";



function AdminAllReservations() {

    const [user, setUser] = useState("");
    const [allReservations, setAllReservations] = useState([]);
    const [reservationData, setReservationData] = useState(false);
    const [errorFeedback, setErrorFeedback] = useState(false);
    const [editReservation, setEditReservation] = useState(false);
    const [makeReservation, setMakeReservation] = useState(false);
    const handleReservation = () => setMakeReservation(true);
   
    
    const [isAvailableData, setIsAvailableData] = useState(false);
    const [updatingReservation, setUpdatingReservation] = useState([]);
    const [cancelReservaion, setCancelReservation] = useState(false);
    const navigate = useNavigate();
    var data ;
    //to go to the reservation Page
    useEffect(() => {
      if (makeReservation) {
        navigate("/adminreservation");
      }
    }, [makeReservation]);
    

    const { token } = useAuth();
    const getUser = async () => {

      try{
          
          fetch("http://localhost:8080/users/myInfo" , {
              method: "GET",
              headers:{  "Authorization" : "Bearer " + token }
          }).then((response) => response.json())
          .then((data) => {
            // Handle the login response
            setUser(data)
            
            console.log(data);
          })
      }catch(error){
            // Handle any errors
            console.log(error);
          };
      };
    useEffect(() => { 
      getUser()
      return () => {
        setUser([]); 
      };
    }, []);

    // Reservation Details

    const getallReservations = async () => {

      try{
          
          fetch("http://localhost:8080/reservation/findAll" , {
              method: "GET",
              headers:{  "Authorization" : "Bearer " + token }
          }).then((response) => response.json())
          .then((data) => {
                // Handle the login response
                setAllReservations(data)
                setUpdatingReservation(data)
                if(data.length > 0) 
                setIsAvailableData(true);
                console.dir(data);
            })
      }catch(error){
            // Handle any errors
            console.log(error);
          };
      };
    useEffect(() => { 
      getallReservations()
      return () => {
        setAllReservations([]); 
      };
    }, [cancelReservaion]);
    
    const findObjectById = (id) => {
      const objct = allReservations.find( (obj) => {
        return obj.reservationId === id
      });
      setUpdatingReservation(objct);
    };

    const onClick = (value) => (event)=>{
      setUpdatingReservation(value);
    } 

    // const findObjectById = (id) => {
    //   return allReservations?.find(obj => obj.reservationId === id);
    // };
 
    const columns = [
      {
        field: 'serialNumber',
        headerName: 'Id',
        width: 50,
        renderCell: (index) =>
        index.api.getRowIndexRelativeToVisibleRows(index.row.reservationId) + 1,
        headerClassName: 'custom-header',
        headerAlign: 'center',
        align: 'center', 
       
      }, 
      {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
          `${params.row.appUser.firstName || ''} ${params.row.appUser.lastName || ''}`,
        headerClassName: 'custom-header',
        headerAlign: 'center',
        align: 'center', 
      },
  
      {
        field: 'reservationDate',
        headerName: 'Reservation Date',
        width: 200,
        renderCell: (params) => {
          return <>{params.value[2] + "-" + params.value[1] + "-" + params.value[0]}</>;
      },
       headerClassName: 'custom-header',
        headerAlign: 'center',
        align: 'center', 
      },
      {
        field: 'startTime',
        headerName: 'Start Time',
        width: 80,
        headerClassName: 'custom-header',
        headerAlign: 'center',
        align: 'center', 
        renderCell: (params) => {
          return <>{ params.value[0] + ":" + params.value[1]}</>;
      }
      },
      {
        field: 'endTime',
        headerName: 'End Time',
        width: 80,
        headerClassName: 'custom-header',
        headerAlign: 'center',
        align: 'center', 
        renderCell: (params) => {
          return <>{ params.value[0] + ":" + params.value[1]}</>;
      }
      },
      {
        field: 'numberOfPerson',
        headerName: 'No. of Persons',
        width: 120,
        headerClassName: 'custom-header',
        headerAlign: 'center',
        align: 'center', 
      },
      {
        field: 'comment',
        headerName: 'Comment',
        width: 120,
        value: 8,
        headerClassName: 'custom-header',
        headerAlign: 'center',
        align: 'center', 
      }, {
        field: 'status',
        headerName: 'Status',
        width: 120,
        value: 8,
        headerClassName: 'custom-header',
        headerAlign: 'center',
        align: 'center', 
        renderCell: (params) => {
           return <>{params.value === 1 ? 'Confirmed' : 'Cancelled'}</>;
        }
      },
      {
        field: "ActionDelete",
        headerName: " ",
        headerClassName: 'custom-header',
        headerAlign: 'center',
        align: 'center', 
        sortable: false,
        renderCell: (params) => {
           const onClick= () => {try{
    fetch(`http://localhost:8080/reservation/cancel/${params.id}` , {
        method: "PUT",
        headers:{  "Authorization" : "Bearer " + token }
    }).then((response) => response.json())
    .then((data) => {
      setCancelReservation(true)
          console.dir(data);
      })
}catch(error){
      // Handle any errors
      console.log(error);
    }}
          return <Button onClick={onClick}>Cancel</Button>;
        }
      },
    ];
    const styles = {
      customHeader: {
        fontWeight: 'bold',
        color: 'blue',
      },
    };
    
   
 return (
    <> 
     {/* //back to overview page */}
     <Button
                size="medium"
                color="inherit"
                sx={{ color: "grey.700" }}
                startIcon={<ArrowBackIcon fontSize="small" />}
                onClick={()=> navigate("/dashboard")}
            >
                Back to Dashboard
            </Button>
            <br></br>
            <br></br>

         {/* Showing data table */}
        {isAvailableData ? (<Box  >
          <br/>
            <Typography variant="h5" gutterBottom display="center" >
              ALL RESERVATIONS
            </Typography>
            <br/>
            <br/>
      <DataGrid
      sx={{
        '& .MuiTextField-root': { m: 1, width: '82ch' },
        width: 1050,
        left: "350px",
        top: "200px",
    }}
        rows={allReservations}
        editMode="row"
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        getRowId= {(row) => row.reservationId}
        classes={styles}
        
      />
</Box>)
: (
  <div style={{ left:"300px" ,width: '50%', height: "70px", textAlign: "right", float: "left" }}>
          <Typography variant="h3" color="primary"> NO Reservations Are Made</Typography>
          </div>)}
{/* Make a reservation Button */}

            {/* <Box  
                  
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '72ch' },
                    width: 100,
                    left: "800px",
                    top: "50px",
                }}> */}
                  <Button style={{ position: "fixed", top: 50, right: 50,width: "150px", height: "50px", margin: "2px",  fontSize: 16, borderRadius: "2px"}}  
                                    variant="contained" 
                                    color="primary" 
                                    onClick={handleReservation}
                                    >Make a Reservation</Button>
             

    {/* Feed backs to show the response */}
          <Feedback
          open={reservationData}
          title={"Successful"}
          message={
            <>
              <Typography align="center">
              Reserviert
              </Typography>
            </>
          }
          handleClose={()=> {
            setReservationData(false)}}
        />

        {/* feedback for canceling a reservation */}
        <Feedback
          open={cancelReservaion}
          title={"Successful"}
          message={
            <>
              <Typography align="center">
              Canceled
              </Typography>
            </>
          }
          handleClose={()=> {
            setIsAvailableData(false);
            setCancelReservation(false)}}
        />
        <FailFeedback
            open={errorFeedback}
            title={"Failure"}
            severity="warning"
            message={
              <>
                <Typography align="center">
                  Server Failure or Bad Request.
                </Typography>
              </>
            }
            handleClose={() => {
              setErrorFeedback(false)
            }}
          />
          
  </>
    
  )
}

export default AdminAllReservations