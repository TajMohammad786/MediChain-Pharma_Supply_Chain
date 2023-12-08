import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Home" }}
      />
      <Stack.Screen
        name="login"
        options={{ title: "Login Page" }}
      />
      {/* Transactions pages */}
      <Stack.Screen
        name="transactions/index"
        options={{ title: "Transactions" }}
      />
      {/* medicines */}
      <Stack.Screen
        name="medicines/index"
        options={{ title: "Medicines" }}
      />
      <Stack.Screen
        name="medicines/[slug]"
        options={{ title: "Medicines details page" }}
      />
      <Stack.Screen
        name="placeOrder/index"
        options={{ presentation: "modal", title: "place order " }}
      />
    </Stack>
  );
};

export default _layout;
