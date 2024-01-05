import Filters from "./filters/FIlters"
import { useState } from 'react';
import { FiltersOptions } from "./filters/filtersTypes";


const PostsPage = (filtersProp: FiltersOptions) => {

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
            <Filters filters={filters} setFilters={setFilters} />
        </>
    );
};

export default PostsPage;