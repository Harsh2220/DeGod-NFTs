import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { StyleSheet, View } from "react-native";
import { black } from "../constants";
import Card from "../components/card";
import NFTs from "../components/nfts";
import Bookmarks from "../components/bookmarks";

const Tab = createMaterialTopTabNavigator();

export default function index() {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarLabelStyle: {
            fontSize: 16,
            fontWeight: "600",
          },
          lazy: true,
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: black[700],
            borderBottomWidth: 1,
            borderBottomColor: black[700],
          },
          tabBarIndicatorStyle: {
            display: "none",
          },
        }}
      >
        <Tab.Screen name="All NFTs" component={NFTs} />
        <Tab.Screen name="Bookmarks" component={Bookmarks} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: black[700],
    justifyContent: "center",
  },
});
