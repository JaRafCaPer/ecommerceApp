import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Input from '../components/Input'
import { colors } from '../global/colors'
import { useLogInMutation } from '../services/authService'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../features/authSlice'
import { insertSession } from '../db'

const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [triggerLogIn, result] = useLogInMutation()

    const onSubmit = () => {
        triggerLogIn({email, password})
    }
    const dispatch = useDispatch()

    useEffect(()=>{
        if(result.data){
            dispatch(setUser(result.data))
            insertSession({
              localId: result.data.localId,
              email: result.data.email,
              token: result.data.idToken
          })
          .then(result=>console.log("Éxito al guardar sesión: ", result))
          .catch(error=>console.log("Error al guardar sesión: ", error.message))
        }

    }, [result])

    return (
        <View style={styles.container}>
            <Input
                label="Email:"
                onChange={setEmail}
            />
            <Input
                label="Password:"
                onChange={setPassword}
                isSecureEntry={true}
            />
            <TouchableOpacity style={styles.btn} onPress={onSubmit}>
                <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>
            <View style={styles.altContainer}>
                <Text style={styles.subtitle}>Registration</Text>
                <TouchableOpacity onPress={() => { navigation.navigate("Signup") }}>
                    <Text style={styles.subtitleLink}>Sing Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.tertiary,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      gap: 10,
    },
    btn: {
      padding: 10,
      backgroundColor: colors.primary,
      borderRadius: 8,
      margin: 10,
      width: 100,
  
    },
    btnText: {
      color: "#fff",
      fontFamily: "RobotoSerif_28pt_Condensed-Bold",
      textAlign: 'center',
    },
    altContainer: {
      flexDirection: 'row',
      gap: 5,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 50,
    },
    subtitle: {
      color: "#fff",
      fontFamily: "RobotoSerif_28pt_Condensed-Bold",
      fontSize: 12,
    },
    subtitleLink: {
      fontFamily: "RobotoSerif_28pt_Condensed-Light",
      color: "#fff",
      fontSize: 11,
      textDecorationLine: 'underline'
    }
  })