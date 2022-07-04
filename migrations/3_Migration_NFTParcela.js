const NFTParcela=artifacts.require('NFTParcela');
module.exports=function(deployer){
    deployer.deploy(NFTParcela,"NFT de Parcelas", "PARCEF");
}