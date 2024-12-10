import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    cartItems: [],
    isLoading: false
}

// CREATE ASYNC THUNKS

export const addToCart = createAsyncThunk('cart/addToCart', async ({ userId, productId, quantity }) => {

    const response = await axios.post(
        `http://localhost:8080/api/shop/cart/add`, {
        userId, productId, quantity
    }
    );

})

export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async ({ userId }) => {

    const response = await axios.get(
        `http://localhost:8080/api/shop/cart/get/${userId}`
    );

})

export const deleteCartItem = createAsyncThunk('cart/deleteCartItem', async ({ userId, productId }) => {

    const response = await axios.delete(
        `http://localhost:8080/api/shop/cart/${userId}/${productId}`
    );

})

export const updateCartQuantity = createAsyncThunk('cart/updateCartItemQuantity', async ({ userId, productId, quantity }) => {

    const response = await axios.put(
        `http://localhost:8080/api/shop/cart/update-cart`, {
        userId, productId, quantity
    }
    );

})

const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addToCart.pending, (state) => {
            state.isLoading = true
        }).addCase(addToCart.fulfilled, (state, action) => {
            state.isLoading = false
            state.cartItems = action.payload.data
        }).addCase(addToCart.rejected, (state) => {
            state.isLoading = false
            state.cartItems = []
        }).addCase(fetchCartItems.pending, (state) => {
            state.isLoading = true
        }).addCase(fetchCartItems.fulfilled, (state, action) => {
            state.isLoading = false
            state.cartItems = action.payload.data
        }).addCase(fetchCartItems.rejected, (state) => {
            state.isLoading = false
            state.cartItems = []
        }).addCase(updateCartQuantity.pending, (state) => {
            state.isLoading = true
        }).addCase(updateCartQuantity.fulfilled, (state, action) => {
            state.isLoading = false
            state.cartItems = action.payload.data
        }).addCase(updateCartQuantity.rejected, (state) => {
            state.isLoading = false
            state.cartItems = []
        }).addCase(deleteCartItem.pending, (state) => {
            state.isLoading = true
        }).addCase(deleteCartItem.fulfilled, (state, action) => {
            state.isLoading = false
            state.cartItems = action.payload.data
        }).addCase(deleteCartItem.rejected, (state) => {
            state.isLoading = false
            state.cartItems = []
        })
    }
})

export default shoppingCartSlice.reducer;