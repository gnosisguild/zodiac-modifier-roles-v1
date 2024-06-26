import { allowCurvePool } from "../helpers/curve"
import { allowErc20Approve } from "../helpers/erc20"
import { staticEqual } from "../helpers/utils"
import { AVATAR, BRIDGE_RECIPIENT_GNOSIS_CHAIN } from "../placeholders"

const AURA_TOKEN = "0xC0c293ce456fF0ED870ADd98a0828Dd4d2903DBF"
const AURA_LOCKER = "0x3Fa73f1E5d8A792C80F426fc8F84FBF7Ce9bBCAC"
const AURA_BOOSTER = "0xA57b8d98dAE62B26Ec3bcC4a365338157060B234"
const AURA_BAL_REWARDS = "0x5e5ea2048475854a5702F5B8468A51Ba1296EFcC"
const AURA_BASE_REWARD_POOL = "0xCC2F52b57247f2bC58FeC182b9a60dAC5963D010"

const BALANCER_VAULT = "0xBA12222222228d8Ba445958a75a0704d566BF2C8"

const CONVEX_BOOSTER = "0xF403C135812408BFbE8713b5A23a04b3D48AAE31"
const CONVEX_LOCKER = "0x72a19342e8F1838460eBFCCEf09F6585e32db86E"
const CONVEX_REWARDS = "0xCF50b810E57Ac33B91dCF525C6ddd9881B139332"

const CURVE_USDP_METAPOOL = "0x42d7025938bEc20B69cBae5A77421082407f053A"
const CURVE_ETH_STETH = "0xDC24316b9AE028F1497c275EB9192a3Ea0f67022"

const UNIT_CDP_MANAGER = "0x3b088b680ff7253E662bc29E5a7B696BA0100869"

const OMNI_BRIDGE = "0x88ad09518695c6c3712AC10a214bE5109a655671"

// LP TOKENS
const BALANCER_STETH = "0x32296969Ef14EB0c6d29669C550D4a0449130230"
const BALANCER_AURA_BAL = "0x3dd0843A028C86e0b760b1A76929d1C5Ef93a2dd"
const BALANCER_80BAL_20WETH = "0x5c6Ee304399DBdB9C8Ef030aB642B10820DB8F56"
const CURVE_DAI_USDC_USDT_SUSD = "0xC25a3A3b969415c80451098fa907EC722572917F"

// TOKENS
const BALANCER = "0xba100000625a3754423978a60c9317c58a424e3D"
const STETH = "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84"
const WSTETH = "0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0"
const AURA_BAL = "0x616e8BfA43F920657B3497DBf40D6b1A02D4608d"
const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F"
const CONVEX = "0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B"
const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
const COW = "0xDEf1CA1fb7FBcDC777520aa7f396b4E015F497aB"

// TODO continue with txs before AUG 16

const preset = {
  network: 1,
  allow: [
    // AURA
    // ...allowAuraPool("Aura "), // TODO
    ...allowErc20Approve([AURA_TOKEN], [AURA_LOCKER]),
    ...allowErc20Approve([BALANCER_STETH, BALANCER_AURA_BAL], [AURA_BOOSTER]),
    ...allowErc20Approve([AURA_BAL], [AURA_BAL_REWARDS]),
    {
      targetAddress: AURA_LOCKER,
      signature: "lock(address,uint256)",
      params: { [0]: staticEqual(AVATAR) },
    },
    {
      targetAddress: AURA_BOOSTER,
      signature: "deposit(uint256,uint256,bool)",
    },
    {
      targetAddress: AURA_BAL_REWARDS,
      signature: "stake(uint256)",
    },
    {
      targetAddress: AURA_BASE_REWARD_POOL,
      signature: "withdrawAndUnwrap(uint256,bool)",
    },

    // BALANCER
    ...allowErc20Approve(
      [WSTETH, AURA_BAL, BALANCER_80BAL_20WETH, BALANCER],
      [BALANCER_VAULT]
    ),
    {
      targetAddress: BALANCER_VAULT,
      signature:
        "joinPool(bytes32,address,address,(address[],uint256[],bytes,bool))",
      params: {
        [1]: staticEqual(AVATAR),
        [2]: staticEqual(AVATAR),
      },
      send: true,
    },

    // LIDO
    ...allowErc20Approve([STETH], [WSTETH]),
    { targetAddress: WSTETH, signature: "wrap(uint256)" },

    // CONVEX
    ...allowErc20Approve([CONVEX], [CONVEX_LOCKER, CONVEX_REWARDS]),
    ...allowErc20Approve([CURVE_DAI_USDC_USDT_SUSD], [CONVEX_BOOSTER]),
    {
      targetAddress: CONVEX_BOOSTER,
      signature: "depositAll(uint256,bool)",
    },
    {
      targetAddress: CONVEX_LOCKER,
      signature: "lock(address,uint256,uint256)",
      params: { [0]: staticEqual(AVATAR) },
    },
    {
      targetAddress: CONVEX_LOCKER,
      signature: "processExpiredLocks(bool)",
    },
    {
      targetAddress: CONVEX_REWARDS,
      signature: "stake(uint256)",
    },
    {
      targetAddress: CONVEX_REWARDS,
      signature: "withdraw(uint256,bool)",
    },

    // CURVE
    ...allowCurvePool("Curve DAI/USDC/USDT/sUSD"),
    ...allowErc20Approve([STETH], [CURVE_ETH_STETH]),
    ...allowErc20Approve([DAI], [CURVE_USDP_METAPOOL]),
    {
      targetAddress: CURVE_USDP_METAPOOL,
      signature: "exchange_underlying(int128,int128,uint256,uint256)",
    },
    {
      targetAddress: CURVE_ETH_STETH,
      signature: "exchange(int128,int128,uint256,uint256)",
    },

    // UNIT
    {
      targetAddress: UNIT_CDP_MANAGER,
      signature: "exit(address,uint256,uint256)",
    },

    // WETH
    {
      targetAddress: WETH,
      signature: "deposit()",
      send: true,
    },

    // OMNI BRIDGE
    ...allowErc20Approve([WETH, COW], [OMNI_BRIDGE]),
    {
      targetAddress: OMNI_BRIDGE,
      signature: "relayTokens(address,address,uint256)",
      params: {
        [1]: staticEqual(BRIDGE_RECIPIENT_GNOSIS_CHAIN),
      },
    },
  ],
  placeholders: { AVATAR, BRIDGE_RECIPIENT_GNOSIS_CHAIN },
} satisfies RolePreset

export default preset
