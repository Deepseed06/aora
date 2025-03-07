import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { TouchableOpacity } from 'react-native'
import { ResizeMode, Video } from 'expo-av'
import { icons } from '../../constants'
import * as DocumentPicker from "expo-document-picker"
import { createVideoPost } from '../../lib/appwrite'
const Create = () => {
const [uploading, setUploading] = useState(false);
const [form, setForm] = useState({
  title:'',
  video: null,
  thumbnail: null,
  prompt:''
})

const openPicker = async(selectType) =>  {
  const result = await DocumentPicker.getDocumentAsync({
    type: selectType === 'image' ? 
    ['image/png', 'image/jpg'] :
    ['video/mp4', 'video.gif']

  })
if(!result.canceled) {
  if(selectType === 'image'){
    setForm({...form, thumbnail: result.assets[0]})
  }
  if(selectType === 'video'){
    setForm({...form, video: result.assets[0]})
  }
 
} else {setTimeout(() =>{
  Alert.alert('No Document picked')
}, 100)
}}

const submit = async () => {
  
  setUploading(true)

  try {
    await createVideoPost({...form})
    Alert.alert('Success', 'Post uploaded successfully')
  } catch (error) {
    Alert.alert('Error', error.message)
  } finally{
    setForm({
      title:'',
      video: null,
      thumbnail: null,
      prompt:''
    })
    setUploading(false)
  }
}
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">

      <Text className="text-2xl text-white 
      font-psemibold">Upload Video</Text>
      <FormField
      title="Video title"
      value={form.title}
      placeholder="Give your video a catchy title..."
      handleChangeText={(e) => setForm({...form, title:e})}
      otherStyles="mt-10"
      />
      <View className="mt-7 space-y-2">
        <Text className="text-base font-pmedium text-gray-100">
          Upload Video
        </Text>
        <TouchableOpacity onPress={() => openPicker('video')}>
          {
            form.video ? (
              <Video
              source={{uri:form.video.uri}}
              className="w-full h-64 rounded-2xl"
              resizeMode={ResizeMode.COVER}
             
              />
            ):(
              <View className=" w-full h-40 px-4 bg-black-100
              rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed 
                border-secondary-100 justify-center items-center">
                  <Image source={icons.upload} resizeMethod='contain'
                  className="w-1/2 h-1/2"/>
                </View>
              </View>
            )
          }
        </TouchableOpacity>

      </View>
      <View className="mt-7 space-y-2">
      <Text className="text-base font-pmedium text-gray-100">
          Thumbnail Image
        </Text>
        <TouchableOpacity onPress={() => openPicker('image')}>
          {
            form.thumbnail ? (
              <Image
              source={{uri:form.thumbnail.uri}}
              className="w-full h-64 rounded-2xl"
              resizeMode="cover"           
              />
            ):(
              <View className=" w-full h-40 px-4 bg-black-100
              rounded-2xl justify-center items-center border-2
              border-black-200 flex-row space-x-2">
                  <Image source={icons.upload} resizeMethod='contain'
                  className="w-5 h-5"/>
                  <Text className="text-sm text-gray-100 font-pmedium">
                    Choose a file
                  </Text>
              </View>
            )
          }
        </TouchableOpacity>
      </View>

      <FormField
      title="AI promp "
      value={form.prompt}
      placeholder="The prompt you use to create this video"
      handleChangeText={(e) => setForm({...form, prompt:e})}
      otherStyles="mt-7"
      />
      
      <CustomButton
      title="Submit & Publish"
      handlePress={submit}
      containerStyles="mt-7"
      isLoading={uploading}
      />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create