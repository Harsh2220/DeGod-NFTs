import React from "react";
import { Stack } from "expo-router";
import { black, white } from "../constants";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
const StackLayout = () => {
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: black[700],
          },
          headerTintColor: white[700],
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "DeGod NFTs",
          }}
        />
      </Stack>
      </QueryClientProvider>
    </>
  );
};

export default StackLayout;
