import { createClient, gql, defaultExchanges } from "urql"
import { ethers } from "ethers"
import {
  ConditionType,
  ExecutionOption,
  FunctionCondition,
  Member,
  ParamComparison,
  ParamCondition,
  ParameterType,
  Role,
  Target,
  TargetConditions,
} from "../typings/role"
import { getFunctionConditionType } from "../utils/conditions"
import { Network } from "../utils/networks"

let client

const SUBGRAPH = {
  1: "https://api.studio.thegraph.com/query/93263/zodiac-roles-mod-mainnet/latest",

  11155111: "https://api.studio.thegraph.com/query/93263/zodiac-roles-v1-sepolia/latest",
  56: "https://api.studio.thegraph.com/query/93263/zodiac-roles-mod-bsc/latest",
  100: "https://api.studio.thegraph.com/query/93263/zodiac-roles-mod-gnosis-chain/latest",
  137: "https://api.studio.thegraph.com/query/93263/zodiac-roles-mod-polygon/latest",
  42161: "https://api.studio.thegraph.com/query/93263/zodiac-roles-mod-arbitrum/version/latest",

  8453: "https://api.studio.thegraph.com/query/93263/zodiac-roles-v1-base/version/latest",
}

const getUrl = (network?: Network) => {
  return network && network in SUBGRAPH ? SUBGRAPH[network as keyof typeof SUBGRAPH] : SUBGRAPH[11155111]
}

const getSubgraphClient = (network?: Network) =>
  createClient({
    url: getUrl(network),
    exchanges: [...defaultExchanges],
    fetchOptions: {
      cache: "no-cache",
    },
  })

const RolesQuery = gql`
  query ($id: ID!) {
    rolesModifier(id: $id) {
      id
      address
      avatar
      roles {
        id
        name
        targets {
          id
          address
          executionOptions
          clearance
          functions {
            sighash
            executionOptions
            wildcarded
            parameters {
              index
              type
              comparison
              comparisonValue
            }
          }
        }
        members {
          id
          member {
            id
            address
          }
        }
      }
    }
  }
`

interface RolesQueryResponse {
  rolesModifier: null | {
    id: string
    address: string
    avatar: string
    roles: {
      id: string
      name: string
      targets: {
        id: string
        address: string
        executionOptions: string
        clearance: ConditionType
        functions: {
          sighash: string
          executionOptions: string
          wildcarded: boolean
          parameters: {
            index: number
            type: ParameterType
            comparison: ParamComparison
            comparisonValue: string[]
          }[]
        }[]
      }[]
      members: {
        id: string
        member: Member
      }[]
    }[]
  }
}

export const fetchRoles = async (network: Network, rolesModifierAddress: string): Promise<Role[]> => {
  client = getSubgraphClient(network)
  if (rolesModifierAddress == null || !ethers.utils.isAddress(rolesModifierAddress)) {
    return []
  }
  try {
    const roles = await client
      .query<RolesQueryResponse>(RolesQuery, { id: rolesModifierAddress.toLowerCase() })
      .toPromise()
    if (roles.data && roles.data.rolesModifier) {
      return roles.data.rolesModifier.roles.map((role) => ({
        ...role,
        members: role.members.map((roleMember) => roleMember.member),
        targets: role.targets.map((target): Target => {
          const conditions: TargetConditions = Object.fromEntries(
            target.functions.map((func) => {
              const paramConditions = func.parameters.map((param) => {
                const paramCondition: ParamCondition = {
                  index: param.index,
                  condition: param.comparison,
                  value: param.comparisonValue,
                  type: param.type,
                }
                return paramCondition
              })

              const funcConditions: FunctionCondition = {
                sighash: func.sighash,
                type: func.wildcarded ? ConditionType.WILDCARDED : getFunctionConditionType(paramConditions),
                executionOption: getExecutionOptionFromLabel(func.executionOptions),
                params: paramConditions,
              }
              return [func.sighash, funcConditions]
            }),
          )
          return {
            id: target.id,
            address: target.address,
            type: target.clearance,
            executionOption: getExecutionOptionFromLabel(target.executionOptions),
            conditions,
          }
        }),
      }))
    } else {
      return []
    }
  } catch (err) {
    console.log("err", err)
    throw err
  }
}

function getExecutionOptionFromLabel(label: string): ExecutionOption {
  switch (label) {
    case "Both":
      return ExecutionOption.BOTH
    case "Send":
      return ExecutionOption.SEND
    case "DelegateCall":
      return ExecutionOption.DELEGATE_CALL
  }
  return ExecutionOption.NONE
}
