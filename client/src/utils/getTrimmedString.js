const calculateStringLength = (web3, name) => {
  const bytes = web3.utils.hexToBytes(name);
  let length = 0;
  for (let i = 0; i < bytes.length; i++) {
    if (bytes[i] != 0) {
      length++;
    } else {
      break;
    }
  }
  // console.log(length);
  return length;
};




export const getTrimmedString = (web3, name) => {
  const length = calculateStringLength(web3, name);
  const trimmedString = web3.utils.hexToUtf8(name);
  // console.log(trimmedString);
  return trimmedString;
};
function bytes32ToString(bytes32) {
  return web3.utils.hexToUtf8(bytes32);
}

