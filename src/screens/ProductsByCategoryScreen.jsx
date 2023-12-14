import {View, Text, StyleSheet, FlatList} from 'react-native'
import products_data from '../data/products_data.json'
import ProductItem from '../components/ProductItem'
import Header from '../components/Header'
import { useEffect,useState } from 'react'
import Search from '../components/Search'


const ProductsByCategoryScreen = ({category}) => {

  const [productsbyCategory, setProductsbyCategory] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
   
    const productsFilteredByCategory = products_data.filter(product => product.category === category)
    const productsFilteredBySearch = productsFilteredByCategory.filter(
      product=>product.title.toLowerCase().includes(search.toString().toLowerCase()))
    setProductsbyCategory(productsFilteredBySearch)
  }, [category, search])
  const renderProductItem = ({item}) => (
    <ProductItem product={item} />
  )
    const onSearch = (search) => {
        setSearch(search)
    }
    return(
       <>
        <Header title="Products" />
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
