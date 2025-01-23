import { useState } from "react";
import axios, {AxiosError} from "axios";

const ACCESS_KEY = "_JHmAWazXh8LrN0Vc46JKaitkH55qeIbXVfYwZhAc8U";
export const PER_PAGE = 12

const useUnsplashAPI = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchImages = async (query: string, page: number) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get("https://api.unsplash.com/search/photos", {
                params: { query, page, per_page: PER_PAGE },
                headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
            });
            return response.data.results;
        } catch (err) {
            if (err instanceof AxiosError) {
                const srvErrorText = err.response?.data as string | undefined;
                if (srvErrorText) {
                    setError(srvErrorText);
                } else {
                    setError("Failed to fetch images. Please try again later.");
                }
            } else {
                setError("An unexpected error occurred.");
            }
            return [];
        } finally {
            setLoading(false);
        }
    };

    return { fetchImages, loading, error };
};

export default useUnsplashAPI;
