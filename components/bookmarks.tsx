import React, { useEffect } from "react";
import { Button, RefreshControl, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { black } from "../constants";
import useBookmarks from "../hooks/useBookmarks";
import Card from "./card";

const ITEM_HEIGHT = 201.3;
const getItemLayout = (_, index: number) => {
  return {
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index: index,
  };
};

export default function Bookmarks({ navigation }) {
  const { allBookmarks, isLoading, refetch } = useBookmarks();

  useEffect(() => {
    refetch();
  }, [navigation, refetch]);

  const Empty = () => {
    return (
      <View style={styles.emptyBoxContainer}>
        <Text style={styles.emptyBoxText}>
          Looks like you don't have any bookmarks yet
        </Text>
        <Button title="Refresh" onPress={refetch} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {!allBookmarks && <Empty />}
      {allBookmarks?.length && (
        <FlatList
          columnWrapperStyle={styles.columnWrapper}
          data={allBookmarks}
          numColumns={2}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refetch} />
          }
          renderItem={({ item }) => <Card item={item} isBookmarked={true} />}
          getItemLayout={getItemLayout}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: black[700],
    justifyContent: "center",
  },
  columnWrapper: {
    flex: 1,
    justifyContent: "space-around",
  },
  emptyBoxContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  emptyBoxText: {
    color: "gray",
    fontSize: 16,
  },
});
