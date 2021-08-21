const fs = require("fs/promises");

/*
Function for reading JSON file. 
@param path
*/
const fileReading = async (path) => {
  const readFile = await fs.readFile(path);
  const parsedFile = await JSON.parse(readFile);
  return parsedFile;
};

module.exports = fileReading;
