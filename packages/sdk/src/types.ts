import SUBGRAPH from "./subgraph"

export type NetworkId = keyof typeof SUBGRAPH

export enum ParameterType {
  Static,
  Dynamic,
  Dynamic32,
}

export enum Comparison {
  EqualTo,
  GreaterThan,
  LessThan,
  OneOf,
}

export enum Clearance {
  None,
  Target,
  Function,
}

export enum ExecutionOptions {
  None = 0,
  Send = 1,
  DelegateCall = 2,
  Both = 3,
}

export interface RolePermissions {
  targets: Target[]
}

export interface Target {
  address: string
  clearance: Clearance
  executionOptions: ExecutionOptions
  functions: Function[]
}

export interface Function {
  sighash: string
  executionOptions: ExecutionOptions
  wildcarded: boolean
  parameters: Parameter[]
}

export interface Parameter {
  index: number
  type: ParameterType
  comparison: Comparison
  comparisonValue: string[]
}

interface AllowTargetCall {
  call: "allowTarget"
  targetAddress: string
  options: ExecutionOptions
}

interface ScopeTargetCall {
  call: "scopeTarget"
  targetAddress: string
}

interface ScopeAllowFunctionCall {
  call: "scopeAllowFunction"
  targetAddress: string
  functionSig: string
  options: ExecutionOptions
}

interface ScopeFunctionCall {
  call: "scopeFunction"
  targetAddress: string
  functionSig: string
  isParamScoped: boolean[]
  paramType: ParameterType[]
  paramComp: (
    | Comparison.EqualTo
    | Comparison.GreaterThan
    | Comparison.LessThan
  )[]
  compValue: string[]
  options: ExecutionOptions
}

interface ScopeParameterAsOneOfCall {
  call: "scopeParameterAsOneOf"
  targetAddress: string
  functionSig: string
  paramIndex: number
  type: ParameterType
  value: string[]
}

// interface UnscopeParameterCall {
//   call: "unscopeParameter"
//   targetAddress: string
//   functionSig: string
//   paramIndex: number
// }

interface ScopeRevokeFunctionCall {
  call: "scopeRevokeFunction"
  targetAddress: string
  functionSig: string
}

interface RevokeTargetCall {
  call: "revokeTarget"
  targetAddress: string
}

export type Call =
  | AllowTargetCall
  | ScopeTargetCall
  | ScopeAllowFunctionCall
  | ScopeFunctionCall
  | ScopeParameterAsOneOfCall
  | ScopeRevokeFunctionCall
  | RevokeTargetCall
