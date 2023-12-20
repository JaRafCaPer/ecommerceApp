import { StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import {useState} from 'react'
import { EvilIcons, Entypo } from '@expo/vector-icons';


const Search = ({onSearchHandlerEvent}) => {
    const [searchInput, setSearchInput] = useState('')
    const [error, setError] = useState("")

    const onSearchHandler=()=>{
       const regEx=/[^\w\s]/
       if(regEx.test(searchInput)){
           setError("Only letters and numbers allowed")
           setSearchInput("")
    } else {
        setError("")
        onSearchHandlerEvent(searchInput)
    }
    }

    const onResetSearchHandler=()=>{
        setSearchInput("")
        onSearchHandlerEvent(searchInput)
    }
  return (
    <>
    <View style={styles.searchContainer}>
        <TextInput
            style={styles.textInput}
            onChangeText={setSearchInput}
            placeholder="Search..."
            value={searchInput}
        />
        <TouchableOpacity onPress={()=>{onSearchHandler(searchInput)}}>
            <EvilIcons name="search" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onResetSearchHandler}>
            <Entypo name="cross" size={24} color="black" />
        </TouchableOpacity>
    </View>
    {
        error
        ?
        <View>
        <Text>{error}</Text>
        </View>
        :
        null
    }
    </>
  )
}

export default Search

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#e7e7e7',
        borderRadius: 5,
        margin: 5,
        padding: 5
    },
    textInput: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 5
    }
})