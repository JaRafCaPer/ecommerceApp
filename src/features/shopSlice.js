import { createSlice } from "@reduxjs/toolkit";
import categories_data from '../data/categories_data.json'
import products_data from '../data/products_data.json'

export const shopSlice = createSlice({
    name: "shop",
    initialState: {
        categorySelected: '',
        productIdSelected: null,
        categories: categories_data,
        products: products_data,
        productsFiltererByCategory: [],
    },
    reducers: {
        setCategorySelected: (state, action) => {
            state.categorySelected = action.payload;
            state.productsFiltererByCategory = products_data.filter(product => product.category === state.categorySelected);
        },
        setProductIdSelected: (state, action) => {
            state.productIdSelected = action.payload;
        }
    }
});

export const { setCategorySelected, setProductIdSelected } = shopSlice.actions;

export default shopSlice.reducer;
