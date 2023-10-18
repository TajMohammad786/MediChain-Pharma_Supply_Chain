const calculateStringLength = (web3, name) => {
  // Convert the hexadecimal string to bytes
  const bytes = web3.utils.hexToBytes(name);
  let length = 0;

  for (let i = 0; i < bytes.length; i++) {
    // Check for the null terminator (0x00) to determine the end of the string
    if (bytes[i] !== 0) {
      length++;
    } else {
      break;
    }
  }

  return length;
};

export const getTrimmedString = (web3, name) => {
  const length = calculateStringLength(web3, name);

  // Slice the name string based on the calculated length
  const trimmedString = web3.utils.hexToUtf8(name).slice(0, length);

  return trimmedString;
};
