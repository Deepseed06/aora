import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'
import { router, usePathname } from 'expo-router'

const SearchInput = ({initialQuery}) => {
  const pathname = usePathname()
  const [query, setQuery] = useState(initialQuery ||'')
  return (

      <View className="w-full h-16 px-4 bg-black-100 border-2 flex-row
       border-black-200 rounded-2xl focus:border-secondary 
       space-x-4 items-center">
        <TextInput 
        className="text-base mt-0.5 text-white font-pregular flex-1"
        value={query}
        placeholder='Search for a video topic'
        placeholderTextColor='#CDCDE0'
        onChangeText={(e) => setQuery(e) }
        />

        <TouchableOpacity onPress={() => {
          if(!query){
            return Alert.alert('Missing query', 
              "Please input something to search results across database")
          }
          if(pathname.startsWith('/search')) router.setParams({query})
            else router.push(`/search/${query}`)
        }}>
            <Image
            source={icons.search}
            className='w-5 h-5'
            resizeMode='contain'
            />
        </TouchableOpacity>
      </View>
   
  )
}

export default SearchInput