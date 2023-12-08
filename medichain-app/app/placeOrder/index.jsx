import { View } from "react-native";
import React, { createRef, useState } from "react";
import { Button, Input, Text } from "@rneui/themed";
import Toast from "react-native-toast-message";
import showToast, { types } from "../utils/showToast";

const index = () => {
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const availableQuantity = 100;
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
        style={{ margin: 10 }}
      >
        Place Order
      </Text>
      <View style={{ width: "100%", flexDirection: "column", gap: 8 }}>
        <Text style={{ fontSize: 16, paddingHorizontal: 8, fontWeight: "600" }}>
          Enter your full name :
        </Text>
        <Input
          placeholder="Enter your full name"
          style={{ fontSize: 18 }}
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={{ width: "100%", flexDirection: "column", gap: 8 }}>
        <Text style={{ fontSize: 16, paddingHorizontal: 8, fontWeight: "600" }}>
          Enter Your Address :
        </Text>
        <Input
          placeholder="Enter your address"
          style={{ fontSize: 18 }}
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
      </View>
      <View style={{ width: "100%", flexDirection: "column", gap: 8 }}>
        <Text style={{ fontSize: 16, paddingHorizontal: 8, fontWeight: "600" }}>
          Enter Quantity : ( available : {availableQuantity})
        </Text>
        <Input
          placeholder="Enter Quantity"
          style={{ fontSize: 18 }}
          value={address}
          onChangeText={(text) => setAddress(text)}
          keyboardType="number-pad"
        />
      </View>
      <Button
        type="solid"
        buttonStyle={{ borderRadius: 20 }}
        titleStyle={{ paddingVertical: 2, paddingHorizontal: 10 }}
        onPress={() => {
          showToast(
            types.success,
            "Order placed",
            "Thank you for placing the order"
          );
        }}
        title={"place order"}
      />
      <Toast />
    </View>
  );
};

export default index;
