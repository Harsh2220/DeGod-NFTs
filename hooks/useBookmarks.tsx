import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Item } from "../types";

const LOCAL_BOOKMARK_KEY = "Bookmarks";

export default function useBookmarks() {
  const [allBookmarks, setallBookmarks] = useState(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function getAllBookMarks() {
    try {
      const bookmarks = await AsyncStorage.getItem(LOCAL_BOOKMARK_KEY);
      return JSON.parse(bookmarks);
    } catch (error) {
      console.log(error);
    }
  }

  async function addToBookMark(nft: Item) {
    try {
      const isFirstBookMark = await AsyncStorage.getItem(LOCAL_BOOKMARK_KEY);

      if (!isFirstBookMark) {
        const localNftArray = [nft];
        await AsyncStorage.setItem(
          LOCAL_BOOKMARK_KEY,
          JSON.stringify(localNftArray)
        );
      } else {
        const allBookMarks = await AsyncStorage.getItem(LOCAL_BOOKMARK_KEY);
        let parsedItems = JSON.parse(allBookMarks);
        if (!Array.isArray(parsedItems)) {
          parsedItems = [];
        }
        parsedItems.push(nft);
        setallBookmarks(parsedItems);
        await AsyncStorage.setItem(
          LOCAL_BOOKMARK_KEY,
          JSON.stringify(parsedItems)
        );
      }
    } catch (error) {
      console.error("Error adding to bookmarks:", error);
    }
  }

  async function removefromBookMarks(tokenId: string) {
    try {
      const allBookmarks = await AsyncStorage.getItem(LOCAL_BOOKMARK_KEY);
      const parsedItems: Item[] = JSON.parse(allBookmarks);
      const updatedBookMarks = parsedItems.filter((nft) => {
        return nft?.nft_data?.token_id !== tokenId;
      });
      setallBookmarks(updatedBookMarks);
      await AsyncStorage.setItem(
        LOCAL_BOOKMARK_KEY,
        JSON.stringify(updatedBookMarks)
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function refetch() {
    try {
      setIsLoading(true);
      getAllBookMarks().then((res) => {
        if (res.length) {
          setallBookmarks(res);
        } else {
          setallBookmarks(undefined);
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    refetch();
  }, []);

  return {
    isLoading,
    allBookmarks,
    refetch,
    addToBookMark,
    removefromBookMarks,
  };
}
