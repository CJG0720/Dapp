// 전역변수 호출
var HDwalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "fly safe roast village cup quiz table blame vessel choose any during";

module.exports = {
     // See <http://truffleframework.com/docs/advanced/configuration>
     // to customize your Truffle configuration!
     networks: {
          ganache: {
               host: "localhost",
               port: 8545,
               network_id: "*" // Match any network id
          },

          //Rotsen TestNet connect
          ropsten:{
               provider: function() {
                    return new HDwalletProvider(mnemonic, 'https://ropsten.infura.io/v3/929e55da421a4bd58412382b5d2dcc51')
               },
               network_id: '3', //roptsen Net = 3
               gas: 4500000,
               gasPrice : 10000000000,
          }
     }
};
