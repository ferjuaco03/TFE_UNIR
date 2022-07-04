const path=require('path')
const HDWalletProvider = require('@truffle/hdwallet-provider')
module.exports={
    contracts_directory: "contrats",
    contratcs_build_directory:path.join(__dirname, 'client/src/contracts'),
    networks:{
        development:{
            host:'127.0.0.1',
            port:7545,
            network_id:'*'
        }
    },
    compilers:{
        solc:{
            version:'0.8.1',
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    }
}
