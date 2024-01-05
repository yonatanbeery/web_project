import Filters from "./filters/FIlters"
import { useState } from 'react';
import { FiltersOptions, dealTypeOptions, homeTypeOptions, roomsOptions } from "./filters/filtersTypes";


const PostsPage = (filtersProp: FiltersOptions) => {

    const [filters, setFilters] = useState<FiltersOptions>(Object.keys(filtersProp).length ? filtersProp : {
        city: '',
        dealType: dealTypeOptions[0],
        price: {minPrice: null, maxPrice: null},
        minBedrooms: roomsOptions[0],
        minBathrooms: roomsOptions[0],
        homeType: homeTypeOptions[0]
    });

    return (
        <>
            <Filters filters={filters} setFilters={setFilters} />
        </>
    );
};

export default PostsPage;