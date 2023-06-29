import React, { useState, useEffect } from 'react'
import { Button, FormHelperText, FormLabel, Grid, Stack, TextField, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import shadows from "@mui/material/styles/shadows";
import { LocalizationProvider } from "@mui/x-date-pickers";
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './services/AuthContext';
import Feedback from './Feedback';
import { format } from "date-fns";
import FailFeedback from './FailFeedback';

function Registeration({setRegisterationForm}) {
const { authenticate } = useAuth();
const [firstName, setFirstName] = useState(null);
const [lastName, setLastName] = useState(null);
const [password, setPassword] = useState(null);
const [email, setEmail] = useState(null);
const [birthDate, setBirthDate] = useState(null);
const [confirmPassword, setConfirmPassword] = useState(null);
const [userCreated, setUserCreated] = useState(false);
const [ route, setRoute]= useState(false);
const [isValid, setIsValid] = useState(true);
const [serverError, setServerError] = useState(false);
let refreshPage = 0;

let navigate = useNavigate(); 

const handleSubmit = (e) => {
 
  e.preventDefault();
  try{
  const user = { firstName, lastName, email, password , birthDate}
  console.log("hele here in registration form " + birthDate)
  
  fetch("http://localhost:8080/users/signup" , {
      method: "POST",
      headers:{ "Content-type": "application/json"},
      body: JSON.stringify(user)
  }).then(response => {
    if (response.ok) {
      // Request was successful
      return response.json();
      
    } else {
      // Request encountered an error
      setServerError(true)
    }
  })
  .then((data) => {
    // Handle the login response
    authenticate(data?.token, data?.refresh_token);
    if(data?.token)
    setUserCreated(true)
    console.log(data);
  })
}catch(error){
    // Handle any errors
    console.log(error);
  };
};
useEffect(() => {
  if (refreshPage>0) {
    window.location.href="http://localhost:3000";
  }
}, [setRoute]);
// email validation: 
const handleEmailChange = (event) => {
  const inputValue = event.target.value;
  setEmail(inputValue);
  setIsValid(validateEmail(inputValue));
};

const validateEmail = (input) => {
  // Regular expression to validate email format
  const emailInput = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailInput.test(input);
};

  return (
    <>
    <div className='bg'>
    <div className="divPosition">
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '32ch' },
        width: 300,
        height: 300,
        display:"relative",
        justifyContent:"center",
        alignItems:"center"
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
    <Stack direction="column">
        <Grid container>
            <Grid item md={12} spacing={2}>
                <Typography variant="h4" sx={{color:"whitesmoke"}}>
                    Registeration Form
                </Typography>
            </Grid>
            <Grid container md={12} spacing={2}>
                <Grid item xs>
                    <TextField
                        margin="dense"
                        id="firstName"
                        label="firstName"
                        name="firstName"
                        variant="filled"
                        value={firstName}
                        onChange={(e)=> setFirstName(e.target.value)}
                        required
                        fullWidth
                        my={2}
                        sx={{
                            input: {
                              color: "whitesmoke",
                              background: "gray"
                            }
                          }}
                    />
                </Grid>
                <Grid item xs>
                    <TextField
                        margin="dense"
                        id="lastName"
                        label="lastName"
                        value={lastName}
                        onChange={(e)=> setLastName(e.target.value)}
                        variant="filled"
                        required
                        fullWidth
                        my={2}
                        name="lastName"
                        sx={{
                            input: {
                              color: "whitesmoke",
                              background: "gray"
                            }
                          }}
                    />
                </Grid>
                <Grid item xs>
                <LocalizationProvider
                          dateAdapter={AdapterDayjs}
                          adapterLocale="de"
                        >
                         <DatePicker
                            label="Date of Birth"
                            variant="filled"
                            sx={{
                                svg: { color: "white" },
                                input: {
                                  color: "whitesmoke",
                                  background: "gray"
                                }
                              }}
                            value={birthDate}
                            onChange={(newValue)=> setBirthDate(format(newValue.toDate(), "yyyy-MM-dd"))}
                            renderInput={(params) => (
                              <TextField
                                component={TextField}
                                {...params}
                                name="birthDate"
                                margin="none"
                                autoComplete="off"
                                inputProps={{
                                  ...params.inputProps,
                                  placeholder: "TT.MM.JJJJ",
                                }}
                               
                              />
                            )}
                          />
                        
                       </LocalizationProvider>
                       </Grid>
            </Grid>
            <Grid container md={12} spacing={2}>
                
                <Grid item xs>
                    <TextField
                        margin="dense"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        label="Email"
                        variant="filled"
                        fullWidth
                        required
                        my={2}
                        name="Email"
                        sx={{
                            input: {
                              color: "whitesmoke",
                              background: "gray"
                            }
                          }}

                    />
                    {!isValid && <p>Please enter a valid email address.</p>}
                </Grid>
                <Grid item xs>
                        <TextField
                            type={"password"}
                            margin="dense"
                            id="password"
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                            label="password"
                            variant="filled"
                            required
                            fullWidth
                            my={2}
                            name="password"
                            sx={{
                                input: {
                                  color: "whitesmoke",
                                  background: "gray"
                                }
                              }}
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField
                            type={"password"}
                            margin="dense"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e)=> setConfirmPassword(e.target.value)}
                            label="confirmPassword"
                            variant="filled"
                            required
                            fullWidth
                            my={2}
                            name="confirmPassword"
                            sx={{
                                input: {
                                  color: "whitesmoke",
                                  background: "gray"
                                }
                              }}
                        />
                    </Grid>
                            <Grid item xs>
                                <Button style={{ width: "150px", height: "35px", margin: "2px",  fontSize: 16, }}  type="submit" variant="contained" color="primary">Register</Button>
                            </Grid>
                            {/* <Grid item xs>
                                <Button style={{ width: "150px", height: "35px", margin: "2px",  fontSize: 16, }} onClick={routeSignIn} variant="contained" color="primary">Sign In</Button>
                            </Grid> */}
                </Grid>
            </Grid>
        </Stack>
        </Box>
        </div>
        <Feedback
          open={userCreated}
          title={"Successful"}
          message={
            <>
              <Typography align="center">
                Benutzer ID wurde erstellt.
              </Typography>
            </>
          }
          handleClose={()=> {
            refreshPage = refreshPage + 1;
            setRoute(true)
          setUserCreated(false)
          setRegisterationForm(false)
        }}
          
        />
        <FailFeedback
            open={serverError}
            title={"Failure"}
            severity="warning"
            message={
              <>
                <Typography align="center">
                  Server Failure or Email duplication Error.
                  
                </Typography>
              </>
            }
            handleClose={() => {
              refreshPage = refreshPage + 1;
              setRoute(true)
              setServerError(false)
             
            }}
          />
        </div>
        </>
  )
}

export default Registeration