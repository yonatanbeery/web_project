import axios from "axios";
import { FiltersOptions } from "../components/filters/filtersTypes";

export const getPosts = async (filters: FiltersOptions, access_token: string) => {

    const headers = {
        "Content-Type": "application/json",
        "Authorization": access_token
    }
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/properties`, {params: filters, headers});

        return response;

    } catch (error) {
        console.error('Error fetching data:', error);
    }
};