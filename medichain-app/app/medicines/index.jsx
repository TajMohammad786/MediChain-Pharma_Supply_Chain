import { View } from "react-native";
import Medicine from "../../components/Medicine";
import { Text } from "@rneui/themed";
import { useEffect, useState } from "react";
import { axiosOptions } from "../utils/axiosOptions";

const Medicines = () => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosOptions.get("/medicines");
        const { success, data } = res;
        setMedicines(data.medicines);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <View>
      <Text style={{ textAlign: "center", marginVertical: 15 }}>
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
