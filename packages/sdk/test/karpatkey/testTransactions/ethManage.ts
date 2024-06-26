export default [
  //---------------------------------------------------------------------------------------------------------------------------------
  // ANKR - ETH (Standard)
  //---------------------------------------------------------------------------------------------------------------------------------
  // Stake - stakeAndClaimAethC()
  {
    from: "0x849D52316331967b6fF1198e5E32A0eB168D039d",
    to: "0x84db6eE82b7Cf3b47E8F19270abdE5718B936670",
    data: "0x9fa65c56",
    value: "700000000000000000",
  },
  // Unstake - unstakeAETH()
  {
    from: "0x849D52316331967b6fF1198e5E32A0eB168D039d",
    to: "0x84db6eE82b7Cf3b47E8F19270abdE5718B936670",
    data: "0xc957619d0000000000000000000000000000000000000000000000000853A0D2313C0000",
  },
  //---------------------------------------------------------------------------------------------------------------------------------
  // ANKR - ETH (Flash)
  //---------------------------------------------------------------------------------------------------------------------------------
  // Stake - stakeAndClaimAethC()
  {
    from: "0x849D52316331967b6fF1198e5E32A0eB168D039d",
    to: "0x84db6eE82b7Cf3b47E8F19270abdE5718B936670",
    data: "0x9fa65c56",
    value: "10000000000000000",
  },
  // Approve ankrETH with as SWAP_POOL spender - "approve(address,uint256)"
  {
    from: "0x849D52316331967b6fF1198e5E32A0eB168D039d",
    to: "0xE95A203B1a91a908F9B9CE46459d101078c2c3cb",
    data: "0x095ea7b3000000000000000000000000f047f23acfdb1315cf63ad8ab5146d5fda4267af000000000000000000000000000000000000000000000000002386f26fc10000",
  },
  // Unstake - swapEth(uint256,address)
  {
    from: "0x849D52316331967b6fF1198e5E32A0eB168D039d",
    to: "0xf047f23ACFdB1315cF63Ad8aB5146d5fDa4267Af",
    data: "0xe28079be000000000000000000000000000000000000000000000000002386f26fc10000000000000000000000000000849D52316331967b6fF1198e5E32A0eB168D039d",
  },
]
