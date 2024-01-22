import { StyleSheet, Text, View, TouchableOpacity , Pressable, Image  } from 'react-native'
import {React, useState} from 'react'
import { colors } from '../global/colors'
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'
import { useDispatch } from 'react-redux'
import { setProfilePicture } from '../features/authSlice';


const ImageSelectorScreen = (navigation) => {
  const [image, setImage] = useState('')

  const verifyCameraPermissions = async () => {
      const {granted} = await ImagePicker.requestCameraPermissionsAsync()
      if(!granted){
          alert('Need camera permissions to use this functionality')
          return false
      }
      console.log('granted')
      return true
  }
  const pickImage = async () => {
    const isCameraOk = await verifyCameraPermissions()
    if(isCameraOk) {
      let result =await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing:true,
        aspect:[1,1],
        base64:true,
        quality:0.2
      })
      if(!result.canceled){
        setImage(`data:image/jpg;base64,${result.assets[0].base64}`)
      }
    } else {
      alert('Camera permissions are required to use this functionality')
    }
  }

  const dispatch = useDispatch()

  const confirmImage = () => {
    dispatch(setProfilePicture(image))
    navigation.goBack()


  }

  return (
    <View>
      {
        image
        ?
        <View style={styles.imageContainer}>
            <Image
            source={{uri:image}}
            style= {styles.profilePicture}
            resizeMode='cover'
            />
            <View style={styles.buttonContainer}>
              <Pressable style={styles.button} onPress={pickImage}>
                <Text style={styles.buttonText}>Eliminar</Text>
              </Pressable>
              <Pressable style={styles.button} onPress={confirmImage}>
                <Text style={styles.buttonText}>Guardar</Text>
              </Pressable>
            </View>
        </View>
        :
        <View style={styles.noImageContainer}>
          <MaterialIcons name="no-photography" size={250} color="#ccc"/>
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Abrir Camara</Text>
          </TouchableOpacity>
        </View>
       

      }
    </View>
  )
}

export default ImageSelectorScreen

const styles = StyleSheet.create({
    imageContainer:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:colors.white
    },
    noImageContainer:{
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:colors.white,
      height:'100%'
    },
    buttonContainer:{
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      marginTop:20
    },
    button:{
      backgroundColor:colors.primary,
      borderRadius:10,
      padding:10,
      marginHorizontal:10
    },
    buttonText:{
      color:colors.white,
      fontWeight:'bold',
      fontSize:16
    },
    profilePicture:{
        width:150,
        height:150,
        borderRadius:100,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:20
    },
})