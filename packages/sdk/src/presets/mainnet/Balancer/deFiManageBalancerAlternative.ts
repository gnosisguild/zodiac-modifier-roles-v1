import { ExecutionOptions } from "../../../types"
import { allowCurvePool } from "../../helpers/curve"
import { allowErc20Approve } from "../../helpers/erc20"
import { allowLido } from "../../helpers/lido"
import {
  dynamic32Equal,
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
const DELEGATE_ADDRESS = "0xd6e96e437b8d42406a64440226b77a51c74e26b1"
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

    //Depositing
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
    },

    //---------------------------------------------------------------------------------------------------------------------------------
    //Uniswap V3 - WBTC + ETH, Range: 11.786 - 15.082. Fee: 0.3%.
    //---------------------------------------------------------------------------------------------------------------------------------

    ...allowErc20Approve([WBTC], [UV3_NFT_POSITIONS]),

    //Add liquidity
    {
      targetAddress: UV3_NFT_POSITIONS,
      signature:
        "mint((address,address,uint24,int24,int24,uint256,uint256,uint256,uint256,address,uint256))",
      send: true,
      params: {
        [0]: staticEqual(WBTC, "address"),
        [1]: staticEqual(WETH, "address"),
        [2]: staticEqual(3000, "uint24"),
        [9]: staticEqual(AVATAR),
      },
    },
    {
      targetAddress: UV3_NFT_POSITIONS,
      signature: "refundETH()",
      send: true,
    },

    //Increase liquidity: We cannot allow the increaseLiquidity function until we know the NFT id
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
    {
      targetAddress: UV3_NFT_POSITIONS,
      signature: "decreaseLiquidity((uint256,uint128,uint256,uint256,uint256))",
    },
    {
      targetAddress: UV3_NFT_POSITIONS,
      signature: "collect((uint256,address,uint128,uint128))",
      params: {
        [1]: staticEqual(ZERO, "address"),
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
        [0]: staticEqual(WBTC, "address"),
        [2]: staticEqual(AVATAR),
      },
    },

    //---------------------------------------------------------------------------------------------------------------------------------
    //mStable - staking of MTA
    //---------------------------------------------------------------------------------------------------------------------------------

    ...allowErc20Approve([MTA], [stMTA]),

    //Staking of MTA without voting power delegation
    {
      targetAddress: stMTA,
      signature: "stake(uint256)",
    },

    //Staking of MTA with voting power delegation
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
      signature: "claimRewards()",
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
    },

    //---------------------------------------------------------------------------------------------------------------------------------
    //Notional Finance - lending of USDC
    //---------------------------------------------------------------------------------------------------------------------------------

    ...allowErc20Approve([USDC], [NOTIONAL_PROXY]),

    //THIS HAS TO BE CORRECTED IN THE FUTURE SINCE WE ARE NOT CONTROLLING THE TUPLE
    //Deposit
    {
      targetAddress: NOTIONAL_PROXY,
      signature:
        "batchBalanceAndTradeAction(address,(uint8,uint16,uint256,uint256,bool,bool,bytes32[])[])",
      params: {
        [0]: staticEqual(AVATAR),
      },
    },

    //Withdraw
    //withdraw(uint16 currencyId, uint88 amountInternalPrecision, bool redeemToUnderlying)
    //currencyId=3 stands for USDC
    //if redeemToUnderlying is false the token withdrawn is cUSDC
    {
      targetAddress: NOTIONAL_PROXY,
      signature: "withdraw(uint16,uint88,bool)",
      params: {
        [0]: staticEqual(3, "uint16"),
      },
    },

    //---------------------------------------------------------------------------------------------------------------------------------
    //Balancer - D2D + BAL
    //---------------------------------------------------------------------------------------------------------------------------------

    {
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
    },

    //---------------------------------------------------------------------------------------------------------------------------------
    //Balancer - ETH + GTC
    //---------------------------------------------------------------------------------------------------------------------------------

    {
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
    },

    //---------------------------------------------------------------------------------------------------------------------------------
    //Stakewise
    //---------------------------------------------------------------------------------------------------------------------------------

    {
      targetAddress: STAKEWISE_ETH2_STAKING,
      signature: "stake()",
      send: true,
    },

    {
      targetAddress: STAKEWISE_MERKLE_DIS,
      signature: "claim(uint256,address,address[],uint256[],bytes32[])",
      params: {
        [1]: staticEqual(AVATAR),
        [2]: dynamic32Equal([rETH2, SWISE], "address[]"),
      },
    },

    ...allowErc20Approve([rETH2], [UV3_ROUTER]),

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
    },

    //---------------------------------------------------------------------------------------------------------------------------------
    //Stakewise - UniswapV3 ETH + sETH2, 0.3%
    //---------------------------------------------------------------------------------------------------------------------------------

    ...allowErc20Approve([sETH2], [UV3_NFT_POSITIONS]),

    //Add liquidity
    {
      targetAddress: UV3_NFT_POSITIONS,
      signature:
        "mint((address,address,uint24,int24,int24,uint256,uint256,uint256,uint256,address,uint256))",
      send: true,
      params: {
        [0]: staticEqual(WETH, "address"),
        [1]: staticEqual(sETH2, "address"),
        [2]: staticEqual(3000, "uint24"),
        [9]: staticEqual(AVATAR),
      },
    },
    {
      targetAddress: UV3_NFT_POSITIONS,
      signature: "refundETH()",
      send: true,
    },

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
    //decreaseLiquidity, collect and unwrapWETH9 have already been whitelisted

    /*
    {
      targetAddress: UV3_NFT_POSITIONS,
      signature: "decreaseLiquidity((uint256,uint128,uint256,uint256,uint256))",
    },
    {
      targetAddress: UV3_NFT_POSITIONS,
      signature: "collect((uint256,address,uint128,uint128))",
      params: {
        [1]: staticEqual(ZERO, "address"),
      },
    },
    {
      targetAddress: UV3_NFT_POSITIONS,
      signature: "unwrapWETH9(uint256,address)",
      params: {
        [1]: staticEqual(AVATAR),
      },
    },
    */

    {
      targetAddress: UV3_NFT_POSITIONS,
      signature: "sweepToken(address,uint256,address)",
      params: {
        [0]: staticEqual(sETH2, "address"),
        [2]: staticEqual(AVATAR),
      },
    },

    //---------------------------------------------------------------------------------------------------------------------------------
    //Element - Curve - stETH/ETH
    //---------------------------------------------------------------------------------------------------------------------------------

    ...allowErc20Approve([stETH], [CURVE_STETH_ETH_POOL]),

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
    },

    //---------------------------------------------------------------------------------------------------------------------------------
    //Element steCRV
    //---------------------------------------------------------------------------------------------------------------------------------

    ...allowErc20Approve([steCRV], [ELEMENT_USER_PROXY]),

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
    },

    //---------------------------------------------------------------------------------------------------------------------------------
    //Swapping of rewards COMP, AAVE, rETH2, SWISE and sETH2 in UniswapV3
    //---------------------------------------------------------------------------------------------------------------------------------

    ...allowErc20Approve([COMP, AAVE, rETH2, SWISE, sETH2], [UV3_ROUTER_2]),

    //Swapping of COMP for USDC
    {
      targetAddress: UV3_ROUTER_2,
      signature: "swapExactTokensForTokens(uint256,uint256,address[],address)",
      params: {
        [2]: dynamic32Equal([COMP, WETH, USDC], "address[]"),
        [3]: staticEqual(AVATAR),
      },
    },
    //Swapping of COMP for DAI
    {
      targetAddress: UV3_ROUTER_2,
      signature: "swapExactTokensForTokens(uint256,uint256,address[],address)",
      params: {
        [2]: dynamic32Equal([COMP, WETH, DAI], "address[]"),
        [3]: staticEqual(AVATAR),
      },
    },
    //------------------------------
    //Swapping of AAVE for USDC
    {
      targetAddress: UV3_ROUTER_2,
      signature: "swapExactTokensForTokens(uint256,uint256,address[],address)",
      params: {
        [2]: dynamic32Equal([AAVE, WETH, USDC], "address[]"),
        [3]: staticEqual(AVATAR),
      },
    },
    //Swapping of AAVE for DAI
    {
      targetAddress: UV3_ROUTER_2,
      signature: "swapExactTokensForTokens(uint256,uint256,address[],address)",
      params: {
        [2]: dynamic32Equal([AAVE, WETH, DAI], "address[]"),
        [3]: staticEqual(AVATAR),
      },
    },
    //------------------------------
    //Swapping of rETH2 for USDC
    {
      targetAddress: UV3_ROUTER_2,
      signature: "swapExactTokensForTokens(uint256,uint256,address[],address)",
      params: {
        [2]: dynamic32Equal([rETH2, sETH2, WETH, USDC], "address[]"),
        [3]: staticEqual(AVATAR),
      },
    },
    //Swapping of rETH2 for DAI
    {
      targetAddress: UV3_ROUTER_2,
      signature: "swapExactTokensForTokens(uint256,uint256,address[],address)",
      params: {
        [2]: dynamic32Equal([rETH2, sETH2, WETH, DAI], "address[]"),
        [3]: staticEqual(AVATAR),
      },
    },
    //------------------------------
    //Swapping of SWISE for USDC
    {
      targetAddress: UV3_ROUTER_2,
      signature: "swapExactTokensForTokens(uint256,uint256,address[],address)",
      params: {
        [2]: dynamic32Equal([SWISE, sETH2, WETH, USDC], "address[]"),
        [3]: staticEqual(AVATAR),
      },
    },
    //Swapping of SWISE for DAI
    {
      targetAddress: UV3_ROUTER_2,
      signature: "swapExactTokensForTokens(uint256,uint256,address[],address)",
      params: {
        [2]: dynamic32Equal([SWISE, sETH2, WETH, DAI], "address[]"),
        [3]: staticEqual(AVATAR),
      },
    },
    //------------------------------
    //Swapping of sETH2 for WETH
    {
      targetAddress: UV3_ROUTER_2,
      signature: "swapExactTokensForTokens(uint256,uint256,address[],address)",
      params: {
        [2]: dynamic32Equal([sETH2, WETH], "address[]"),
        [3]: staticEqual(AVATAR),
      },
    },

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
  ],
  placeholders: { AVATAR },
} satisfies RolePreset

export default preset
