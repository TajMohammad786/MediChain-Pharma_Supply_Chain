import { View } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Button, Text } from "@rneui/themed";

const Medicine = () => {
  const { slug } = useLocalSearchParams();
  const router = useRouter();
  return (
    <View
      style={{
        paddingVertical: 15,
        paddingHorizontal: 15,
        alignItems: "center",
      }}
    >
      <Text
        h4
        style={{ textTransform: "capitalize" }}
      >
        {slug}
      </Text>
      <View
        style={{
          margin: 10,
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Text
          style={{ fontSize: 20, textAlign: "left", alignSelf: "flex-start" }}
        >
          Medicine Description :
        </Text>
        <View
          style={{
            width: "80%",
            flexDirection: "row",
            gap: 8,
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: 15,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Name : </Text>
          <Text style={{ fontSize: 18, textTransform: "capitalize" }}>
            paracetamol
          </Text>
        </View>
        <View
          style={{
            width: "80%",
            flexDirection: "row",
            gap: 8,
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: 15,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Quantity : </Text>
          <Text style={{ fontSize: 18, textTransform: "capitalize" }}>
            100 units
          </Text>
        </View>
        <Button
          type="outline"
          title={"Place Order"}
          buttonStyle={{
            borderWidth: 1,
            borderColor: "blue",
            borderRadius: 30,
          }}
          containerStyle={{
            width: 150,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          titleStyle={{ fontWeight: "500" }}
          onPress={() => {
            router.push("/placeOrder");
          }}
        />
      </View>
    </View>
  );
};

export default Medicine;
