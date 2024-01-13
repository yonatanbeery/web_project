import { Button, Card, Divider, Grid, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { TokenResponse, useGoogleLogin } from '@react-oauth/google';
import GoogleIcon from '@mui/icons-material/Google';
import {AuthContext} from "../App";
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState<String>();
    const [password, setPassword] = useState<String>();
    const {setAuthToken} = useContext(AuthContext);

    const loginWithGoogle = useGoogleLogin({
        onSuccess: (tokenResponse: TokenResponse) => setAuthToken(tokenResponse.access_token),
        onError: () => console.log("error")
    });

    const loginWithUsername = () => {
        axios.post('http://localhost:8080/auth/login', {data:{username, password}}).then((res) => {
            setAuthToken(res.data.accessToken);
        });
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