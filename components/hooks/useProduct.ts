// import { useState } from 'react';
// import axios, { AxiosResponse } from 'axios';

// interface Product {
//     id: number;
//     category: string;
//     name: string;
//     inStock: boolean;
// }

// const useProduct = (apiUrl: string) => {
//     const [products, setProducts] = useState<Product[]>([]);
//     const [loading, setLoading] = useState<boolean>(false);
//     const [error, setError] = useState<string | null>(null);

//     const fetchProducts = () => {
//         setLoading(true);
//         setError(null);  
//         axios.get<Product[]>(apiUrl)
//             .then((response: AxiosResponse<Product[]>) => {
//                 setProducts(response.data);
//             })
//             .catch(err => {
//                 setError('Error fetching data');
//                 console.error('Error fetching data:', err);
//             })
//             .finally(() => {
//                 setLoading(false);
//             });
//     };

//     return { products, loading, error, fetchProducts };
// };

// export default useProduct;


import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

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

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);

        const netInfo = await NetInfo.fetch();
        if (!netInfo.isConnected) {
            const cachedData = await AsyncStorage.getItem('cachedProducts');
            if (cachedData) {
                setProducts(JSON.parse(cachedData));
                setLoading(false);
                return;
            } else {
                setError('No internet connection and no cached data available.');
                setLoading(false);
                return;
            }
        }

        try {
            const response: AxiosResponse<Product[]> = await axios.get(apiUrl);
            setProducts(response.data);

            await AsyncStorage.setItem('cachedProducts', JSON.stringify(response.data));
        } catch (err) {
            setError('Error fetching data');
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const loadCachedData = async () => {
            const cachedData = await AsyncStorage.getItem('cachedProducts');
            if (cachedData) {
                setProducts(JSON.parse(cachedData));
            }
        };
        loadCachedData();
    }, []);

    return { products, loading, error, fetchProducts };
};

export default useProduct;
