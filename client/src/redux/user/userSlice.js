import { createSlice } from "@reduxjs/toolkit";
 
const initialState={
    currentUser:null,
    error:null,
    loading:false
}; 

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
         signInState:(state)=>{
            state.loading = true;
         },
        signInSucces:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null;
        },
        signInFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
        updateUserInit:(state)=>{
            state.loading=true;
        },
        updateUserSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null;
        },
        updateUserFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
        deleteUserInit:(state)=>{
            state.loading=true;
        },
        deleteUserSuccess:(state)=>{
            state.currentUser=null;
            state.loading=false;
            state.error=null;
        },
        deleteUserFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
        signOutUserInit:(state)=>{
            state.loading=true;
        },
        signOutUserSuccess:(state)=>{
            state.currentUser=null;
            state.loading=false;
            state.error=null;
        },
        signOutUserFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
    }  
});

export const{signInState,signInSucces,signInFailure,updateUserInit,updateUserSuccess,updateUserFailure,
    deleteUserInit,deleteUserSuccess,deleteUserFailure,signOutUserInit,signOutUserSuccess,signOutUserFailure
} = userSlice.actions;

export default userSlice.reducer; 