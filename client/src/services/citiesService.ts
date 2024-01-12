import axios from "axios";

export const getCities = async () => {
    const data = {
        resource_id: import.meta.env.VITE_CITIES_RECORD_ID,
        limit: 32000,
    };

    try {
        const response = await axios.get(import.meta.env.VITE_CITIES_URL, {
            params: data,
        });

        return response;

    } catch (error) {
        console.error('Error fetching data:', error);
    }
};