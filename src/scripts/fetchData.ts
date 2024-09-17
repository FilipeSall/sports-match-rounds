import { ApiResponse } from "../interfaces";

const url = 'https://sevn-pleno-esportes.deno.dev/';

const fetchData = async (): Promise<ApiResponse | void> => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Response Error');
        }

        const data: ApiResponse = await response.json();

        return data

    } catch (error) {
        console.error(`Fetch Error: ${error}`)
    }

}

export default fetchData