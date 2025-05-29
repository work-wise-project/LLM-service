// googleSearch.ts
import axios from 'axios';
import { getConfig } from '../config';

const API_KEY = getConfig().googleApiKey;
const CX = getConfig().googleSearchCX;

export async function googleSearch(query: string) {
    console.log(query);
    const url = `https://www.googleapis.com/customsearch/v1`;
    const params = {
        key: API_KEY,
        cx: CX,
        q: query,
        num: 10,
    };

    try {
        const response = await axios.get<{
            items: {
                link: string;
            }[];
        }>(url, { params });

        console.log('Google Search Response:', response.data);

        return response.data.items.map(({ link }) => link);
    } catch (error) {
        console.error('Error during Google Search:');
        return [];
    }
}
