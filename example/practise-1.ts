// KebabCaseToCamelCase
type KebabCaseToCamelCase<Str extends string> = 
    Str extends `${infer Item}-${infer Rest}` 
        ? `${Item}${KebabCaseToCamelCase<Capitalize<Rest>>}`
        : Str;

type KebabCaseToCamelCaseRes = KebabCaseToCamelCase<'guang-and-dong'>;

// CamelCaseToKebabCase
type CamelCaseToKebabCase<Str extends string> = 
    Str extends `${infer First}${infer Rest}`
        ? First extends Lowercase<First> 
            ? `${First}${CamelCaseToKebabCase<Rest>}`
            : `-${Lowercase<First>}${CamelCaseToKebabCase<Rest>}`
        : Str;

type CamelCaseToKebabCaseRes = CamelCaseToKebabCase<'guangAndDong'>;

// Chunk
type Chunk<
    Arr extends unknown[], 
    ItemLen extends number, 
    CurItem extends unknown[] = [], 
    Res exends unknown[] = []
> = Arr extends [infer First, ...infer Rest] ? 
          CurItem['length'] extends ItemLen ? 
            Chunk<Rest, ItemLen, [First], [...Res, CurItem]> :
            Chunk<Rest, ItemLen, [...CurItem, First], Res> 
    : [...Res, CurItem]

type ChunkRes = Chunk<[1,2,3,4,5], 2>;

//TupleToNestedObject
type TupleToNestedObject<Tuple extends unknown[], Value> = 
    Tuple extends [infer First, ...infer Rest]
      ? {
          [Key in First as Key extends keyof any ? Key : never]: 
              Rest extends unknown[]
                  ? TupleToNestedObject<Rest, Value>
                  : Value
      }
      : Value;


type TupleToNestedObjectRes = TupleToNestedObject<['guang', 'and','dong'], 1>;

type TupleToNestedObjectRes2 = TupleToNestedObject<['guang', 'and', number,'dong'], 1>;

type TupleToNestedObjectRes3 = TupleToNestedObject<['guang', 'and', undefined,'dong'], 1>;

type allowedKeyType = keyof any;

// PartialObjectPropByKeysRes
interface Dong {
    name: string
    age: number
    address: string
}
  
type Copy<Obj extends Record<string, any>> = {
    [Key in keyof Obj]:Obj[Key]
}

type PartialObjectPropByKeys<
    Obj extends Record<string, any>,
    Key extends keyof any = keyof Obj
> = Copy<Partial<Pick<Obj,Extract<keyof Obj, Key>>> & Omit<Obj,Key>>;

type PartialObjectPropByKeysRes = PartialObjectPropByKeys<Dong, 'name' | 'age'>;

type OmitRes = Omit<Dong, 'name' | 'age'>;

type PickRes = Pick<Dong, 'name' | 'age'>;


type ExtractRes = Extract<keyof Dong, 'name' | 'age' | 'aaa'>;

