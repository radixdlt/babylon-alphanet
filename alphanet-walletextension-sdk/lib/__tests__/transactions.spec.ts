/* eslint-disable array-callback-return */
/* eslint-disable max-nested-callbacks */

import {
  Bool,
  Box,
  Bucket,
  ComponentAddress,
  Decimal,
  Enum,
  Hash,
  I128,
  I16,
  I32,
  I64,
  I8,
  List,
  Map,
  NonFungibleAddress,
  Option,
  PackageAddress,
  PreciseDecimal,
  ResourceAddress,
  Result,
  Set,
  String,
  TransactionSpecError,
  Tuple,
  Type,
  U128,
  U16,
  U32,
  U64,
  U8,
  Unit,
  Vec,
} from '../transaction-spec'

describe('transation spec', () => {
  it.each([
    [Unit(), '()'],
    [Bool(false), 'false'],
    [Bool(true), 'true'],
    [I8(8), '8i8'],
    [I16(16), '16i16'],
    [I32(32), '32i32'],
    [I64('64'), '64i64'],
    [I128('128'), '128i128'],
    [U8(8), '8u8'],
    [U16(16), '16u16'],
    [U32(32), '32u32'],
    [U64('64'), '64u64'],
    [U128('128'), '128u128'],
    [Decimal(42.42), 'Decimal("42.42")'],
    [PreciseDecimal(42.42), 'PreciseDecimal("42.42")'],
    [Enum('Foo'), 'Enum("Foo")'],
    [
      Enum('Foo', String('some string'), Bool(false)),
      'Enum("Foo","some string",false)',
    ],
    [Option.Some(String('foobar')), 'Some("foobar")'],
    [Option.Some(U128('128')), 'Some(128u128)'],
    [Option.Some(Decimal(219.01234)), 'Some(Decimal("219.01234"))'],
    [Option.None, 'None'],
    [Box(U64('64')), 'Box(64u64)'],
    [Box(Decimal(42.42)), 'Box(Decimal("42.42"))'],
    [Tuple(Decimal(42.42), String('foo')), 'Tuple(Decimal("42.42"),"foo")'],
    [Tuple(Decimal(42.42), String('foo')), 'Tuple(Decimal("42.42"),"foo")'],
    [Result.Ok(Decimal(42.42)), 'Ok(Decimal("42.42"))'],
    [
      Result.Ok(Tuple(Decimal(42.42), I128('256'))),
      'Ok(Tuple(Decimal("42.42"),256i128))',
    ],
    [
      Vec(Type.String, String('foo'), String('bar')),
      'Vec<String>("foo","bar")',
    ],
    [
      Vec(Type.Decimal, Decimal(42.42), Decimal(42.42)),
      'Vec<Decimal>(Decimal("42.42"),Decimal("42.42"))',
    ],
    [
      List(Type.String, String('foo'), String('bar')),
      'List<String>("foo","bar")',
    ],
    [
      List(Type.Decimal, Decimal(42.42), Decimal(42.42)),
      'List<Decimal>(Decimal("42.42"),Decimal("42.42"))',
    ],
    [
      Set(Type.String, String('foo'), String('bar')),
      'Set<String>("foo","bar")',
    ],
    [
      Set(Type.Decimal, Decimal(42.42), Decimal(42.42)),
      'Set<Decimal>(Decimal("42.42"),Decimal("42.42"))',
    ],
    [
      Map(Type.String, Type.String, String('foo'), String('bar')),
      'Map<String,String>("foo","bar")',
    ],
    [
      Map(Type.String, Type.Decimal, String('foo'), Decimal(42.42)),
      'Map<String,Decimal>("foo",Decimal("42.42"))',
    ],
    [PackageAddress('package_foo'), 'PackageAddress("package_foo")'],
    [ComponentAddress('component_foo'), 'ComponentAddress("component_foo")'],
    [ResourceAddress('resource_foo'), 'ResourceAddress("resource_foo")'],
    [NonFungibleAddress('foobar'), 'NonFungibleAddress("foobar")'],
    [Hash('hashfoo'), 'Hash("hashfoo")'],
    [Bucket(String('foo')), 'Bucket("foo")'],
    [Bucket(U32(35)), 'Bucket(35u32)'],
  ])('should correctly return %s as %s', (test, expected) => {
    expect(test).toBe(expected)
  })

  it.each([
    [() => I8(128), 'Number range exceeded i8'],
    [() => I8(-129), 'Number range exceeded i8'],
    [() => I16(-32769), 'Number range exceeded i16'],
    [() => I16(32769), 'Number range exceeded i16'],
    [() => I32(-2147483649), 'Number range exceeded i32'],
    [() => I32(2147483648), 'Number range exceeded i32'],
    [() => I64('-9223372036854775809'), 'Number range exceeded i64'],
    [() => I64('9223372036854775808'), 'Number range exceeded i64'],
    [
      () => I128('-170141183460469231731687303715884105729'),
      'Number range exceeded i128',
    ],
    [
      () => I128('170141183460469231731687303715884105728'),
      'Number range exceeded i128',
    ],
    [() => U8(256), 'Number range exceeded u8'],
    [() => U8(-1), 'Number range exceeded u8'],
    [() => U16(-1), 'Number range exceeded u16'],
    [() => U16(65536), 'Number range exceeded u16'],
    [() => U32(-1), 'Number range exceeded u32'],
    [() => U32(4294967296), 'Number range exceeded u32'],
    [() => U64('-1'), 'Number range exceeded u64'],
    [() => U64('18446744073709551616'), 'Number range exceeded u64'],
    [() => U128('-1'), 'Number range exceeded u128'],
    [
      () => U128('340282366920938463463374607431768211456'),
      'Number range exceeded u128',
    ],
  ])('should fail with TransactionSpecError', (test, expected) => {
    expect(test).toThrowError(new TransactionSpecError(expected))
  })
})
