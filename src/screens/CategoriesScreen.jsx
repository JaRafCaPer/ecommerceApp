import {FlatList} from 'react-native'
import CategoryItem from '../components/CategoryItem'
import {useGetCategoriesQuery} from '../services/shopServices'

const CategoriesScreen = ({navigation}) => {

   
    const {data, error, isLoading} = useGetCategoriesQuery();
    const renderCategoryItem = ({item}) => (
        <CategoryItem category={item} navigation={navigation} />
    )

    return(
        <>
        <FlatList
            data={data}
            renderItem={renderCategoryItem}
            keyExtractor={item=>item}
        />
        </>
    )
}

export default CategoriesScreen

