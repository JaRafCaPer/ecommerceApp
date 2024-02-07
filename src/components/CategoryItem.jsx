import { Text, StyleSheet, TouchableOpacity } from "react-native"
import Card from './Card'
import { colors } from "../global/colors"
import { useDispatch } from "react-redux"
import { setCategorySelected } from '../features/shopSlice'


const CategoryItem = ({category, navigation}) => {

    const dispatch = useDispatch()

    return (
      <>
      <TouchableOpacity onPress={()=>{
        
        navigation.navigate("Products", {category})
        dispatch(setCategorySelected(category))
      }
      }>
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
      backgroundColor: colors.backgroundLight,
      padding: 20,
      margin: 10,
  },
  text: {
    textAlign: 'center',
    fontFamily: 'RobotoSerif_28pt_Condensed-Light',
      textTransform: 'capitalize',
      fontSize: 15,
      fontWeight: 'bold',
      color: colors.textDark,
  }
})