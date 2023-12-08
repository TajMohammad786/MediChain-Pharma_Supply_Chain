import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Card } from "@rneui/themed";

const Medicine = ({ medicine }) => {
  const { name, quantity } = medicine;
  const router = useRouter();
  return (
    <Pressable
      onPress={() => {
        router.push(`/medicines/${name}`);
      }}
    >
      <Card>
        <Card.Title style={{ textTransform: "capitalize" }}> {name}</Card.Title>
        <Card.Divider />
        <View>
          {/* <Image
                  style={styles.image}
                  resizeMode="cover"
                  source={{ uri: u.avatar }}
                /> */}
          <Text h4>Available Quantity : {quantity}</Text>
        </View>
      </Card>
    </Pressable>
  );
};

export default Medicine;
