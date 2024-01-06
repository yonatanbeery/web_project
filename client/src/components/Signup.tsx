import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import {AuthContext} from "../App";
import axios from "axios";

const Signup = () => {
    const [userImage, setUserImage] = useState<string>("../../public/defaultUserImage.png");
    const [username, setUsername] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [confirmPassword, setConfirmPassword] = useState<string>();
    const [isSubmitted, setIsSubmitted] = useState<boolean>();
    const {setAuthToken} = useContext(AuthContext);

    const signupNewUser = () => {
        setIsSubmitted(true);
        if(username && email && password && password === confirmPassword){
            axios.post('http://localhost:8080/users/signup', {data:{userImage, username, email, password}});
        }
    }

    const onFileChange = (event: any) => {    
        setUserImage(URL.createObjectURL(event.target.files[0]))
    };

    return (
        <Card sx={{ minWidth: '100vh', height: '75vh', marginTop:'5vh' }}>
            <Grid container spacing={1}>
                <Grid md={12} sx={{marginTop: 5, justifyContent:'center', alignItems: 'center', display:'flex', flexDirection:'column'}}>
                    <Box>
                        <Box component="img" src={userImage} sx={{height: 125, width: 125}}/>
                        <input type="file" onChange={onFileChange}/>
                    </Box>
                    <TextField error={!username && isSubmitted} onChange={(prop) => setUsername(prop.target.value)} id="Username" label="Username" variant="outlined" sx={{margin: 1, width: '50vh'}} />
                    <TextField error={!email && isSubmitted} onChange={(prop) => setEmail(prop.target.value)} id="Email" label="Email" variant="outlined" sx={{margin: 1, width: '50vh'}} />
                    <TextField error={!password && isSubmitted} onChange={(prop) => setPassword(prop.target.value)} id="Password" label="Password" variant="outlined" type="password" sx={{margin: 1, width: '50vh'}} />
                    <TextField error={!confirmPassword && isSubmitted} onChange={(prop) => setConfirmPassword(prop.target.value)} id="Confirm password" label="Confirm password" variant="outlined" type="password" sx={{margin: 1, width: '50vh'}} />
                    <Button onClick={signupNewUser} color="primary" variant="contained" sx={{marginRight: 20, marginLeft: 20, marginTop: 4}}>Sign up</Button>
                </Grid>
            </Grid>
        </Card>
    );
};

export default Signup;