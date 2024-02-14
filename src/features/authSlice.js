import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name:"auth",
    initialState:{
        user: null,
        token: null,
        profilePicture: null, 
        localId: null,
      
    },
    reducers:{
        setUser: (state, action) => {
            state.user = action.payload.email,
            state.token = action.payload.idToken,
            state.localId = action.payload.localId
        },
        setProfilePicture: (state, action) => {
            state.profilePicture = action.payload
        },
        logout: (state) => {
            state.user = null
            state.token = null
            state.profilePicture = null
            state.localId = null
            state.location = null
        }
    }   
})

export const {setUser, setProfilePicture, setUserLocation, logout} = authSlice.actions

export default authSlice.reducer