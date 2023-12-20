import {View, Text, StyleSheet, FlatList} from 'react-native'
import products_data from '../data/products_data.json'
import ProductItem from '../components/ProductItem'
import { useEffect,useState } from 'react'
import Search from '../components/Search'


const ProductsByCategoryScreen = ({route , navigation}) => {

  const [productsbyCategory, setProductsbyCategory] = useState([])
  const [search, setSearch] = useState('')

  const {category} = route.params

  useEffect(() => {
   
    const productsFilteredByCategory = products_data.filter(product => product.category === category)
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
