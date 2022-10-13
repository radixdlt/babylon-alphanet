export enum Type {
  I8 = 'i8',
  I16 = 'i16',
  I32 = 'i32',
  I64 = 'i64',
  I128 = 'i128',
  U8 = 'u8',
  U16 = 'u16',
  U32 = 'u32',
  U64 = 'u64',
  U128 = 'u128',
  Unit = 'Unit',
  Bool = 'Bool',
  String = 'String',
  Struct = 'Struct',
  Enum = 'Enum',
  Option = 'Option',
  Box = 'Box',
  Tuple = 'Tuple',
  Result = 'Result',
  Vec = 'Vec',
  List = 'List',
  Set = 'Set',
  Map = 'Map',
  Decimal = 'Decimal',
  PreciseDecimal = 'PreciseDecimal',
  PackageAddress = 'PackageAddress',
  ComponentAddress = 'ComponentAddress',
  ResourceAddress = 'ResourceAddress',
  NonFungibleAddress = 'NonFungibleAddress',
  Hash = 'Hash',
  Bucket = 'Bucket',
  Proof = 'Proof',
  NonFungibleId = 'NonFungibleId',
}

export class TransactionSpecError extends Error {
  constructor(errorMessage: string) {
    super(errorMessage)
  }
}

export const Unit = (): '()' => {
  return '()'
}

export const Bool = (bool: boolean): `${boolean}` => {
  return `${bool}`
}

export const I8 = (num: number): `${number}i8` => {
  if (num < -128 || num > 127) {
    throw new TransactionSpecError('Number range exceeded i8')
  }
  return `${num}i8`
}

export const I16 = (num: number): `${number}i16` => {
  if (num < -32768 || num > 32767) {
    throw new TransactionSpecError('Number range exceeded i16')
  }
  return `${num}i16`
}

export const I32 = (num: number): `${number}i32` => {
  if (num < -2147483648 || num > 2147483647) {
    throw new TransactionSpecError('Number range exceeded i32')
  }
  return `${num}i32`
}

export const I64 = (num: string): `${string}i64` => {
  const bigNum = BigInt(num)
  if (
    bigNum < BigInt('-9223372036854775808') ||
    bigNum > BigInt('9223372036854775807')
  ) {
    throw new TransactionSpecError('Number range exceeded i64')
  }
  return `${num}i64`
}

export const I128 = (num: string): `${string}i128` => {
  const bigNum = BigInt(num)
  if (
    bigNum < BigInt('-170141183460469231731687303715884105728') ||
    bigNum > BigInt('170141183460469231731687303715884105727')
  ) {
    throw new TransactionSpecError('Number range exceeded i128')
  }
  return `${num}i128`
}

export const U8 = (num: number): `${number}u8` => {
  if (num < 0 || num > 255) {
    throw new TransactionSpecError('Number range exceeded u8')
  }
  return `${num}u8`
}

export const U16 = (num: number): `${number}u16` => {
  if (num < 0 || num > 65535) {
    throw new TransactionSpecError('Number range exceeded u16')
  }
  return `${num}u16`
}

export const U32 = (num: number): `${number}u32` => {
  if (num < 0 || num > 4294967295) {
    throw new TransactionSpecError('Number range exceeded u32')
  }
  return `${num}u32`
}

export const U64 = (num: string): `${string}u64` => {
  const bigNum = BigInt(num)
  if (bigNum < 0 || bigNum > BigInt('18446744073709551615')) {
    throw new TransactionSpecError('Number range exceeded u64')
  }
  return `${num}u64`
}

export const U128 = (num: string): `${string}u128` => {
  const bigNum = BigInt(num)
  if (
    bigNum < 0 ||
    bigNum > BigInt('340282366920938463463374607431768211455')
  ) {
    throw new TransactionSpecError('Number range exceeded u128')
  }
  return `${num}u128`
}

export const String = (str: string): `"${string}"` => {
  return `"${str}"`
}

export const Enum = (field: string, ...args: string[]): string => {
  return args.length > 0
    ? `Enum("${field}",${args.join(',')})`
    : `Enum("${field}")`
}

export const Option = {
  Some: (value: string): `Some(${string})` => {
    return `Some(${value})`
  },
  None: 'None',
}

export const Box = (value: string): `Box(${string})` => {
  return `Box(${value})`
}

export const Tuple = (...args: string[]): string => {
  return `Tuple(${args.join(',')})`
}

export const Result = {
  Ok: (value: string): `Ok(${string})` => {
    return `Ok(${value})`
  },
  Err: (value: string): `Err(${string})` => {
    return `Err(${value})`
  },
}

export const Vec = (type: Type, ...args: string[]): string => {
  return `Vec<${type}>(${args.join(',')})`
}

export const List = (type: Type, ...args: string[]): string => {
  return `List<${type}>(${args.join(',')})`
}

export const Set = (type: Type, ...args: string[]): string => {
  return `Set<${type}>(${args.join(',')})`
}

export const Map = (
  keyType: Type,
  valueType: Type,
  ...args: string[]
): string => {
  return `Map<${keyType},${valueType}>(${args.join(',')})`
}

export const Decimal = (num: number): `Decimal("${string}")` => {
  return `Decimal("${num}")`
}

export const PreciseDecimal = (num: number): `PreciseDecimal("${string}")` => {
  return `PreciseDecimal("${num}")`
}

export const PackageAddress = (
  packageAddress: `package_${string}`
): `PackageAddress("${string}")` => {
  return `PackageAddress("${packageAddress}")`
}

export const ComponentAddress = (
  componentAddress: `component_${string}`
): `ComponentAddress("${string}")` => {
  return `ComponentAddress("${componentAddress}")`
}

export const ResourceAddress = (
  resourceAddress: `resource_${string}`
): `ResourceAddress("${string}")` => {
  return `ResourceAddress("${resourceAddress}")`
}

export const NonFungibleAddress = (
  nonFungibleAddress: string
): `NonFungibleAddress("${string}")` => {
  return `NonFungibleAddress("${nonFungibleAddress}")`
}

export const Hash = (hash: string): `Hash("${string}")` => {
  return `Hash("${hash}")`
}

export const Bucket = (
  bucketId: string | `${string}u32`
): `Bucket(${string})` => {
  return `Bucket(${bucketId})`
}

export const Proof = (proofId: string): `Proof(${string})` => {
  return `Proof(${proofId})`
}

export const NonFungibleId = (
  nonFungibleId: string
): `NonFungibleId("${string}")` => {
  return `NonFungibleId("${nonFungibleId}")`
}
