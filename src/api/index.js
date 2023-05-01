import axios from 'axios';
import * as MockData from './mock';

const BASE_URL = `https://api.nasa.gov/mars-photos/api/v1/rovers`;
const API_KEY = `DEMO_KEY`
// const API_KEY = `X3ZbzGQVMqK50Bf3HZfhdgrrL0CjyQDkTisgsDJW`

const api = {

    getRovers: async () => {
        try {
            const apiUrl = `${BASE_URL}?api_key=${API_KEY}`;
            const { status, data } = await axios.get(apiUrl);
            return data.rovers;
            // return MockData.rovers;
        } catch (e) {
            console.log(`getRovers failed, ${e}`);
            return [];
        }

    },

    getPhotos: async (roverName, customDate) => {
        try {
            // customDate = `2021-12-3`;
            const apiUrl = `${BASE_URL}/${roverName}/photos?earth_date=${customDate}&api_key=${API_KEY}`;
            const { status, data } = await axios.get(apiUrl);
            return data.photos;
            // return MockData.photos;
        } catch (e) {
            console.log(`getPhotos failed, ${e}`);
            return [];
        }
    }
}

export default api;