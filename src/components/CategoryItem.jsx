import { Text, StyleSheet, TouchableOpacity } from "react-native"
import Card from './Card'
import { colors } from "../global/colors"


const CategoryItem = ({category, navigation}) => {
    return (
      <>
      <TouchableOpacity onPress={()=>navigation.navigate("Products", {category})}>
        <Card style={styles.cardContainer}>
            <Text style={styles.text}>{category}</Text>
        </Card>
      </TouchableOpacity>
      </>
    )
}

export default CategoryItem

const styles = StyleSheet.create({
  cardContainer: {
      backgroundColor: colors.backgroundDark,
      padding: 20,
      margin: 10,
  },
  text: {
    textAlign: 'center',
    fontFamily: 'RobotoSerif_28pt_Condensed-Light',
      textTransform: 'capitalize',
      fontSize: 15
  }
})