import axios from "axios";
import { FiltersOptions } from "../components/filters/filtersTypes";

export const getPosts = async (filters: FiltersOptions) => {

    const headers = {
        "Content-Type": "application/json",
    }
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/properties`, {params: filters, headers});

        return response;

    } catch (error) {
        console.error('Error fetching data:', error);
    }
};