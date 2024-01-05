import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import {AuthContext} from "../App";

const Signup = () => {
    const [username, setUsername] = useState<String>();
    const [password, setPassword] = useState<String>();
    const {setAuthToken} = useContext(AuthContext);

    return (
        <Card sx={{ minWidth: '100vh', height: '75vh', marginTop:'5vh' }}>
            <Grid container spacing={1}>
                <Grid xs={12} sx={{marginTop: 5, justifyContent:'center', alignItems: 'center', display:'flex', flexDirection:'column'}}>
                    <Button>
                        <Box component="img" src="../../public/defaultUserImage.png" sx={{height: 125, width: 125}}></Box>
                    </Button>
                    <TextField onChange={(prop) => setUsername(prop.target.value)} id="Username" label="Username" variant="outlined" sx={{margin: 1, width: '50vh'}} />
                    <TextField onChange={(prop) => setUsername(prop.target.value)} id="Email" label="Email" variant="outlined" sx={{margin: 1, width: '50vh'}} />
                    <TextField onChange={(prop) => setPassword(prop.target.value)} id="Password" label="Password" variant="outlined" type="password" sx={{margin: 1, width: '50vh'}} />
                    <TextField onChange={(prop) => setPassword(prop.target.value)} id="Confirm password" label="Confirm password" variant="outlined" type="password" sx={{margin: 1, width: '50vh'}} />
                    <Button onClick={() => setAuthToken("")} color="primary" variant="contained" sx={{marginRight: 20, marginLeft: 20, marginTop: 4}}>Submit</Button>
                </Grid>
            </Grid>
        </Card>
    );
};

export default Signup;