import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./TabNavigator";
import AuthNavigator from "./AuthNavigator";
import { useSelector, useDispatch } from "react-redux";
import { useGetProfilePictureQuery } from "../services/shopServices";
import { useEffect } from "react";
import { setProfilePicture, setUser, setUserLocation } from "../features/authSlice";

import { fetchSession } from "../db";

const MainNavigator = () => {
    const user = useSelector(state=>state.authReducer.user)
    const localId = useSelector(state=>state.authReducer.localId)

    const {data,error, isLoading } = useGetProfilePictureQuery(localId)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(data){
            dispatch(setProfilePicture(data.image))
        }
       
       
    },[data, isLoading])

    useEffect(()=>{
        (async ()=>{
            try{
                const session = await fetchSession()
                console.log("Session:", session)
                if(session?.rows.length){
                    console.log("Se han encontrado datos de usuario")
                    const user = session.rows._array[0]
                    dispatch(setUser(user))
                }
            }catch(error){
                console.log("Error al obtener datos del usuario local: ", error.message)
            }
        })()
    },[])


    return (
        <NavigationContainer >
            {user && !isLoading ? <TabNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    )

}

export default MainNavigator