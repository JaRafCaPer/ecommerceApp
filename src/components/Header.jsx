import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { colors } from '../global/colors'
import {AntDesign} from '@expo/vector-icons'

const Header = ({ title, navigation }) => {
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
        borderBottomWidth: 1,
        borderBottomColor: colors.borderLight,
    },
    headerTitle: {
        fontSize: 20,
        color: colors.textDark,
        fontFamily: 'RobotoSerif_28pt_Condensed-Bold',
    },
})