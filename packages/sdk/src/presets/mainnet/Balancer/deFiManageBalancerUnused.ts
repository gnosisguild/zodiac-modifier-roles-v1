import { allowCurvePool } from "../../helpers/curve"
import { allowErc20Approve } from "../../helpers/erc20"
import { allowLido } from "../../helpers/lido"
import {
  dynamic32Equal,
  dynamic32OneOf,
  dynamicEqual,
  staticEqual,
  subsetOf,
} from "../../helpers/utils"
import { AVATAR } from "../../placeholders"
import { RolePreset } from "../../types"

const ZERO = "0x0000000000000000000000000000000000000000"
//Tokens
const USDT = "0xdAC17F958D2ee523a2206206994597C13D831ec7"
const BAL = "0xba100000625a3754423978a60c9317c58a424e3D"
const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F"
const WBTC = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599"
const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"

//AAVE contracts
const AAVE_SPENDER = "0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9"
const AAVE = "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9"
const stkAAVE = "0x4da27a545c0c5B758a6BA100e3a049001de870f5"

//Compound V3 contracts
const COMET_REWARDS = "0x1B0e765F6224C21223AeA2af16c1C46E38885a40"
const cUSDCV3 = "0xc3d688B66703497DAA19211EEdff47f25384cdc3"

//Compound V2 contracts
const COMPTROLLER = "0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b"
const cUSDC = "0x39AA39c021dfbaE8faC545936693aC917d5E7563"
const cAAVE = "0xe65cdB6479BaC1e22340E4E755fAE7E509EcD06c"
const cDAI = "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643"
const COMP = "0xc00e94Cb662C3520282E6f5717214004A7f26888"

//Across contracts
const ACROSS_HUB = "0xc186fA914353c44b2E33eBE05f21846F1048bEda"

//Idle contracts
const IDLE_stETH_CDO = "0x34dCd573C5dE4672C8248cd12A99f875Ca112Ad8"
const IDLE_wstETH_AA_GAUGE = "0x675eC042325535F6e176638Dd2d4994F645502B9"
const IDLE_DISTRIBUTOR_PROXY = "0x074306bc6a6fc1bd02b425dd41d742adf36ca9c6"
const stETH = "0xae7ab96520de3a18e5e111b5eaab095312d7fe84"
const IDLE_wstETH_AA_TRANCHE = "0x2688FC68c4eac90d9E5e1B94776cF14eADe8D877"

//Uniswap V3 contracts
const UV3_NFT_POSITIONS = "0xC36442b4a4522E871399CD717aBDD847Ab11FE88"
const UV3_ROUTER = "0xE592427A0AEce92De3Edee1F18E0157C05861564"
const UV3_ROUTER_2 = "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45"

//mStable
const DELEGATE_ADDRESS = "0xd6E96e437b8d42406A64440226B77a51c74E26b1"
const MTA = "0xa3BeD4E1c75D00fa6f4E5E6922DB7261B5E9AcD2"
const stMTA = "0x8f2326316eC696F6d023E37A9931c2b2C177a3D7"

//Notional
const NOTIONAL_PROXY = "0x1344A36A1B56144C3Bc62E7757377D288fDE0369"

//Balancer contracts
const BALANCER_VAULT = "0xBA12222222228d8Ba445958a75a0704d566BF2C8"

//Stakewise contracts
const STAKEWISE_ETH2_STAKING = "0xC874b064f465bdD6411D45734b56fac750Cda29A"
const STAKEWISE_MERKLE_DIS = "0xA3F21010e8b9a3930996C8849Df38f9Ca3647c20"
const sETH2 = "0xFe2e637202056d30016725477c5da089Ab0A043A"
const rETH2 = "0x20BC832ca081b91433ff6c17f85701B6e92486c5"
const SWISE = "0x48C3399719B582dD63eB5AADf12A40B4C3f52FA2"

//Curve stETH/ETH
const CURVE_STETH_ETH_POOL = "0xDC24316b9AE028F1497c275EB9192a3Ea0f67022"

//Element contracts
const ELEMENT_USER_PROXY = "0xEe4e158c03A10CBc8242350d74510779A364581C"
const ELEMENT_yvCurve_stETH = "0xcD62f09681dCBB9fbc5bA8054B52F414Cb28960A"
const ELEMENT_eP_24FEB23 = "0x724e3073317d4B1A8d0c6E89B137eA5af1f4051e"
const ELEMENT_ey_24FEB23 = "0x31cF4F5E9594718f8162866545E0d38C33Ad4A99"
const ELEMENT_LP_eP_24FEB23 = "0x07f589eA6B789249C83992dD1eD324c3b80FD06b"
const steCRV = "0x06325440D014e39736583c165C2963BA99fAf14E"

//SushiSwap contracts
const SUSHISWAP_ROUTER = "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F"

const preset = {
  network: 1,
  allow: [
    //LIDO
    ...allowLido(),

    //---------------------------------------------------------------------------------------------------------------------------------
    //Staking of AAVE in Safety Module
    //---------------------------------------------------------------------------------------------------------------------------------
    ...allowErc20Approve([AAVE], [stkAAVE]),
    {
      targetAddress: stkAAVE,
      signature: "stake(address,uint256)",
      params: {
        [0]: staticEqual(AVATAR),
      },
    },
    {
      targetAddress: stkAAVE,
      signature: "claimRewards(address,uint256)",
      params: {
        [0]: staticEqual(AVATAR),
      },
    },

    //Initiates 10 days cooldown, till the 2 days unstaking window opens
    {
      targetAddress: stkAAVE,
      signature: "cooldown()",
    },

    //Unstakes, can only be called during the 2 days window after the 10 days cooldown
    {
      targetAddress: stkAAVE,
      signature: "redeem(address,uint256)",
      params: {
        [0]: staticEqual(AVATAR),
      },
    },

    //---------------------------------------------------------------------------------------------------------------------------------
    //Compound V2 - USDC
    //---------------------------------------------------------------------------------------------------------------------------------
    ...allowErc20Approve([USDC], [cUSDC]),
    //Deposit
    {
      targetAddress: cUSDC,
      signature: "mint(uint256)",
    },
    //Withdrawing: sender redeems uint256 cTokens, it is called when MAX is withdrawn
    {
      targetAddress: cUSDC,
      signature: "redeem(uint256)",
    },
    //Withdrawing: sender redeems cTokens in exchange for a specified amount of underlying asset (uint256), it is called when MAX isn't withdrawn
    {
      targetAddress: cUSDC,
      signature: "redeemUnderlying(uint256)",
    },
    //We are not allowing to include it as collateral

    //---------------------------------------------------------------------------------------------------------------------------------
    //Compound V2 - DAI
    //---------------------------------------------------------------------------------------------------------------------------------
    ...allowErc20Approve([DAI], [cDAI]),
    //Deposit
    {
      targetAddress: cDAI,
      signature: "mint(uint256)",
    },
    //Withdrawing: sender redeems uint256 cTokens, it is called when MAX is withdrawn
    {
      targetAddress: cDAI,
      signature: "redeem(uint256)",
    },
    //Withdrawing: sender redeems cTokens in exchange for a specified amount of underlying asset (uint256), it is called when MAX isn't withdrawn
    {
      targetAddress: cDAI,
      signature: "redeemUnderlying(uint256)",
    },
    //We are not allowing to include it as collateral

    //---------------------------------------------------------------------------------------------------------------------------------
    //Compound V2 - AAVE
    //---------------------------------------------------------------------------------------------------------------------------------
    ...allowErc20Approve([AAVE], [cAAVE]),
    //Deposit
    {
      targetAddress: cAAVE,
      signature: "mint(uint256)",
    },
    //Withdrawing: sender redeems uint256 cTokens, it is called when MAX is withdrawn
    {
      targetAddress: cAAVE,
      signature: "redeem(uint256)",
    },
    //Withdrawing: sender redeems cTokens in exchange for a specified amount of underlying asset (uint256), it is called when MAX isn't withdrawn
    {
      targetAddress: cAAVE,
      signature: "redeemUnderlying(uint256)",
    },

    //We are not allowing to include it as collateral

    //---------------------------------------------------------------------------------------------------------------------------------
    //Compound V2 - Claiming of rewards
    //---------------------------------------------------------------------------------------------------------------------------------
    {
      targetAddress: COMPTROLLER,
      signature: "claimComp(address,address[])",
      params: {
        [0]: staticEqual(AVATAR),
        [1]: subsetOf(
          [cAAVE, cDAI, cUSDC].map((address) => address.toLowerCase()).sort(), // compound app will always pass tokens in ascending order
          "address[]",
          {
            restrictOrder: true,
          }
        ),
      },
    },

    //---------------------------------------------------------------------------------------------------------------------------------
    //Idle - Deposit stETH and stake it on "Lido - stETH - Senior Tranche"
    //---------------------------------------------------------------------------------------------------------------------------------

    /*     //Depositing
        ...allowErc20Approve([stETH], [IDLE_stETH_CDO]),
    
        //Deposit in AA tranche
        {
          targetAddress: IDLE_stETH_CDO,
          signature: "depositAA(uint256)",
        },
        //Withdraw from AA tranche
        {
          targetAddress: IDLE_stETH_CDO,
          signature: "withdrawAA(uint256)",
        },
    
        //Staking
        ...allowErc20Approve([IDLE_wstETH_AA_TRANCHE], [IDLE_wstETH_AA_GAUGE]),
        //Stake in AA gauge
        {
          targetAddress: IDLE_wstETH_AA_GAUGE,
          signature: "deposit(uint256)",
        },
        //Withdraw from AA gauge
        {
          targetAddress: IDLE_wstETH_AA_GAUGE,
          signature: "withdraw(uint256)",
        },
        //Claiming of rewards
        //Claim LIDO
        {
          targetAddress: IDLE_wstETH_AA_GAUGE,
          signature: "claim_rewards()",
        },
        //Claim IDLE
        {
          targetAddress: IDLE_DISTRIBUTOR_PROXY,
          signature: "distribute(address)",
          params: {
            [0]: staticEqual(IDLE_wstETH_AA_GAUGE, "address"),
          },
        }, */

    //---------------------------------------------------------------------------------------------------------------------------------
    //Uniswap V3 - WBTC + WETH, Range: 11.786 - 15.082. Fee: 0.3%.
    //---------------------------------------------------------------------------------------------------------------------------------

    ...allowErc20Approve([WBTC, WETH], [UV3_NFT_POSITIONS]),

    //Adding liquidity: to create a new position in a pool one has to call both the mint and refundETH functions
    {
      targetAddress: UV3_NFT_POSITIONS,
      signature:
        "mint((address,address,uint24,int24,int24,uint256,uint256,uint256,uint256,address,uint256))",
      //send: true,
      params: {
        [0]: staticEqual(WBTC, "address"),
        [1]: staticEqual(WETH, "address"),
        [2]: staticEqual(3000, "uint24"), //3000 represents the 0.3% fee
        [9]: staticEqual(AVATAR),
      },
    },
    //If ETH is deposited instead of WETH, one has to call the refundETH function after calling the mint function
    //We are only allowing to deposit WETH, otherwise the ETH held by the NFT Positions contract after calling the mint function could be claimed
    //by another address calling the refundETH function
    /* {
      targetAddress: UV3_NFT_POSITIONS,
      signature: "refundETH()",
      send: true,
    }, */

    //Increasing liquidity: We cannot allow the increaseLiquidity function until we know the NFT id!!!
    //To increase liquidity one has to call the increaseLiquidity and refundETH functions
    /*
    {
      targetAddress: UV3_NFT_POSITIONS,
      signature:
        "increaseLiquidity((uint256,uint256,uint256,uint256,uint256,uint256))",
      send: true,
    },
    */

    //refundETH() is already whitelisted above
    /*
    {
      targetAddress: UV3_NFT_POSITIONS,
      signature: "refundETH()",
      send: true,
    },
    */

    //Removing liquidity: to remove liquidity one has to call the decreaseLiquidity and collect functions
    //decreaseLiquidity burns the token amounts in the pool, and increases token0Owed and token1Owed which represent the uncollected
    //fees

    {
      targetAddress: UV3_NFT_POSITIONS,
      signature: "decreaseLiquidity((uint256,uint128,uint256,uint256,uint256))",
    },
    //collect collects token0Owed and token1Owed. The address argument could also be the zero address, which is used to collect ETH
    //instead of WETH. In this case, the tokens (one of them WETH) are first sent to the NFT Positions contract, and have to then be
    //claimed by calling unwrapWETH9 and sweepToken. Since this is not safe non-custodial wise, we are only allowing the collecting
    //of ETH instead of WETH
    {
      targetAddress: UV3_NFT_POSITIONS,
      signature: "collect((uint256,address,uint128,uint128))",
      params: {
        [1]: staticEqual(AVATAR),
      },
    },

    //unwrapWETH9 and sweepToken are not necessary since we are not allowing to collect ETH instead of WETH
    /* {
      targetAddress: UV3_NFT_POSITIONS,
      signature: "unwrapWETH9(uint256,address)",
      params: {
        [1]: staticEqual(AVATAR),
      },
    },
    {
      targetAddress: UV3_NFT_POSITIONS,
      signature: "sweepToken(address,uint256,address)",
      params: {
        [0]: staticEqual(WBTC, "address"),
        [2]: staticEqual(AVATAR),
      },
    }, */

    //---------------------------------------------------------------------------------------------------------------------------------
    //mStable - staking of MTA
    //---------------------------------------------------------------------------------------------------------------------------------

    /*   ...allowErc20Approve([MTA], [stMTA]),
  
      //Staking of MTA without voting power delegation. One stakes MTA and receives stMTA
      {
        targetAddress: stMTA,
        signature: "stake(uint256)",
      },
  
      //Staking of MTA with voting power delegation. One stakes MTA and receives stMTA
      {
        targetAddress: stMTA,
        signature: "stake(uint256,address)",
        params: {
          [1]: staticEqual(DELEGATE_ADDRESS, "address"),
        },
      },
  
      //Undelegate voting power
      {
        targetAddress: stMTA,
        signature: "delegate(address)",
        params: {
          [0]: staticEqual(AVATAR),
        },
      },
  
      //Claim rewards without compounding
      {
        targetAddress: stMTA,
        signature: "claimReward()",
      },
  
      //Claim compounding rewards, i.e. MTA claimed rewards are immediately staked
      {
        targetAddress: stMTA,
        signature: "compoundRewards()",
      },
  
      //Start cooldown for withdrawal
      {
        targetAddress: stMTA,
        signature: "startCooldown(uint256)",
      },
  
      //Forcefully end cooldown to be able to withdraw, at the expense of a penalty
      {
        targetAddress: stMTA,
        signature: "endCooldown()",
      },
  
      //Withdraw after cooldown
      {
        targetAddress: stMTA,
        signature: "withdraw(uint256,address,bool,bool)",
        params: {
          [1]: staticEqual(AVATAR),
        },
      }, */

    //---------------------------------------------------------------------------------------------------------------------------------
    //Notional Finance - lending of USDC
    //---------------------------------------------------------------------------------------------------------------------------------

    /*    
    ...allowErc20Approve([USDC], [NOTIONAL_PROXY]),
    */
    //THIS HAS TO BE CORRECTED IN THE FUTURE SINCE WE ARE NOT CONTROLLING THE TUPLE
    //Deposit
    /* {
      targetAddress: NOTIONAL_PROXY,
      signature:
        "batchBalanceAndTradeAction(address,(uint8,uint16,uint256,uint256,bool,bool,bytes32[])[])",
      params: {
        [0]: staticEqual(AVATAR),
      },
    }, */

    //Withdraw
    //withdraw(uint16 currencyId, uint88 amountInternalPrecision, bool redeemToUnderlying)
    //currencyId=3 stands for USDC
    //if redeemToUnderlying is false the token withdrawn is cUSDC
    /* {
      targetAddress: NOTIONAL_PROXY,
      signature: "withdraw(uint16,uint88,bool)",
      params: {
        [0]: staticEqual(3, "uint16"),
      },
    }, */

    //---------------------------------------------------------------------------------------------------------------------------------
    //Balancer - D2D + BAL
    //---------------------------------------------------------------------------------------------------------------------------------

    /* {
      targetAddress: BALANCER_VAULT,
      signature:
        "exitPool(bytes32,address,address,(address[],uint256[],bytes,bool))",
      params: {
        [0]: staticEqual(
          "0x8f4205e1604133d1875a3e771ae7e4f2b086563900020000000000000000010e",
          "bytes32"
        ),
        [1]: staticEqual(AVATAR),
        [2]: staticEqual(AVATAR),
      },
    }, */

    //---------------------------------------------------------------------------------------------------------------------------------
    //Balancer - WETH + GTC
    //---------------------------------------------------------------------------------------------------------------------------------

    /* {
      targetAddress: BALANCER_VAULT,
      signature:
        "exitPool(bytes32,address,address,(address[],uint256[],bytes,bool))",
      params: {
        [0]: staticEqual(
          "0xff083f57a556bfb3bbe46ea1b4fa154b2b1fbe88000200000000000000000030",
          "bytes32"
        ),
        [1]: staticEqual(AVATAR),
        [2]: staticEqual(AVATAR),
      },
    }, */

    //---------------------------------------------------------------------------------------------------------------------------------
    //Stakewise
    //---------------------------------------------------------------------------------------------------------------------------------

    //When staking ETH one receives stETH2
    {
      targetAddress: STAKEWISE_ETH2_STAKING,
      signature: "stake()",
      send: true,
    },

    //By having staked ETH one receives rETH2 as rewards that are claimed by calling the claim function
    {
      targetAddress: STAKEWISE_MERKLE_DIS,
      signature: "claim(uint256,address,address[],uint256[],bytes32[])",
      params: {
        [1]: staticEqual(AVATAR),
        [2]: dynamic32Equal([rETH2, SWISE], "address[]"),
      },
    },

    //exactInputSingle is needed for the reinvest option, which swaps rETH2 for stETH2 in the Uniswap V3 pool.
    //But as of now it is not considered in the strategy

    /* ...allowErc20Approve([rETH2], [UV3_ROUTER]),

    {
      targetAddress: UV3_ROUTER,
      signature:
        "exactInputSingle((address,address,uint24,address,uint256,uint256,uint256,uint160))",
      params: {
        [0]: staticEqual(rETH2, "address"),
        [1]: staticEqual(sETH2, "address"),
        [2]: staticEqual(500, "uint24"),
        [3]: staticEqual(AVATAR),
      },
    }, */

    //---------------------------------------------------------------------------------------------------------------------------------
    //Stakewise - UniswapV3 WETH + sETH2, 0.3%
    //---------------------------------------------------------------------------------------------------------------------------------

    ...allowErc20Approve([sETH2], [UV3_NFT_POSITIONS]),
    // Already allowlisted in Uniswap V3 WBTC + WETH
    //...allowErc20Approve([WETH], [UV3_NFT_POSITIONS]),

    //Add liquidity
    {
      targetAddress: UV3_NFT_POSITIONS,
      signature:
        "mint((address,address,uint24,int24,int24,uint256,uint256,uint256,uint256,address,uint256))",
      //send: true,
      params: {
        [0]: staticEqual(WETH, "address"),
        [1]: staticEqual(sETH2, "address"),
        [2]: staticEqual(3000, "uint24"),
        [9]: staticEqual(AVATAR),
      },
    },
    //refundETH has already been whitelisted above
    /* {
      targetAddress: UV3_NFT_POSITIONS,
      signature: "refundETH()",
      send: true,
    }, */

    //Increase liquidity: We cannot allow the increaseLiquidity function until we know the NFT id!!!
    /*
    {
      targetAddress: UV3_NFT_POSITIONS,
      signature:
        "increaseLiquidity((uint256,uint256,uint256,uint256,uint256,uint256))",
      send: true,
    },
    */

    //refundETH() is already whitelisted above
    /*
    {
      targetAddress: UV3_NFT_POSITIONS,
      signature: "refundETH()",
      send: true,
    },
    */

    //Remove liquidity
    //decreaseLiquidity, collect and unwrapWETH9 have already been whitelisted.
    //See the comments above regarding unwrapETH9 and sweepToken

    /*
    {
      targetAddress: UV3_NFT_POSITIONS,
      signature: "decreaseLiquidity((uint256,uint128,uint256,uint256,uint256))",
    },
    {
      targetAddress: UV3_NFT_POSITIONS,
      signature: "collect((uint256,address,uint128,uint128))",
      params: {
        [1]: staticEqual(AVATAR),
      },
    },
    {
      targetAddress: UV3_NFT_POSITIONS,
      signature: "unwrapWETH9(uint256,address)",
      params: {
        [1]: staticEqual(AVATAR),
      },
    },
    

    {
      targetAddress: UV3_NFT_POSITIONS,
      signature: "sweepToken(address,uint256,address)",
      params: {
        [0]: staticEqual(sETH2, "address"),
        [2]: staticEqual(AVATAR),
      },
    },
    */

    //---------------------------------------------------------------------------------------------------------------------------------
    //Element - Curve - stETH/ETH
    //---------------------------------------------------------------------------------------------------------------------------------
    //For the time being this has been removed from the strategy

    /* ...allowErc20Approve([stETH], [CURVE_STETH_ETH_POOL]),

    {
      targetAddress: CURVE_STETH_ETH_POOL,
      signature: "add_liquidity(uint256[2],uint256)",
      send: true,
    },
    {
      targetAddress: CURVE_STETH_ETH_POOL,
      signature: "remove_liquidity_one_coin(uint256,int128,uint256)",
    },
    {
      targetAddress: CURVE_STETH_ETH_POOL,
      signature: "remove_liquidity(uint256,uint256[2])",
    },
    {
      targetAddress: CURVE_STETH_ETH_POOL,
      signature: "remove_liquidity_imbalance(uint256[2],uint256)",
    }, */

    //---------------------------------------------------------------------------------------------------------------------------------
    //Element steCRV
    //---------------------------------------------------------------------------------------------------------------------------------
    //For the time being this has been removed from the strategy

    /* ...allowErc20Approve([steCRV], [ELEMENT_USER_PROXY]),

    //Minting Principal and Yield tokens by depositing steCRV
    {
      targetAddress: ELEMENT_USER_PROXY,
      signature:
        "mint(uint256,address,uint256,address,(address,address,uint256,uint256,bytes32,bytes32,uint8)[])",
      params: {
        [1]: staticEqual(steCRV, "address"),
        [3]: staticEqual(ELEMENT_yvCurve_stETH, "address"),
      },
    },

    ...allowErc20Approve([steCRV, ELEMENT_eP_24FEB23], [BALANCER_VAULT]),

    //Depositing steCRV and Principal in Balancer Convergent pool
    {
      targetAddress: BALANCER_VAULT,
      signature:
        "joinPool(bytes32,address,address,(address[],uint256[],bytes,bool))",
      params: {
        [0]: staticEqual(
          "0x07f589ea6b789249c83992dd1ed324c3b80fd06b00020000000000000000034e",
          "bytes32"
        ),
        [1]: staticEqual(AVATAR),
        [2]: staticEqual(AVATAR),
      },
    },
    //Removing steCRV and Principal from Balancer Convergent pool
    {
      targetAddress: BALANCER_VAULT,
      signature:
        "exitPool(bytes32,address,address,(address[],uint256[],bytes,bool))",
      params: {
        [0]: staticEqual(
          "0x07f589ea6b789249c83992dd1ed324c3b80fd06b00020000000000000000034e",
          "bytes32"
        ),
        [1]: staticEqual(AVATAR),
        [2]: staticEqual(AVATAR),
      },
    },
    //Reedeming Principal token for steCRV
    {
      targetAddress: ELEMENT_eP_24FEB23,
      signature: "withdrawPrincipal(uint256,address)",
      params: {
        [1]: staticEqual(AVATAR),
      },
    },
    //Reedeming Yield token for steCRV
    {
      targetAddress: ELEMENT_eP_24FEB23,
      signature: "withdrawInterest(uint256,address)",
      params: {
        [1]: staticEqual(AVATAR),
      },
    },

    //Swapping Principal token for steCRV in Balancer Convergent pool
    {
      targetAddress: BALANCER_VAULT,
      signature:
        "swap((bytes32,uint8,address,address,uint256,bytes),(address,bool,address,bool),uint256,uint256)",
      params: {
        [0]: staticEqual(
          "0x07f589ea6b789249c83992dd1ed324c3b80fd06b00020000000000000000034e",
          "bytes32"
        ),
        [2]: staticEqual(ELEMENT_eP_24FEB23, "address"),
        [3]: staticEqual(steCRV, "address"), //This could be removed
        [6]: staticEqual(AVATAR),
        [8]: staticEqual(AVATAR),
      },
    }, */

    //---------------------------------------------------------------------------------------------------------------------------------
    //Wrapping and unwrapping of ETH
    //---------------------------------------------------------------------------------------------------------------------------------
    {
      targetAddress: WETH,
      signature: "withdraw(uint256)",
    },
    {
      targetAddress: WETH,
      signature: "deposit()",
      send: true,
    },

    //---------------------------------------------------------------------------------------------------------------------------------
    //Swapping of tokens COMP, AAVE, rETH2, SWISE, sETH2, WETH, USDC, DAI, USDT and WBTC in UniswapV3
    //---------------------------------------------------------------------------------------------------------------------------------

    ...allowErc20Approve(
      [COMP, AAVE, rETH2, SWISE, sETH2, WETH, USDC, DAI, USDT, WBTC],
      [UV3_ROUTER_2]
    ),

    {
      targetAddress: UV3_ROUTER_2,
      signature: "swapExactTokensForTokens(uint256,uint256,address[],address)",
      params: {
        [2]: dynamic32OneOf(
          [
            [COMP, WETH, USDC],
            [COMP, WETH, DAI],
            [COMP, WETH],
            [AAVE, WETH, USDC],
            [AAVE, WETH, DAI],
            [AAVE, WETH],
            [rETH2, sETH2, WETH, USDC],
            [rETH2, sETH2, WETH, DAI],
            [rETH2, sETH2, WETH],
            [SWISE, sETH2, WETH, USDC],
            [SWISE, sETH2, WETH, DAI],
            [SWISE, sETH2, WETH],
            [sETH2, WETH],
            [WETH, sETH2],
            [WETH, DAI],
            [WETH, USDC],
            [WETH, USDT],
            [WETH, WBTC],
            [USDC, WETH],
            [USDC, USDT],
            [USDC, WETH, USDT],
            [USDC, DAI],
            [USDC, WETH, DAI],
            [DAI, WETH],
            [DAI, USDC],
            [DAI, WETH, USDC],
            [DAI, USDT],
            [DAI, WETH, USDT],
            [USDT, WETH],
            [USDT, USDC],
            [USDT, WETH, USDC],
            [USDT, DAI],
            [USDT, WETH, DAI],
            [WBTC, WETH],
          ],
          "address[]"
        ),
        [3]: staticEqual(AVATAR),
      },
    },

    //---------------------------------------------------------------------------------------------------------------------------------
    //Swapping of COMP rewards in Balancer: https://dev.balancer.fi/guides/swaps/single-swaps
    //---------------------------------------------------------------------------------------------------------------------------------

    /*     
    swap(SingleSwap_struct,FundManagement_struct,token_limit,deadline)

    struct SingleSwap {
      bytes32 poolId;
      SwapKind kind;      0 = GIVEN_IN, 1 = GIVEN_OUT
      IAsset assetIn;
      IAsset assetOut;
      uint256 amount;
      bytes userData;     userData specifies the JoinKind, see https://dev.balancer.fi/resources/joins-and-exits/pool-joins
    }
    struct FundManagement {
      address sender;
      bool fromInternalBalance;
      address payable recipient;
      bool toInternalBalance;
    }
     */

    //Swap COMP for WETH
    ...allowErc20Approve([COMP], [BALANCER_VAULT]),
    {
      targetAddress: BALANCER_VAULT,
      signature:
        "swap((bytes32,uint8,address,address,uint256,bytes),(address,bool,address,bool),uint256,uint256)",
      params: {
        [1]: staticEqual(AVATAR), // recipient
        [2]: staticEqual(false, "bool"),
        [3]: staticEqual(AVATAR), // sender
        [4]: staticEqual(false, "bool"),
        [7]: staticEqual(
          "0xefaa1604e82e1b3af8430b90192c1b9e8197e377000200000000000000000021",
          "bytes32"
        ), //COMP-WETH pool ID
        [9]: staticEqual(COMP, "address"), //Asset in
        [10]: staticEqual(WETH, "address"), //Asset out
      },
    },

    //Swap WETH for DAI
    ...allowErc20Approve([WETH], [BALANCER_VAULT]),
    {
      targetAddress: BALANCER_VAULT,
      signature:
        "swap((bytes32,uint8,address,address,uint256,bytes),(address,bool,address,bool),uint256,uint256)",
      params: {
        [1]: staticEqual(AVATAR), // recipient
        [2]: staticEqual(false, "bool"),
        [3]: staticEqual(AVATAR), // sender
        [4]: staticEqual(false, "bool"),
        [7]: staticEqual(
          "0x0b09dea16768f0799065c475be02919503cb2a3500020000000000000000001a",
          "bytes32"
        ), //WETH-DAI pool ID
        [9]: staticEqual(WETH, "address"), //Asset in
        [10]: staticEqual(DAI, "address"), //Asset out
      },
    },

    //Swap WETH for USDC
    ...allowErc20Approve([WETH], [BALANCER_VAULT]),
    {
      targetAddress: BALANCER_VAULT,
      signature:
        "swap((bytes32,uint8,address,address,uint256,bytes),(address,bool,address,bool),uint256,uint256)",
      params: {
        [1]: staticEqual(AVATAR), // recipient
        [2]: staticEqual(false, "bool"),
        [3]: staticEqual(AVATAR), // sender
        [4]: staticEqual(false, "bool"),
        [7]: staticEqual(
          "0x96646936b91d6b9d7d0c47c496afbf3d6ec7b6f8000200000000000000000019",
          "bytes32"
        ), //USDC-WETH pool ID
        [9]: staticEqual(WETH, "address"), //Asset in
        [10]: staticEqual(USDC, "address"), //Asset out
      },
    },

    /*   //---------------------------------------------------------------------------------------------------------------------------------
      //Swapping of COMP, WETH, BAL for USDC, DAI and WETH in SushiSwap
      //---------------------------------------------------------------------------------------------------------------------------------
  
      ...allowErc20Approve([COMP, WETH, BAL], [SUSHISWAP_ROUTER]),
      // WETH
      {
        targetAddress: SUSHISWAP_ROUTER,
        signature:
          "swapExactTokensForTokens(uint256,uint256,address[],address,uint256)",
        params: {
          [2]: dynamic32Equal([WETH, DAI], "address[]"),
          [3]: staticEqual(AVATAR),
        },
      },
  
      {
        targetAddress: SUSHISWAP_ROUTER,
        signature:
          "swapExactTokensForTokens(uint256,uint256,address[],address,uint256)",
        params: {
          [2]: dynamic32Equal([WETH, USDC], "address[]"),
          [3]: staticEqual(AVATAR),
        },
      },
  
      // COMP
      {
        targetAddress: SUSHISWAP_ROUTER,
        signature:
          "swapExactTokensForTokens(uint256,uint256,address[],address,uint256)",
        params: {
          [2]: dynamic32Equal([COMP, WETH], "address[]"),
          [3]: staticEqual(AVATAR),
        },
      },
  
      {
        targetAddress: SUSHISWAP_ROUTER,
        signature:
          "swapExactTokensForTokens(uint256,uint256,address[],address,uint256)",
        params: {
          [2]: dynamic32Equal([COMP, WETH, USDC], "address[]"),
          [3]: staticEqual(AVATAR),
        },
      },
  
      {
        targetAddress: SUSHISWAP_ROUTER,
        signature:
          "swapExactTokensForTokens(uint256,uint256,address[],address,uint256)",
        params: {
          [2]: dynamic32Equal([COMP, WETH, DAI], "address[]"),
          [3]: staticEqual(AVATAR),
        },
      },
  
      // BAL
      {
        targetAddress: SUSHISWAP_ROUTER,
        signature:
          "swapExactTokensForTokens(uint256,uint256,address[],address,uint256)",
        params: {
          [2]: dynamic32Equal([BAL, WETH], "address[]"),
          [3]: staticEqual(AVATAR),
        },
      },
  
      {
        targetAddress: SUSHISWAP_ROUTER,
        signature:
          "swapExactTokensForTokens(uint256,uint256,address[],address,uint256)",
        params: {
          [2]: dynamic32Equal([BAL, WETH, USDC], "address[]"),
          [3]: staticEqual(AVATAR),
        },
      },
  
      {
        targetAddress: SUSHISWAP_ROUTER,
        signature:
          "swapExactTokensForTokens(uint256,uint256,address[],address,uint256)",
        params: {
          [2]: dynamic32Equal([BAL, WETH, DAI], "address[]"),
          [3]: staticEqual(AVATAR),
        },
      }, */
  ],
  placeholders: { AVATAR },
} satisfies RolePreset

export default preset
