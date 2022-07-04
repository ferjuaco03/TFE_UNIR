// SPDX-License-Identifier: MIT
pragma solidity 0.8.1;

import './NFTDron.sol';
import './NFTParcela.sol';
import './FumigaToken.sol';
import "@openzeppelin/contracts/access/Ownable.sol";


contract DappFumi is Ownable {

    address public immutable  AddrDronToken;
    address public immutable  AddrParcelaToken;
    //address public immutable  AddrTokenFumi;
    
   struct ParcelaData {
    uint256 MaxHeight;
    uint256 MinHeight;
    string[] Pesti;
    uint256 idToken;
    address dir;
    bool flagCondi;
    } 

    struct DronData {
    uint256 MaxHeight;
    uint256 MinHeight;
    string[] Pesti;
    uint256 idToken;
    address dir;
    bool flagCondi;
    uint256 CostxM;
    } 

    uint256 public tokensPerEth = 1000;

    ParcelaData[] public _ParcelaDetails;
    DronData[] public _DronDetails;
    //mapping(uint256=>ParcelaData)_ParcelaDetails;
    event newParcelaToken(uint256 token);
    event newDronToken(uint256 token);
    event BuyTokens(address buyer, uint256 amountOfEth, uint256 amountOfTokens);
    event prueba (uint256 amountToBuy, uint256 vendorbalance );
  
    FumigaToken Fumigatoken;
    address addresswallet=0xa3c1603766B70dFA3e260451f9e45BC500541d82;
    constructor (){
       
       AddrDronToken = address(new NFTDron("DRONF","NFT de Drones"));
       AddrParcelaToken = address(new NFTParcela("PARCEF","NFT de Parcelas"));
       Fumigatoken=FumigaToken(addresswallet);
    }

//------------------------ Functions to Drones-------------------------------------
//---------------------------------------------------------------------------------
    function createDron(address to,
        uint256 CostxM,
        uint256 MaxHeight,
        uint256 MinHeight,string[] memory Pesti) external returns(uint256){  

        require(MaxHeight > MinHeight, "Valores alturas incorrectos");
        NFTDron _dronToken = NFTDron(AddrDronToken);
        uint256 tokenId = _dronToken.safeMintDron(to);
        address owner=_dronToken.ownerOf(tokenId);
        _DronDetails.push(DronData(MaxHeight,MinHeight,Pesti,tokenId,owner,false,CostxM));
        emit newDronToken(tokenId);
        return tokenId;
  }

function getDataDron(uint256 Id) public view returns (DronData memory){
           return( _DronDetails[(Id-1)]);
            
        }

   function RemoveDron(uint256 Id) public  {
         NFTDron _dron = NFTDron(AddrDronToken);
         require(_dron.ownerOf(Id)==msg.sender, "Only the Owner can remove the Parcela");
         _dron._burnDron(Id,msg.sender);
         delete _DronDetails[(Id-1)];
   }
function getAllDrones()public view returns(DronData[]memory data){
        return(_DronDetails);
    }
function getBalanceOwnerDron(address addr)public view returns(uint256){
      NFTDron _dronToken = NFTDron(AddrDronToken);
        return(_dronToken.balanceOf(addr));
    }

  
//------------------------ Functions to Parcelas-------------------------------------
//---------------------------------------------------------------------------------

  function createParcela(address to,
        uint256 MaxHeight,
        uint256 MinHeight,string[] memory Pesti) external returns(uint256){  

        require(MaxHeight > MinHeight, "Valores alturas incorrectos");
        NFTParcela _parcelaToken = NFTParcela(AddrParcelaToken);
        uint256 tokenId = _parcelaToken.safeMintParcela(to);
        address owner=_parcelaToken.ownerOf(tokenId);
        _ParcelaDetails.push(ParcelaData(MaxHeight,MinHeight,Pesti,tokenId,owner,false));
        emit newParcelaToken(tokenId);
        return tokenId;
  }

    function getDataParcela(uint256 Id) public view returns (ParcelaData memory){
           return( _ParcelaDetails[(Id-1)]);
            
        }

   function RemoveParcela(uint256 Id) public  {
         NFTParcela _parcela = NFTParcela(AddrParcelaToken);
         require(_parcela.ownerOf(Id)==msg.sender, "Only the Owner can remove the Parcela");
         _parcela._burnParcela(Id,msg.sender);
         delete _ParcelaDetails[(Id-1)];
   }

    
      function getAllParcelas()public view returns(ParcelaData[]memory data){
        return(_ParcelaDetails);
    }

function getBalanceOwnerParcela(address addr)public view returns(uint256){
      NFTParcela _ParcelaToken = NFTParcela(AddrParcelaToken);
        return(_ParcelaToken.balanceOf(addr));
    }



}