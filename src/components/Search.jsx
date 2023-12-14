import { StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import {useState} from 'react'
import { EvilIcons, Entypo } from '@expo/vector-icons';


const Search = ({onSearchHandlerEvent}) => {
    const [searchInput, setSearchInput] = useState('')
  return (
    <View style={styles.searchContainer}>
        <TextInput
            style={styles.textInput}
            onChange={setSearchInput}
            placeholder="Search..."
            value={searchInput}
        />
        <TouchableOpacity onPress={()=>onSearchHandlerEvent(searchInput)}>
            <EvilIcons name="search" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={null}>
            <Entypo name="cross" size={24} color="black" />
        </TouchableOpacity>
    </View>
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