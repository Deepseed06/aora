import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList,Text, View } from "react-native";
import useAppwrite from "../../lib/useAppwrite";
import EmptyState from "../../components/EmptyState";
import SearchInput from "../../components/SearchInput";
import VideoCard from "../../components/VideoCard";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { searchPosts } from "../../lib/appwrite";


const Search = () => {
  const { data:posts, refetch } = useAppwrite(() => searchPosts(query));
  const {query} = useLocalSearchParams();
useEffect(() => {
  refetch()
}, [query])


  
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
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Search Results:
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                 {query}
                </Text>
              </View>
            </View>

            <SearchInput initialQuery={query}/>
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

export default Search;