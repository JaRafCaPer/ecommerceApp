import { View, Text, StyleSheet } from 'react-native'
import { colors } from '../global/colors'

const Header = ({ title }) => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>{title}</Text>
        </View>
    )
}

export default Header
const styles = StyleSheet.create({
    headerContainer: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.backgroundLight,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderLight,
    },
    headerTitle: {
        fontSize: 20,
        color: colors.textLight,
        fontFamily: 'RobotoSerif_28pt_Condensed-Bold',
    },
})