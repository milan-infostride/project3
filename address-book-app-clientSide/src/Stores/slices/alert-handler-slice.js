import { createSlice } from "@reduxjs/toolkit";

let initialertState = {
    
        alertOpen : false,
        message: '',
        severety: ''
  
   
}
const alertHandlerSlice = createSlice({
    name: 'alertHandlerSlice',
    initialState: initialertState,
    reducers: {
        fireAlert(state,action){
             
            
                state.message = action.payload.message,
                state.severety = action.payload.severety
                state.alertOpen = true;
             },
        closeAlert(state){
            state.alertOpen = false
        }

    }
})

export const alertHandlerActions = alertHandlerSlice.actions;
export default alertHandlerSlice;