
const {writeFileSync,mkdirSync} = require("fs");

require("dotenv").config();

const targetPath = "./src/environments/environment.ts"
const targetPathDev = "./src/environments/environment.development.ts"


const mapBox = process.env["MAP_BOX"] || "";

if (!mapBox) {
console.warn("MAP_BOX no está definido; generando variables vacías.");
}

const envFileContent = `
  export const environment = {
  mapbox:"${mapBox}"
};
`

mkdirSync("./src/environments",{recursive:true});

writeFileSync(targetPath,envFileContent);
writeFileSync(targetPathDev,envFileContent);
