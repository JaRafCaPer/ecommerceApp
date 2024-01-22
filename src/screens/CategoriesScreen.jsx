import {View, Text, StyleSheet, FlatList} from 'react-native'
import { useSelector } from 'react-redux'
import CategoryItem from '../components/CategoryItem'

const CategoriesScreen = ({navigation}) => {

    const categories = useSelector(state => state.shopReducer.categories);

    const renderCategoryItem = ({item}) => (
        <CategoryItem category={item} navigation={navigation} />
    )

    return(
        <>
        <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={item=>item}
        />
        </>
    )
}

export default CategoriesScreen

