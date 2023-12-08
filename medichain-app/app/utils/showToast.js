import Toast from "react-native-toast-message";

export const types = {
  success: "success",
  info: "info",
  error: "error",
};

export default function (type, heading, message) {
  Toast.show({
    type: type,
    text1: heading,
    text2: message,
  });
}
