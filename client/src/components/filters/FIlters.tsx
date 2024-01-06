import Select, { SelectChangeEvent } from '@mui/material/Select';
import Filter from './FIlter';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import './filters.css';
import { FiltersOptions, Price, RoomsOption, homeTypeOptions, roomsOptions } from './filtersTypes';
import Button from '@mui/material/Button';
import { getCities } from '../../services/citiesService';

interface FiltersProps {
    filters: FiltersOptions;
    setFilters: (filters: FiltersOptions) => void;
    getPosts: (filters: FiltersOptions) => void;
}

const Filters = (filtersProp: FiltersProps ) => {
    const {filters, setFilters, getPosts} = filtersProp;
    const [cities, setCities] = useState([]);

    useEffect(() => {fetchCities()}, []);

    const fetchCities = async () => {
        try {
            const response = await getCities();
            response && setCities((response.data.result.records.map((location: { [x: string]: any; }) => location['שם_ישוב_לועזי']))); 
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const updateLocation = ((location: string) => setFilters({...filters, location}));
    const updateDealType = (newDealType: FiltersOptions['dealType']) => setFilters({...filters, dealType: newDealType});
    const updatPrice = (newPrice: Price) => setFilters({...filters, price: newPrice});
    const updateMinBedrooms = (newMinBedrooms: number) => setFilters({...filters, minBedrooms: newMinBedrooms as RoomsOption});
    const updateMinBathrooms = (newMinBathrooms: number) => setFilters({...filters, minBathrooms: newMinBathrooms as RoomsOption});
    const updateHomeType = (newHomeType: FiltersOptions['homeType']) => setFilters({...filters, homeType: newHomeType});

    return (
        <div className='filters'>
            <Filter placeHolder=''>
                <Autocomplete
                disablePortal
                options={cities}
                renderInput={(params) => <TextField {...params} label="City" />}
                onChange={(event: any) => updateLocation(event.target.innerText || null)}
                popupIcon={<SearchIcon />}
                />
            </Filter>
            <Filter placeHolder='Deal Type'>
                <Select onChange={(event: SelectChangeEvent) => updateDealType(event.target.value as FiltersOptions['dealType'])}>
                    <MenuItem value={'sale'}>For Sale</MenuItem>
                    <MenuItem value={'rent'}>For Rent</MenuItem>
                </Select>
            </Filter>
            <Filter placeHolder=''>
                <TextField 
                    type="number"
                    label="Min Price"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        updatPrice({
                            minPrice: parseInt(event.target.value) || null,
                            maxPrice: filters.price.maxPrice});
                    }}
                />
            </Filter>
            <Filter placeHolder=''>
                <TextField 
                    type="number"
                    label="Max Price"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        updatPrice({
                            minPrice: filters.price.minPrice,
                            maxPrice: parseInt(event.target.value) || null});  
                    }}
                />
            </Filter>
            <Filter placeHolder='Bedrooms'>
                <Select onChange={(event: SelectChangeEvent) => updateMinBedrooms(parseInt(event.target.value))}>
                    {roomsOptions.map(option => <MenuItem value={option}>{option}+</MenuItem>)}
                </Select>
            </Filter>
            <Filter placeHolder='Bathrooms'>
                <Select onChange={(event: SelectChangeEvent) => updateMinBathrooms(parseInt(event.target.value))}>
                    {roomsOptions.map(option => <MenuItem value={option}>{option}+</MenuItem>)}
                </Select>
            </Filter>
            <Filter placeHolder='Home Type'>
                <Select onChange={(event: SelectChangeEvent) => updateHomeType(event.target.value as FiltersOptions['homeType'])}>
                    {homeTypeOptions.map(option => <MenuItem value={option}>{option}</MenuItem>)}
                </Select>
            </Filter>
            <Button variant="contained" onClick={() => getPosts(filters)} className='filter'>Search</Button>
        </div>
    );
};

export default Filters;