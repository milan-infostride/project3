import { createSlice } from "@reduxjs/toolkit";

let initialUser = {
    currentUser  : {
        id:-1,
        fullName: 'Guest'
    }
}
const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState: initialUser,
    reducers: {
        setCurrentUser(state,action){
            console.log(action);
            state.currentUser = action.payload.currentUser
        },
        logout(state){
            state.currentUser = initialUser.currentUser;
        }
    }
})

export const currentUserActions  = currentUserSlice.actions;
export default currentUserSlice;