import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { black, white } from "../constants";
import { Item } from "../types";
import formatAddress from "../utils/formatAddress";
import useBookmarks from "../hooks/useBookmarks";

type CardProps = {
  item: Item;
  isBookmarked?: boolean;
};

function Card({ item, isBookmarked = false }: CardProps) {
  const [isAdded, setIsAdded] = useState(isBookmarked);
  const { addToBookMark, removefromBookMarks } = useBookmarks();

  const handleBookMark = () => {
    if (isAdded) {
      removefromBookMarks(item?.nft_data?.token_id);
      setIsAdded(false);
    } else {
      addToBookMark(item);
      setIsAdded(true);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: item?.nft_data?.external_data?.image_256,
        }}
        style={styles.image}
      />
      <View style={styles.dataContainer}>
        <View>
          <Text style={styles.heading}>
            {item?.nft_data?.external_data?.name}
          </Text>
          <Text style={styles.subText}>
            {formatAddress(item?.nft_data?.original_owner)}
          </Text>
        </View>
        <TouchableOpacity onPress={handleBookMark}>
          <Ionicons
            name={isAdded ? "bookmark" : "bookmark-outline"}
            color={isAdded ? "cyan" : "white"}
            size={24}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default React.memo(Card);

const styles = StyleSheet.create({
  container: {
    width: 180,
    backgroundColor: black[600],
    padding: 8,
    borderRadius: 8,
    marginVertical: 8,
  },
  image: {
    height: 150,
    width: "100%",
    borderRadius: 8,
  },
  dataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  heading: {
    fontSize: 16,
    fontWeight: "600",
    color: white[700],
  },
  subText: {
    fontSize: 12,
    fontWeight: "600",
    color: white[500],
  },
});
