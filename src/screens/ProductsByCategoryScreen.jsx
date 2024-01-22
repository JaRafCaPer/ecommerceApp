import {View, Text, StyleSheet, FlatList} from 'react-native'
import ProductItem from '../components/ProductItem'
import { useEffect,useState } from 'react'
import Search from '../components/Search'
import { useDispatch, useSelector } from 'react-redux'


const ProductsByCategoryScreen = ({route , navigation}) => {

  const [productsbyCategory, setProductsbyCategory] = useState([])
  const [search, setSearch] = useState('')

  const category = useSelector(state => state.shopReducer.categorySelected)
  const productsFilteredByCategory = useSelector(state => state.shopReducer.productsFiltererByCategory)
  
  useEffect(() => {
    const productsFilteredBySearch = productsFilteredByCategory.filter(
      product=>product.title.toLowerCase().includes(search.toString().toLowerCase()))
    setProductsbyCategory(productsFilteredBySearch)
  }, [category, search])
  const renderProductItem = ({item}) => (
    <ProductItem product={item} navigation={navigation} />
  )
    const onSearch = (search) => {
        setSearch(search)
    }
    return(
       <>
        <Search onSearchHandlerEvent={onSearch} />
        <FlatList
            data={productsbyCategory}
            renderItem={renderProductItem}
            keyExtractor={item=>item.id}
        />
       </>
    )
}

export default ProductsByCategoryScreen
