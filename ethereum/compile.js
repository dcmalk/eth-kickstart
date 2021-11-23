const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

// Remove previous build folder
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

// Read in the contract source code and compile it
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');
const output = solc.compile(source, 1).contracts;

// Create the build folder and write the compile contract to it
fs.ensureDirSync(buildPath);
for (let contract in output) {
  fs.outputJsonSync(path.resolve(buildPath, contract.replace(':', '') + '.json'), output[contract]);
}
