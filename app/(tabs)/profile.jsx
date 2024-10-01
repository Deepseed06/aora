import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList,Image,Text, View } from "react-native";
import useAppwrite from "../../lib/useAppwrite";
import EmptyState from "../../components/EmptyState";
import SearchInput from "../../components/SearchInput";
import VideoCard from "../../components/VideoCard";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { getAllPosts, searchPosts } from "../../lib/appwrite";
import { TouchableOpacity } from "react-native";
import { icons } from "../../constants";
import InfoBox from "../../components/InfoBox";


const Profile = () => {
  const { data:posts} = useAppwrite(() => getAllPosts());
  const logout = () => {
    const [user, setUser] = useState()
  }
  
  return (
    <SafeAreaView className="bg-primary h-full">
     <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full flex items-center 
          justify-center mt-6 mb-12 px-4">
            <TouchableOpacity
            className="w-full items-end mb-10"
            onPress={logout}
            >
              <Image source={icons.logout}
              resizeMode="contain"
              className="w-6 h-6"
              />
            </TouchableOpacity>
            <View className="w-16 h-16 border border-secondary 
            rounded-lg justify-center items-center">
              <Text className="text-white text-3xl">D</Text>
            </View>
        
            <InfoBox 
            title="Deepseed"
            containerStyles="mt-5"
            titleStyles="text-lg"
            />
            <View className="mt-5 flex-row">
            <InfoBox 
            title={posts.length || 0}
            subtitle="Posts"
            containerStyles="mr-10"
            titleStyles="text-xl"
            />
            <InfoBox 
            title="1.2k"
            subtitle="Followers"
            titleStyles="text-xlS"
            />
             
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;