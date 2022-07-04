const NFTDron=artifacts.require('NFTDron');
module.exports=function(deployer){
    deployer.deploy(NFTDron,"NFT de Drones","DRONF");
}