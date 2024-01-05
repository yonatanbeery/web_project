import { Button, Card, Divider, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';

const Login = ({setLogin}: {setLogin: (x:boolean) => void}) => {
  const [username, setUsername] = useState<String>();
  const [password, setPassword] = useState<String>();

  const responseMessage = (response: CredentialResponse) => {
        console.log(response);
    };
    const errorMessage = () => {
        console.log("error");
    };

    return (
        <Card sx={{ minWidth: '100vh', height: '65vh', marginTop:'5vh' }}>
            <Grid container spacing={1}>
            <Grid xs={12} sx={{marginTop:2, justifyContent:'center', display:'flex'}}>
                <Typography variant="h3" gutterBottom>
                    Log In
                </Typography>
                </Grid>
                <Grid xs={6} sx={{justifyContent:'center', display:'flex', flexDirection:'column'}}>
                    <TextField onChange={(prop) => setUsername(prop.target.value)} id="username" label="Username" variant="outlined" sx={{marginRight: 3, marginLeft: 3}} />
                    <TextField onChange={(prop) => setPassword(prop.target.value)} id="password" label="Password" variant="outlined" type="password" sx={{margin: 3}} />
                    <Button onClick={() => setLogin(true)} color="primary" variant="contained" sx={{marginRight: 13, marginLeft: 13}}>Submit</Button>
                </Grid>
                <Divider orientation="vertical" sx={{height:'45vh'}} />
                <Grid xs={5.9} sx={{justifyContent:'center', display:'flex', flexDirection:'column', padding:3}}>
                    <GoogleLogin onSuccess={responseMessage} onError={errorMessage}/>
                </Grid>
                <Grid xs={12} sx={{marginTop:2, justifyContent:'center', display:'flex'}}>
                <Typography variant="h6" gutterBottom>
                    dont have an account?
                    <Button onClick={() => setLogin(true)}>Sign-up</Button>
                </Typography>
                </Grid>
            </Grid>
        </Card>
    );
};

export default Login;