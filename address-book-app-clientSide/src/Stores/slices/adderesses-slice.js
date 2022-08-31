import { createSlice } from "@reduxjs/toolkit";

const initialAddresses = {
    addresses: []
}
const addressesSlice = createSlice({
    name: 'addresses',
    initialState: initialAddresses,
    reducers: {
        initialize(state,action){
            //initialAddresses.addresses = action.payload.initialAddresses
            state.addresses = action.payload.initialAddresses

        },
        addAddress(state,action){
            state.addresses.push(action.payload.newAddress)
        },
        removeAddress(state,action){
            let index = state.addresses.findIndex((item)=>{return item.id == action.payload.id})
            state.addresses.splice(index,1);
        },
        editAddress(state,action){
            let index = state.addresses.findIndex((item)=>{return item.id==action.payload.newAddress.id});
            state.addresses[index] = action.payload.newAddress
        },
        sortAddresses(state,action){
            console.log('stype = ',action.payload.sortType)
            if(action.payload.sortType=='dl'){
                state.addresses.sort((a,b)=>{return b.date - a.date})
            }
            if(action.payload.sortType=='do'){
                state.addresses.sort((a,b)=>{return a.date - b.date})
            }
            if(action.payload.sortType=='a-z'){
                state.addresses.sort((a,b)=>{return a.name.toLowerCase().localeCompare(b.name.toLowerCase())})
            }
            if(action.payload.sortType=='z-a'){
                state.addresses.sort((a,b)=>{return b.name.toLowerCase().localeCompare(a.name.toLowerCase())})
            }
        },
    }
})

export const addressActions = addressesSlice.actions;
export default addressesSlice;