const FumigaToken=artifacts.require('FumigaToken');
module.exports=function(deployer){
    deployer.deploy(FumigaToken);
}