import {
    AAVE, AGVE, BAL, BER, COMP, COW, CRV, EURe, FLX, GEN,
    GIV, GNO, HND, IDLE, MAI, nextWETH, NODE, PNK, QI, RAI,
    rGNO, sGNO, SUSHI, SWPR, SYMM, UNCX, USDC, USDP, USDT, WATER,
    WBTC, WETH, wstETH, WXDAI, x3CRV
} from "../addresses"
import { allowErc20Revoke } from "../../helpers/erc20"
import { AVATAR } from "../../placeholders"
import { RolePreset } from "../../types"


const preset = {
    network: 100,
    allow: [
        ...allowErc20Revoke([
            AAVE, AGVE, BAL, BER, COMP, COW, CRV, EURe, FLX, GEN,
            GIV, GNO, HND, IDLE, MAI, nextWETH, NODE, PNK, QI, RAI,
            rGNO, sGNO, SUSHI, SWPR, SYMM, UNCX, USDC, USDP, USDT, WATER,
            WBTC, WETH, wstETH, WXDAI, x3CRV
        ])
    ],
    placeholders: { AVATAR },
} satisfies RolePreset

export default preset