import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { setProfilePicture } from '../features/authSlice';
import { usePutProfilePictureMutation } from '../services/shopServices';

const ImageSelectorScreen = ({ navigation }) => {
  const [image, setImage] = useState('');

  const localId = useSelector(state => state.authReducer.localId);

  const verifyCameraPermissions = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) {
      return false;
    }
    console.log("Permisos otorgados");
    return true;
  };

  const pickImage = async () => {
    const isCameraOk = await verifyCameraPermissions();
    if (isCameraOk) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        base64: true,
        quality: 0.2
      });
      if (!result.canceled) {
        setImage(`data:image/jpeg;base64,${result.assets[0].base64}`);
      }
    } else {
      console.log("No se han otorgado permisos para usar la cámara");
    }
  };

  const dispatch = useDispatch();

  const [triggerSaveProfilePicture, result] = usePutProfilePictureMutation();

  const confirmImage = async () => {
    try {
      dispatch(setProfilePicture(image));
      const response = await triggerSaveProfilePicture({ image, localId });
      console.log('Response from save profile picture:', response);
      navigation.goBack();
    } catch (error) {
      console.error('Error saving profile picture:', error);
      // Agregar manejo de errores aquí, como mostrar un mensaje de error al usuario.
    }
  };

  return (
    <View style={styles.container}>
      {
        image
          ?
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: image }}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.btnContainer}>
              <TouchableOpacity style={styles.btn} onPress={pickImage}>
                <Text style={styles.textBtn}>Tomar otra</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ ...styles.btn, ...styles.btnConfirm }} onPress={confirmImage}>
                <Text style={styles.textBtn}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
          :
          <View style={styles.noImageContainer}>
            <MaterialIcons name="no-photography" size={200} color="#ccc" />
            <TouchableOpacity style={styles.btn} onPress={pickImage}>
              <Text style={styles.textBtn}>Abrir cámara</Text>
            </TouchableOpacity>
          </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  textBtn: {
    color: '#fff',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 125, // half of width and height to make it circular
    marginTop: 20,
  },
  btnContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  btnConfirm: {
    backgroundColor: 'green',
    paddingHorizontal: 20,
    marginLeft: 10,
  },
});

export default ImageSelectorScreen;
