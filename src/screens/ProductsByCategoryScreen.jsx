import {FlatList} from 'react-native'
import ProductItem from '../components/ProductItem'
import { useEffect,useState } from 'react'
import Search from '../components/Search'
import {  useSelector } from 'react-redux'
import { useGetProductsByCategoryQuery } from '../services/shopServices'
import { ActivityIndicator } from 'react-native'


const ProductsByCategoryScreen = ({route , navigation}) => {

  const [productsbyCategory, setProductsbyCategory] = useState([])
  const [search, setSearch] = useState('')

  const category = useSelector(state => state.shopReducer.categorySelected)

   const {data: productsFilteredByCategory, error, isLoading} = useGetProductsByCategoryQuery(category);
  
  useEffect(() => {
    if(!isLoading){
      const productsValues = Object.values(productsFilteredByCategory)
      const productsFilteredBySearch = productsValues.filter(
        product=>product.title.toLowerCase().includes(search.toString().toLowerCase()))
      setProductsbyCategory(productsFilteredBySearch)
    }
  }, [isLoading, category, search])
  const renderProductItem = ({item}) => (
    <ProductItem product={item} navigation={navigation} />
  )
    const onSearch = (search) => {
        setSearch(search)
    }
    return(
       <>{
        isLoading?
        <ActivityIndicator size="large" color="#0000ff" />
        :
        <>
        <Search onSearchHandlerEvent={onSearch} />
        <FlatList
            data={productsbyCategory}
            renderItem={renderProductItem}
            keyExtractor={item=>item.id}
        />
        </>
       }
        
       </>
    )
}

export default ProductsByCategoryScreen
