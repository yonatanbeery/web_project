import Radio from '@mui/material/Radio';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContactDetails, Post } from '../types/postTypes';
import { DealTypeOption, HomeTypeOption, dealTypeOptions, homeTypeOptions } from '../filters/filtersTypes';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InputWithTitle from './InputWithLabel';
import './input.css'
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import { AuthContext, CitiesContext } from '../../App';
import Button from '@mui/material/Button';
import { postProperty } from '../../services/postsService';

interface PostEditorProps {
    post?: Post
}

const initialPost = {
    photos: [],
    location: '',
    dealType: dealTypeOptions[0],
    price: 0,
    bedrooms: 0,
    bathrooms: 0,
    homeType: homeTypeOptions[0],
    area: 0,
    contactDetails: {
        name: '',
        phoneNumber: '',
        EmailAddress: '',
    },
    freeText: '',
    creator: '',
    
}

const PostEditor = (props: PostEditorProps) => {

    const { post } = props;

    const [ newPost, setNewPost ] = useState<Post>(post || initialPost);
    const {cities} = useContext(CitiesContext);
    const {authToken} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => updateCreator(), [])

    const updateDealType = (dealType: DealTypeOption) => setNewPost({...newPost, dealType});
    const updateLocation = ((location: string) => setNewPost({...newPost, location}));
    const updatPrice = (price: number) => setNewPost({...newPost, price});
    const updateBedrooms = (bedrooms: number) => setNewPost({...newPost, bedrooms});
    const updateBathrooms = (bathrooms: number) => setNewPost({...newPost, bathrooms});
    const updateHomeType = (homeType: HomeTypeOption) => setNewPost({...newPost, homeType});
    const updatArea = (area: number) => setNewPost({...newPost, area});
    const updateName = (name: string) => setNewPost({...newPost, contactDetails: {...newPost.contactDetails, name} as ContactDetails});
    const updatePhoneNumber = (phoneNumber: string) => setNewPost({...newPost, contactDetails: {...newPost.contactDetails, phoneNumber} as ContactDetails });
    const updateEmailAddress = (EmailAddress: string) => setNewPost({...newPost, contactDetails: {...newPost.contactDetails, EmailAddress} as ContactDetails});
    const updateFreeText = (freeText: string) => setNewPost({...newPost, freeText});
    const updateCreator = () => setNewPost({...newPost, creator: authToken.userId});

    const handlePost = () => {
        postProperty(newPost, authToken.accessToken);
        setNewPost(initialPost);
        navigate('/');
    }   

    return (
        <div style={{width: '1800px'}}>
            <Typography variant="h3" color="text.secondary" sx={{marginTop: '20px'}}>
                {post ? 'Edit your post' : 'Post your property'}
            </Typography>
            <hr style={{margin: '20px 0'}}/>
            <div style={{display: 'flex', width: '100%'}}>
                <div style={{marginRight: '30px', width: 'inherit'}}>
                    <RadioGroup
                        row
                        className='input'
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => updateDealType(event.target.value as DealTypeOption)}>
                        <FormControlLabel
                            checked={newPost?.dealType === 'rent'}
                            control={<Radio />}
                            label="rent"
                            value="rent"
                            name="radio-buttons"
                        />
                        <FormControlLabel
                            checked={newPost?.dealType === 'sale'}
                            control={<Radio />}
                            label="sale"
                            value="sale"
                            name="radio-buttons"
                        />
                    </RadioGroup>
                    <InputWithTitle title='City:'>
                        <Autocomplete
                            fullWidth
                            disablePortal
                            options={cities}
                            renderInput={(params) => <TextField {...params} />}
                            onChange={(event: any) => updateLocation(event.target.innerText || null)}
                            popupIcon={<SearchIcon />}
                        />
                    </InputWithTitle>
                    <InputWithTitle title='Price:'>
                        <Input
                            type="number"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => updatPrice(parseInt(event.target.value))}
                        />
                        <AttachMoneyIcon />
                    </InputWithTitle>
                    <InputWithTitle title='Number of bedrooms:'>
                        <Input
                            type="number"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => updateBedrooms(parseInt(event.target.value))}
                        />
                    </InputWithTitle>
                    <InputWithTitle title='Number of bathrooms:'>
                        <Input
                            type="number"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => updateBathrooms(parseInt(event.target.value))}
                        />
                    </InputWithTitle>
                    <InputWithTitle title='Home type:'>
                        <Select fullWidth onChange={(event: SelectChangeEvent) => updateHomeType(event.target.value as HomeTypeOption)} defaultValue={newPost.homeType}>
                            {homeTypeOptions.map(option => <MenuItem value={option}>{option}</MenuItem>)}
                        </Select>
                    </InputWithTitle>
                    <InputWithTitle title='Area size:'>
                        <Input
                            type="number"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => updatArea(parseInt(event.target.value))}
                        />
                        <Typography variant="h6" color="text.secondary">
                            sqft
                        </Typography>
                    </InputWithTitle>
                    <Typography variant="h5" color="text.secondary" sx={{marginTop: '22px'}}>
                        Contact details:
                    </Typography>
                    <div style={{marginLeft: '42px'}}>
                        <InputWithTitle title='Name:'>
                            <Input
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => updateName(event.target.value)}
                            />
                        </InputWithTitle>
                        <InputWithTitle title='Phone number:'>
                            <Input
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => updatePhoneNumber(event.target.value)}
                            />
                        </InputWithTitle>
                        <InputWithTitle title='Email address:'>
                            <Input
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => updateEmailAddress(event.target.value)}
                            />
                        </InputWithTitle>
                    </div>
                </div>
                <div style={{ width: 'inherit', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                    <div>
                        <Typography variant="h5" color="text.secondary" sx={{marginRight: '22px'}}>
                            Photos:
                        </Typography>
                        
                    </div>
                    <div>
                        <Typography variant="h5" color="text.secondary" sx={{marginRight: '22px'}}>
                            Free text:
                        </Typography>
                        <TextField fullWidth multiline rows={5} onChange={(event: React.ChangeEvent<HTMLInputElement>) => updateFreeText(event.target.value)}/>
                    </div>
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between',marginTop: '30px'}}>
                <Button variant="contained" color="error" size="large" sx={!post ? {visibility: 'hidden'} : {}}>
                    Delete Post
                </Button>
                <Button variant="contained" color="success" size="large" onClick={handlePost}>
                    Post
                </Button>
            </div>
        </div>
    )
}

export default PostEditor;