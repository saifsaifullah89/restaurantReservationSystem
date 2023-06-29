import React,{ useState } from "react";
import styled from "styled-components/macro";
import {
  Tooltip,
  IconButton as MuiIconButton,
  CircularProgress,
  Button,
} from "@mui/material";
import { useAuth } from "./services/AuthContext";
import { PowerSettingsNew as PowerIcon } from '@mui/icons-material';
import { isValidToken } from './services/jwt';
import { useNavigate } from 'react-router-dom';
import SignIn from "./SignIn";

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;


function Logout() {
    const [loggingOut, setLoggingOut] = useState(true);
    const [anchorMenu, setAnchorMenu] = useState(null);
    const { token } = useAuth();
    const navigate = useNavigate();

    const logout = (token) => {
        try{
    
            if(token && isValidToken){
                setLoggingOut(true);
                localStorage.removeItem("accessToken");
                navigate("/");
            }
            else
                setLoggingOut(false);
        }catch(error){}
      };

    
  return (
    <>
    <Tooltip title="Logout">
      {loggingOut ? (
        <div>
          <CircularProgress size={20} sx={{ color: "action.disabled" }} />
        </div>
      ) : (
      // <Button style={{ position: "fixed", top: 250, right: 250,width: "150px", height: "50px", margin: "2px",  fontSize: 16, borderRadius: "2px"}}  
      //     variant="contained" 
      //     color="primary" 
      //     >
        <IconButton
          aria-owns={"menu-appbar"}
          aria-haspopup="true"
          onClick={logout(token)}
          color="inherit"
          size="large"
        >
            <PowerIcon />
        </IconButton>
        // </Button>
      )}
      </Tooltip>
    </>
  )
}

export default Logout