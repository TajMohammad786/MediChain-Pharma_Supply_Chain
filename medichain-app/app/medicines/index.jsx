import { View } from "react-native";
import { medicines } from "../../constants/medicines";
import Medicine from "../../components/Medicine";
import { Text } from "@rneui/themed";
const Medicines = () => {
  return (
    <View>
      <Text
        style={{ textAlign: "center", marginVertical: 15 }}
        h4
      >
        Available Medicines
      </Text>

      {medicines &&
        medicines.map((medicine, index) => (
          <Medicine
            key={index}
            medicine={medicine}
          />
        ))}
    </View>
  );
};

export default Medicines;
