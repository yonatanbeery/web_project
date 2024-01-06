import Filters from "./filters/FIlters"
import { useContext, useState } from 'react';
import { FiltersOptions } from "./filters/filtersTypes";
import {AuthContext} from "../App";
import Login from "./Login";

const PostsPage = (filtersProp: FiltersOptions) => {
    const {authToken} = useContext(AuthContext);
    
    const [filters, setFilters] = useState<FiltersOptions>({
        city: filtersProp.city,
        dealType: filtersProp.dealType,
        price: filtersProp.price,
        bedrooms: filtersProp.bedrooms,
        bathrooms: filtersProp.bathrooms,
        homeType: filtersProp.homeType
    });

    return (
        <>
        {authToken ? 
        <Filters filters={filters} setFilters={setFilters} />
        : <Login/>}
        </>
    );
};

export default PostsPage;