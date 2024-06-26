import { allow } from "../../allow"
import { allowErc20Approve } from "../../helpers/erc20"
import {
  dynamic32Equal,
  dynamic32OneOf,
  staticEqual,
  dynamicOneOf,
  subsetOf,
  dynamicEqual,
  staticOneOf,
} from "../../helpers/utils"
import { AVATAR } from "../../placeholders"
import { RolePreset } from "../../types"
import { ZERO_ADDRESS } from "../addresses"

const preset = {
  network: 100,
  allow: [],
  placeholders: { AVATAR },
} satisfies RolePreset

export default preset
