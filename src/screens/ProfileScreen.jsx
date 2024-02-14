import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import { useSelector} from "react-redux";
import React from 'react'
import { colors } from '../global/colors'

const ProfileScreen = ({navigation}) =>  {
  const user_data = useSelector(state=>state.authReducer.user)
  const image = useSelector(state=>state.authReducer.profilePicture)
  return (
    <View style={styles.profileContainer}>
    <View>
                <Pressable onPress={()=>navigation.navigate("Select Image")}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? '#DCDCDC' : '#E8E8E8',
                        },
                        styles.imageContainer,
                    ]}>
                    {
                        image
                            ?
                            <Image
                                source={{uri:image}}
                                style={styles.profilePicture}
                                resizeMode='contain'
                            />
                            :
                            <Image
                                source={require('../../assets/img/user.png')}
                                style={styles.profilePicture}
                                resizeMode='contain'
                            />

                    }
                </Pressable>
            </View>
    <View style={styles.userDataContainer}>
        <Text style={styles.userTitle}>Nombre:{user_data.name}</Text>
        <Text style={styles.userData}>Email:{user_data}</Text>
        <Text style={styles.userData}>Level:{user_data.level}</Text>
        <Text style={styles.userData}>Tel:{user_data.phone}</Text>
        <Text style={styles.userData}>Direccion:{user_data.address}</Text>
    </View>
    </View>
    
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
    profileContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:colors.white
    },
    imageContainer:{
        width:150,
        height:150,
        borderRadius:100,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:20
    },
    profilePicture:{
        width:150,
        height:150,
        borderRadius:100,
        justifyContent:'center',
        alignItems:'center',
    },
    userDataContainer:{
        justifyContent:'center',
        alignItems:'center',
    },
    userTitle:{
        fontSize:20,
        fontWeight:'bold',
        marginBottom:10
    },
    userData:{
        fontSize:16,
        marginBottom:5
    }
})