import { GNO, WETH, balancer } from "./addresses"
import { allowErc20Approve } from "./../helpers/erc20"
import { staticEqual, staticOneOf } from "./../helpers/utils"
import { AVATAR } from "./../placeholders"
import { RolePreset } from "./../types"
import { allow } from "./../allow"

const preset = {
  network: 100,
  allow: [],
  placeholders: { AVATAR },
} satisfies RolePreset

export default preset