
const {writeFileSync,mkdirSync} = require("fs");

require("dotenv").config();

const targetPath = "./src/environments/environment.ts"
const targetPathDev = "./src/environments/environment.development.ts"


if(!process.env["MAP_BOX"]){
throw new Error("MAPBOX es required")
}

const envFileContent = `
  export const environment = {
  mapbox:"${process.env["MAP_BOX"]}"
};
`

mkdirSync("./src/environments",{recursive:true});

writeFileSync(targetPath,envFileContent);
writeFileSync(targetPathDev,envFileContent);
