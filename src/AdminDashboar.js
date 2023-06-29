import React, {useState, useEffect} from 'react'
import { Button , Grid, Stack, Typography, TextField} from '@mui/material';
import Box from '@mui/material/Box';
import AdminReservationPage from './AdminReservationPage';
import { useNavigate} from 'react-router-dom';

function AdminDashboard() {
  const [switchPage, setSwitchPage] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    if(switchPage){
    navigate("/adminreservation");
  console.log("admin dashboard ")}
  },[switchPage])
  return (
    <>
    <div className="bg" >
      
    <div style={{position: "relative",top: "350px", left:"800px"}}>
                    <Box
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '32ch' },
                        width: 300,
                        height: 300,
                        display:"relative",
                        justifyContent:"center",
                        alignItems:"center",
                        top: "200px",
                    }}
                    
                    >
                    <Stack direction="column">
                        <Grid container>
                            <Grid item xs>
                            <Typography variant="h4" color={"primary"}>
                                Management
                            </Typography>
                            <br/>
                            <br/>
                            </Grid>
                            <Grid item xs>
                            <Button style={{ width: "250px", height: "35px", margin: "2px",  fontSize: 16, }} onClick={()=> setSwitchPage(true)} variant="contained" color="primary">Make a Reservation</Button>
                            </Grid>
                            <br/>
                            <Grid item xs>
                            <Button style={{ width: "250px", height: "35px", margin: "2px",  fontSize: 16, }} onClick={()=> navigate("/allreservations")} variant="contained" color="primary">View all Reservation</Button>
                            </Grid>
                            <br/>
                            {/* <Grid item xs>
                            <Button style={{ width: "250px", height: "35px", margin: "2px",  fontSize: 16, }} variant="contained" color="primary">Find a Reservation</Button>
                            </Grid> */}
                        </Grid>
                        </Stack>  
                        </Box>
      </div>
    </div>
    </>
    
  )
}

export default AdminDashboard