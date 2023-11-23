import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useInfiniteQuery } from "react-query";
import { nftsApi } from "../api";
import { black } from "../constants";
import useBookmarks from "../hooks/useBookmarks";
import { Item } from "../types";
import Card from "./card";

const ITEM_HEIGHT = 201.3;

const getItemLayout = (_, index: number) => {
  return {
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index: index,
  };
};

export default function NFTs() {
  const { isLoading: bookmarkLoading, allBookmarks } = useBookmarks();

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery("nfts", nftsApi.fetchAllnfts, {
      getNextPageParam: (lastpage) => {
        if (lastpage?.data?.pagination?.has_more) {
          return lastpage?.data?.pagination?.page_number;
        }
        return lastpage;
      },
    });

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const ListFooter = () => {
    if (hasNextPage) {
      return <ActivityIndicator size={"small"} />;
    } else {
      return <Text style={styles.endingText}>No More NFTs</Text>;
    }
  };

  if (isLoading || bookmarkLoading) {
    return (
      <View
        style={{
          padding: 32,
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  const renderItem = ({ item }: { item: Item }) => {
    if (allBookmarks?.length > 0) {
      const isBookmarked = allBookmarks.find(
        (bookmark: Item) =>
          bookmark?.nft_data?.token_id === item?.nft_data?.token_id
      );
      return <Card item={item} isBookmarked={isBookmarked} />;
    }

    return <Card item={item} />;
  };

  if (data) {
    return (
      <View style={styles.container}>
        <FlatList
          columnWrapperStyle={styles.columnWrapper}
          data={
            data?.pages
              ?.map((page) => {
                return page?.data?.items;
              })
              .flat() as Item[]
          }
          numColumns={2}
          renderItem={renderItem}
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={isFetchingNextPage ? ListFooter : null}
          getItemLayout={getItemLayout}
        />
      </View>
    );
  }
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
  endingText: {
    color: "white",
    marginVertical: 16,
  },
});
