import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";




const initialState = {
    approvalURL: null,
    isLoading: false,
    orderId: null
}

export const createNewOrder = createAsyncThunk('/order/createNewOrder', async (orderData) => {

    const response = await axios.post('http://localhost:8080/api/shop/order/create')

    return response.data;

})

const shoppingOrderSlice = createSlice({
    name: 'shoppingOrderSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createNewOrder.pending, (state) => {
            state.isLoading = true;
        }).addCase(createNewOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.approvalURL = action.payload.approvalURL
            state.orderId = action.payload.orderId
        }).addCase(createNewOrder.rejected, (state) => {
            state.isLoading = false;
            state.approvalURL = null;
            state.orderId = null;
        })
    },



});

export default shoppingOrderSlice.reducer;