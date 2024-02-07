import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { base_url } from '../firebase/database';

export const shopApi = createApi({
    reducerPath: 'shopApi',
    baseQuery: fetchBaseQuery({ baseUrl: base_url }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => 'products.json'
        }),
        getCategories: builder.query({
            query: () => 'categories.json'
        }),
        getProductsByCategory: builder.query({
            query: (category) => `products.json?orderBy="category"&equalTo="${category}"`
        }),
        getProductById: builder.query({
            query: (id) => `products/${id}.json`
        }),
        getOrders: builder.query({
            query: (user) => 'orders.json'
        }),
        getCart: builder.query({
            query: () => 'cart.json'
        }),
        addToCart: builder.mutation({
            query: (product) => ({
                url: 'cart.json',
                method: 'POST',
                body: product
            })
        }),
        postOrder: builder.mutation({
                query: ({...order}) => ({
                    url: 'orders.json',
                    method: 'POST',
                    body: order
                })
        }),
        updateCart: builder.mutation({
            query: (cart) => ({
                url: 'cart.json',
                method: 'PUT',
                body: cart
            })
        }),
        removeFromCart: builder.mutation({
            query: (id) => ({
                url: `cart/${id}.json`,
                method: 'DELETE'
            })
        }),
        clearCart: builder.mutation({
            query: () => ({
                url: 'cart.json',
                method: 'DELETE'
            })
        }),
    }),
});
export const { useGetProductsQuery, useGetCategoriesQuery, useGetProductsByCategoryQuery, useGetProductByIdQuery, useGetOrdersQuery, useGetCartQuery, usePostOrderMutation, useAddToCartMutation, useUpdateCartMutation, useRemoveFromCartMutation, useClearCartMutation } = shopApi;