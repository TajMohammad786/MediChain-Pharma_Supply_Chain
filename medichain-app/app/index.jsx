import { View, StyleSheet, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import { Link, router, useRouter } from "expo-router";
import { Text, Button } from "@rneui/themed";
import Toast from "react-native-toast-message";
import showToast, { types } from "./utils/showToast";

const index = () => {
  const router = useRouter();

  useEffect(() => {
    showToast(types.success, "Welcome", "Welcome to Medichain app👋");
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Text h1>Welcome to the Medichain App</Text>
      <Link
        href="/medicines"
        style={styles.link}
        asChild
      >
        <Button
          title="Available Medicines"
          color={"primary"}
          type="outline"
          onPress={() => router.push("medicines")}
        />
      </Link>
      <Toast />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
});
export default index;
