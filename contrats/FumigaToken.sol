// SPDX-License-Identifier: MIT
pragma solidity 0.8.1;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FumigaToken is ERC20 {

 uint256 public constant tokenPrice = 0.1*10**18; // 1 token for 5 wei
 address public  owner;

    constructor() ERC20("FumigaToken", "FUMIGAT")  {
      _mint(msg.sender, 1000000 * 10 ** 18);
      owner = msg.sender;
    }

    function balance() public view returns(uint256) {
      uint256 dato=balanceOf(owner);
      return(dato);
    }

    function balanceFrom(address to) public view returns(uint256) {
      uint256 dato=balanceOf(to);
      return(dato);
    }

    function approve(address spender, uint256 amount) public  override returns (bool) {
        
        _approve(owner, spender, amount);
        return true;
    }

    function approveFrom(address acc ,address spender, uint256 amount) public  returns (bool) {
        
        _approve(acc, spender, amount);
        return true;
    }
    
    function buy(uint256 _amount) external payable {
        // e.g. the buyer wants 100 tokens, needs to send 500 wei
    
        require(msg.value == _amount * tokenPrice, 'Need to send exact amount of wei');
        
        /*
         * sends the requested amount of tokens
         * from this contract address
         * to the buyer
         */
        approve(msg.sender, (_amount*(10**18)));
        transferFrom(owner, msg.sender, (_amount*(10**18)));
        payable(owner).transfer(msg.value);
    }
    function TranferTo(uint256 _amount, address to) public  {
        // e.g. the buyer wants 100 tokens, needs to send 500 wei
        address AccFrom=msg.sender;
        uint256 balnceFrom=balanceFrom(AccFrom);
        require(balnceFrom >= _amount, 'You dont enough tokens to transfer');

        approveFrom(AccFrom, to, (_amount*(10**18)));
        transferFrom(AccFrom, to, (_amount*(10**18)));
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public  override returns (bool) {
        address spender = to;
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }

   

}