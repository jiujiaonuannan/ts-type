// Promise:

// DeepPromiseValueType:
type DeepPromiseValueType<P extends Promise<unknown>> =
    P extends Promise<infer ValueType> 
        ? ValueType extends Promise<unknown>
            ? DeepPromiseValueType<ValueType>
            : ValueType
        : never;

type DeepPromiseResult = DeepPromiseValueType<Promise<Promise<Record<string, any>>>>;

// DeepPromiseValueType2
type DeepPromiseValueType2<T> = 
    T extends Promise<infer ValueType> 
        ? DeepPromiseValueType2<ValueType>
        : T;

type DeepPromiseValueType2Res = DeepPromiseValueType2<Promise<Promise<Promise<number>>>>;

// 数组：

// ReverseArr:
type ReverseArr<Arr extends unknown[]> = 
    Arr extends [infer First, ...infer Rest] 
        ? [...ReverseArr<Rest>, First] 
        : rr;

type ReverseArrResult = ReverseArr<[1,2,3,4,5]>;

// Includes
type Includes<Arr extends unknown[], FindItem> = 
    Arr extends [infer First, ...infer Rest]
        ? IsEqual<First, FindItem> extends true
            ? true
            : Includes<Rest, FindItem>
        : false;

type IsEqual<A, B> = (A extends B ? true : false) & (B extends A ? true : false);

type IncludesResult = Includes<[1, 2, 3, 4, 5], 4>;

type IncludesResult2 = Includes<[1, 2, 3, 4, 5], 6>;

// RemoveItem
type RemoveItem<Arr extends unknown[], Item, Result extends unknown[] = []> = 
    Arr extends [infer First, ...infer Rest]
        ? IsEqual<First, Item> extends true
            ? RemoveItem<Rest, Item, Result>
            : RemoveItem<Rest, Item, [...Result, First]>
        : Result;

type RemoveItemResult = RemoveItem<[1,2,2,3], 2>;

// BuildArray
type BuildArray<Length extends number, 
    Ele = unknown, 
    Arr extends unknown[] = []> =
    Arr['length'] extends Length 
        ? Arr 
        : BuildArray<Length, Ele, [...Arr, Ele]>;

type BuildArrResult = BuildArray<5>;

// 字符串类型

// ReplaceAll
type ReplaceAll<Str extends string, 
    From extends string, 
    To extends string> = 
        Str extends `${infer Left}${From}${infer Right}`
            ? `${Left}${To}${ReplaceAll<Right, From, To>}`
            : Str;

type ReplaceAllResult = ReplaceAll<'guang guang guang', 'guang', 'dong'>;

// StringToUnion
type StringToUnion<Str extends string> = 
    Str extends `${infer First}${infer Rest}`
        ? First | StringToUnion<Rest>
        : never;


type StringToUnionResult = StringToUnion<'hello'>;

// ReverseStr
type ReverseStr<Str extends string, 
    Result extends string = ''> = 
    Str extends `${infer First}${infer Rest}` 
        ? ReverseStr<Rest, `${First}${Result}`> 
        : Result;

type ReverseStrResult = ReverseStr<'hello'>;

// 索引类型：

// DeepReadonly

type DeepReadonly<Obj extends Record<string, any>> = {
    readonly [Key in keyof Obj]:
        Obj[Key] extends object
            ? Obj[Key] extends Function
                ? Obj[Key] 
                : DeepReadonly<Obj[Key]>
            : Obj[Key]
}

type obj = {
    a: {
        b: {
            c: {
                f: () => 'dong',
                d: {
                    e: {
                        guang: string
                    }
                }
            }
        }
    }
}

type DeepReadonlyResult = DeepReadonly<obj>['a'];

type DeepReadonlyResult2 = DeepReadonly<obj>['a']['b']['c'];

