import { StyleSheet, View, FlatList, Text } from 'react-native';
import React from 'react';
import useProduct from '@/components/hooks/useProduct'; // Adjust the path as per your project structure

interface Product {
    id: number;
    category: string;
    name: string;
    inStock: boolean;
}

export default function TabOneScreen() {
    const apiUrl = 'https://simple-grocery-store-api.online/products'; 
    const { products, loading, error, fetchProducts } = useProduct(apiUrl);

    React.useEffect(() => {
        fetchProducts();
    }, []);

    const renderItem = ({ item, index }: { item: Product; index: number }) => (
        <View
        style={[
          styles.item,
          index % 2 !== 0 ? { marginTop: (index + 1) * 10 } : null, // More margin for second column items
      ]}
        >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.category}>Category: {item.category}</Text>
            <Text style={styles.stock}>{item.inStock ? 'In Stock' : 'Out of Stock'}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {loading && <Text>Loading...</Text>}
            {error && <Text style={styles.error}>{error}</Text>}
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                numColumns={2}  // Display items in 2 columns
                columnWrapperStyle={styles.columnWrapper}  // Custom styling for row
                contentContainerStyle={products.length === 0 && !loading && styles.empty}
            />
            {products.length === 0 && !loading && <Text>No products found.</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    item: {
        flex: 1,
        margin: 10,  // Add margin to create space between items
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
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
    columnWrapper: {
        justifyContent: 'space-between',  // Space between columns
    },
    secondColumnItem: {
        marginTop: 20,  // Add some top margin to the second column's items
    },
});


