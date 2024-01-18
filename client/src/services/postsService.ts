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

export const postComment = (id: string, comment: string) => {
    try {
        axios.post(`${import.meta.env.VITE_SERVER_URL}/properties/postComment`, {id, comment})
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export const getPostById = async (id: string) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/properties/${id}`);
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}