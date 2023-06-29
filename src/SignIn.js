import {React, useState, useEffect} from 'react';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import RegisterationPage from './RegisterationPage';
import Registeration from './Registeration';
import { Button , Grid, Stack, Typography, TextField} from '@mui/material';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useAuth } from './services/AuthContext';
import { hashPassword } from './services/hash-password';
import { isValidToken, setSession } from './services/jwt';
import UserDashboard from './UserDashboard';
import FailFeedback from './FailFeedback';


function SignIn() {
    const navigate = useNavigate();
    const { authenticate } = useAuth();
    const [loggedIn, setLoggedIn] = useState(false);
    const [email,setemail] = useState('');
    const[password,setpassword] = useState('');
    const[ registerationForm, setRegisterationForm] = useState(true);
    const [error, setError] = useState("");
    const [loginError, setLoginError] = useState(false);
    const [role, setRole] = useState("");
    
    
    const handleChange = (event) => {
        const newValue = event.target.value;
        setemail(newValue);
        }
    const routeSignIn = () =>{ 
    setRegisterationForm(false);
    }   
    
    useEffect(() => {
        if (loggedIn) 
          navigate("/dashboard");
      }, [loggedIn ]);
      
      // useEffect(() => {
      //   if (!registerationForm) 
      //   window.location.reload(true);
      // }, [registerationForm]);

    const handleSubmit =  (e) => {
        console.log("hele here ")
        e.preventDefault();
        try{
        const user = { email, password}
        
        fetch("http://localhost:8080/users/signin" , {
            method: "POST",
            headers:{ "Content-type": "application/json"},
            body: JSON.stringify(user)
        }).then(response => {response.json().then( data =>{
            if(response.status === 200){
                // Handle the login response
              authenticate(data?.token, "");
              setSession(data?.token, "");
              setLoggedIn(true);
              console.log("sign page ")
              console.log(data?.token);
              console.log(data);
              //const token = ;
              localStorage.setItem('token', data.token);

              const decodedToken = jwt_decode(data.token);
              setRole(decodedToken);

            }
            else{
                setLoginError(true);
            }
        })
    });
        
    }catch(error){
          // Handle any errors
          console.log("erro in sigin " + error);
          setLoginError(true)
        };
    };

    return (
        <> {registerationForm ? 
            (
            <div className="bg" >
                <form noValidate onSubmit={handleSubmit}>
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
                           
                            <Grid container md={12} spacing={2}>
                                <Grid item xs>
                                    <TextField
                                        margin="dense"
                                        id="email"
                                        label="email"
                                        name="email"
                                        variant="filled"
                                        value={email}
                                        onChange={handleChange}
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
                                        type={"password"}
                                        margin="dense"
                                        id="password"
                                        label="password"
                                        value={password}
                                        onChange={(e)=> setpassword(e.target.value)}
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
                            <Button style={{ width: "150px", height: "35px", margin: "2px",  fontSize: 16, }}  type="submit" variant="contained" color="primary">Sign In</Button>
                            </Grid>
                            </Grid>
                        </Grid>
                        </Stack>  
                        </Box>
                            </div>
                 </form>
                                
                        <br/>
                            
                            <Button style={{ left:"980px",top:"420px",width: "250px", height: "45px", margin: "2px",  fontSize: 16, }}  
                        variant="contained" 
                        color="primary" 
                        onClick={() => setRegisterationForm(false)}>Sign Up</Button>
                        
                            </div>
                            )
            : <Registeration setRegisterationForm={setRegisterationForm}/>}
            <FailFeedback
            open={loginError}
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
              setLoginError(false)
            }}
          />
            
        </>
    
    )
}

export default SignIn