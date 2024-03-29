import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { colors } from '../global/colors'
import {AntDesign} from '@expo/vector-icons'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/authSlice'
import { deleteSession } from '../db/index'


const Header = ({ title, navigation }) => {
    const email =  useSelector(state => state.authReducer.user)
    const localId =  useSelector(state => state.authReducer.localId)
    const dispatch = useDispatch()
    const onLogout = () => {
        dispatch(logout())
        const deletedSession = deleteSession(localId);
    }

    return (
        <View style={styles.headerContainer}>
            {
                navigation.canGoBack() ? (
                    <TouchableOpacity onPress={navigation.goBack}>
                        <AntDesign name="caretleft" size={28} color="white" />
                    </TouchableOpacity>
                ) : <View></View>
            }
            <TouchableOpacity onPress={navigation.popToTop}>
                <AntDesign name="home" size={28} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{title}</Text>
            {
                email
                &&
                <TouchableOpacity onPress={onLogout}>
                    <AntDesign name="logout" size={28} color="white" />
                </TouchableOpacity>

            }
        </View>
    )
}

export default Header
const styles = StyleSheet.create({
    headerContainer: {
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 30,
        paddingHorizontal: 40,
        backgroundColor: colors.backgroundDark,
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: colors.borderLight,
    },
    headerTitle: {
        fontSize: 20,
        color: "#fff",
        fontFamily: 'RobotoSerif_28pt_Condensed-Bold',
    },
})