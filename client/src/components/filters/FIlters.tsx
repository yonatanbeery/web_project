import Select, { SelectChangeEvent } from '@mui/material/Select';
import Filter from './FIlter';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';
import './filters.css';
import { FiltersOptions, Price, RoomsOption, homeTypeOptions, roomsOptions } from './filtersTypes';


interface FiltersProps {
    filters: FiltersOptions;
    setFilters: (filters: FiltersOptions) => void;
}

const Filters = (filtersProp: FiltersProps ) => {

    const {filters, setFilters, searchPosts} = filtersProp;
    const [cities, setCities] = useState([]);
    useEffect(() => {getCities()}, []);

    const getCities = async () => {
        const data = {
            resource_id: 'd4901968-dad3-4845-a9b0-a57d027f11ab',
            limit: 32000,
        };

        try {
            const response = await axios.get('https://data.gov.il/api/3/action/datastore_search', {
                params: data,
            });

            setCities(response.data.result.records.map((city: { [x: string]: any; }) => city['שם_ישוב_לועזי']));

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const updateCity = ((city: string) => setFilters({...filters, city}));
    const updateDealType = (newDealType: FiltersOptions['dealType']) => setFilters({...filters, dealType: newDealType});
    const updatPrice = (newPrice: Price) => setFilters({...filters, price: newPrice});
    const updateMinBedrooms = (newMinBedrooms: number) => setFilters({...filters, minBathrooms: newMinBedrooms as RoomsOption});
    const updateMinBathrooms = (newMinBathrooms: number) => setFilters({...filters, minBathrooms: newMinBathrooms as RoomsOption});
    const updateHomeType = (newHomeType: FiltersOptions['homeType']) => setFilters({...filters, homeType: newHomeType});

    return (
        <div className='filters'>
            <Filter placeHolder=''>
                <Autocomplete
                disablePortal
                options={cities}
                renderInput={(params) => <TextField {...params} label="City" />}
                onChange={(event: any) => updateCity(event.target.innerText)}
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
                            minPrice: parseInt(event.target.value),
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
                            maxPrice: parseInt(event.target.value)});  
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
        </div>
    );
};

export default Filters;