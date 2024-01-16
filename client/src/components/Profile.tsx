import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../App";

const Profile = () => {
    const [userImage, setUserImage] = useState<any>();
    const [username, setUsername] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>("####");
    const [confirmPassword, setConfirmPassword] = useState<string>("####");
    const [isSubmitted, setIsSubmitted] = useState<boolean>();
    const {authToken} = useContext(AuthContext);

    const updateUserDetails = () => {
        
    }

    const onFileChange = (event: any) => {        
        setUserImage(event.target.files[0]);
    };

    const setImage = async () => {
        const imageUrl = "https://i.imgur.com/fHyEMsl.jpg";
        const res = await fetch(imageUrl);
        console.log('jpg', res);
        const imageBlob = await res.blob();
        setUserImage(imageBlob);

        axios.post('http://localhost:8080/user/getUserImage', {}, {headers:{"Authorization": authToken.accessToken}}).then(async (res) => {
            console.log('png', res);
            const imageBlob = await res.blob();
            setUserImage(imageBlob)});
    }

    useEffect(() => {
        setImage();
        axios.post('http://localhost:8080/user/getUserSettings', {}, {headers:{"Authorization": authToken.accessToken}}).then((res) => {
            setUsername(res.data.user.username);
            setEmail(res.data.user.email);
        });
    }, [])

    return (
        <Card sx={{ minWidth: '100vh', height: '75vh', marginTop:'5vh' }}>
            <Grid container spacing={1}>
                <Grid md={12} sx={{marginTop: 5, justifyContent:'center', alignItems: 'center', display:'flex', flexDirection:'column'}}>
                    <Box>
                        <Box component="img" src={userImage ? URL.createObjectURL(userImage) : "../../public/defaultUserImage.png"} sx={{height: 125, width: 125}}/>
                        <input type="file" onChange={onFileChange}/>
                    </Box>
                    <Typography variant="h5" sx={{margin:1}}>User name: {username}</Typography>
                    <TextField error={!email && isSubmitted} onChange={(prop) => setEmail(prop.target.value)} helperText="email" value={email} id="Email" variant="outlined" sx={{margin: 1, width: '50vh'}} />
                    <TextField error={!password && isSubmitted} onChange={(prop) => setPassword(prop.target.value)} helperText="password" value={password} id="Password" variant="outlined" type="password" sx={{margin: 1, width: '50vh'}} />
                    <TextField error={!confirmPassword && isSubmitted} onChange={(prop) => setConfirmPassword(prop.target.value)} helperText="confirm password" value={confirmPassword} id="Confirm password" variant="outlined" type="password" sx={{margin: 1, width: '50vh'}} />
                    <Button onClick={updateUserDetails} color="primary" variant="contained" sx={{marginRight: 20, marginLeft: 20, marginTop: 4}}>Update details</Button>
                </Grid>
            </Grid>
        </Card>
    );
};

export default Profile;