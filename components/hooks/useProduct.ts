import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

interface Product {
    id: number;
    category: string;
    name: string;
    inStock: boolean;
}

const useProduct = (apiUrl: string) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = () => {
        setLoading(true);
        setError(null); // Reset any previous error
        axios.get<Product[]>(apiUrl)
            .then((response: AxiosResponse<Product[]>) => {
                setProducts(response.data);
            })
            .catch(err => {
                setError('Error fetching data');
                console.error('Error fetching data:', err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return { products, loading, error, fetchProducts };
};

export default useProduct;


