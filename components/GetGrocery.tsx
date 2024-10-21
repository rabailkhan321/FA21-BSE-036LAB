import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import useProduct from './hooks/useProduct'; 

const GetGrocery = () => {
    const apiUrl = 'https://simple-grocery-store-api.online/products'; 
    const { products, loading, error, fetchProducts } = useProduct(apiUrl);

    return (
        <View style={styles.container}>
            <Button title="Get Products" onPress={fetchProducts} />
            {loading && <Text>Loading...</Text>}
            {error && <Text style={styles.error}>{error}</Text>}
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.category}>Category: {item.category}</Text>
                        <Text style={styles.stock}>{item.inStock ? 'In Stock' : 'Out of Stock'}</Text>
                    </View>
                )}
                contentContainerStyle={products.length === 0 && !loading && styles.empty}
            />
            {products.length === 0 && !loading && <Text>No products found.</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    item: {
        marginBottom: 16,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    category: {
        fontSize: 14,
        color: '#555',
    },
    stock: {
        fontSize: 14,
        
    },
    error: {
        color: 'red',
        marginVertical: 10,
    },
    empty: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
});

export default GetGrocery;


