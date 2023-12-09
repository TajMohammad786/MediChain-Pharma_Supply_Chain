import { SafeAreaView, Pressable } from "react-native";
import React, { useEffect } from "react";
import { Link, router, useRouter } from "expo-router";
import { Text } from "@rneui/themed";
import Toast from "react-native-toast-message";
import showToast, { types } from "./utils/showToast";

const index = () => {
  const router = useRouter();

  useEffect(() => {
    showToast(types.success, "Welcome", "Welcome to Medichain app👋");
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 15,
      }}
    >
      <Text style={{ fontSize: 32, fontWeight: "bold" }}>
        Welcome to the Medichain App
      </Text>
      <Link
        href="/medicines"
        asChild
      >
        <Pressable
          style={{
            borderRadius: 10,
            backgroundColor: "#2165",
            paddingHorizontal: 15,
            paddingVertical: 6,
          }}
          onPress={() => {
            router.push("medicines");
          }}
        >
          <Text>Available Medicines</Text>
        </Pressable>
      </Link>
      <Toast />
    </SafeAreaView>
  );
};

export default index;
