import { Button, Card, Divider, Grid, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { TokenResponse, useGoogleLogin } from '@react-oauth/google';
import GoogleIcon from '@mui/icons-material/Google';
import {AuthContext} from "../App";
import axios from 'axios';
import { useCookies } from "react-cookie";
import moment from "moment";
import Navbar from "./Navbar";

const Login = () => {
    const [cookies, setCookie] = useCookies(["accessToken", "refreshToken", "userId"]);
    const [username, setUsername] = useState<String>();
    const [password, setPassword] = useState<String>();
    const [errorMessage, setErrorMessage] = useState<String>();
    const {setAuthToken} = useContext(AuthContext);

    const loginWithGoogle = useGoogleLogin({
        onSuccess: (tokenResponse: TokenResponse) => {
            setCookie("accessToken", tokenResponse.access_token, { path: "/" , expires: moment().add(1, 'h').toDate()});
            setAuthToken({accessToken: tokenResponse.access_token, refreshToken:""})}, //TODO: user id with google
        onError: () => console.log("error")
    });

    const loginWithUsername = async () => {
        const g = await axios.post('http://localhost:8080/auth/login', {data:{username, password}}).then((res) => {
            setCookie("accessToken", res.data.accessToken, { path: "/" , expires: moment().add(1, 'h').toDate()});
            setCookie("refreshToken", res.data.refreshToken, { path: "/" });
            setCookie("userId", res.data.userId, { path: "/" });
            setAuthToken({accessToken: res.data.accessToken, refreshToken:res.data.refreshToken, userId: res.data.userId} );
        }).catch(() => setErrorMessage("Incorrect username or password"));
    }

    return (
        <Card sx={{ minWidth: '100vh', height: '65vh', marginTop:'5vh' }}>
            <Grid container spacing={1}>
            <Grid md={12} sx={{marginTop:2, justifyContent:'center', display:'flex'}}>
                <Typography variant="h3" gutterBottom>
                    Log In
                </Typography>
                </Grid>
                <Grid md={6} sx={{justifyContent:'center', display:'flex', flexDirection:'column'}}>
                    <TextField onChange={(prop) => setUsername(prop.target.value)} id="username" label="Username" variant="outlined" sx={{marginRight: 3, marginLeft: 3}} />
                    <TextField onChange={(prop) => setPassword(prop.target.value)} id="password" label="Password" variant="outlined" type="password" sx={{margin: 3}} />
                    <Button onClick={loginWithUsername} color="primary" variant="contained" sx={{marginRight: 13, marginLeft: 13}}>Submit</Button>
                    {errorMessage && <Typography color="red" variant="h6" gutterBottom  sx={{marginRight: 13, marginLeft: 13}}>
                        {errorMessage}
                    </Typography>}
                </Grid>
                <Divider orientation="vertical" sx={{height:'45vh'}} />
                <Grid md={5.9} sx={{justifyContent:'center', display:'flex', flexDirection:'column', padding:3}}>
                    <Button variant="outlined" onClick={() => loginWithGoogle()} sx={{height:"8vh"}}>
                        <Typography sx={{color:"black"}}>
                            Continue with Google
                        </Typography>
                        <GoogleIcon sx={{marginLeft:2}}/>
                    </Button>
                </Grid>
                <Grid md={12} sx={{marginTop:2, justifyContent:'center', display:'flex'}}>
                <Typography variant="h6" gutterBottom>
                    dont have an account?  
                    <Button href="/Signup">Sign-up</Button>
                </Typography>
                </Grid>
            </Grid>
        </Card>
    );
};

export default Login;