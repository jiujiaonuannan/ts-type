// IsAny
type IsAny<T> = 'dong' extends ('guang' & T) ? true : false

type IsAnyResult = IsAny<any>;

type IsAnyResult2 = IsAny<'guang'>;

// IsEqual
type IsEqual<A, B> = (A extends B ? 1 : 2) & (B extends A ? 1 : 2);

type IsEqualRes = IsEqual<'a', any>;

type IsEqual2<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2)
    ? true : false;

type IsEqual2Res = IsEqual2<'a', any>;

// IsUnion
type IsUnion<A, B = A> =
    A extends A
        ? [B] extends [A]
            ? false
            : true
        : never

type IsUnionResult = IsUnion<'A' | 'B'>;
type IsUnionResult2 = IsUnion<'A'>;

//IsNever
type IsNever<T> = [T] extends [never] ? true : false

type IsNeverResult = IsNever<never>;
type IsNeverResult2 = IsNever<any>;

type TestAny<T> = T extends number ? 1 : 2;

type TestAnyRes = TestAny<any>;

//IsTuple
type len = [1,2,3]['length'];

type len2 = number[]['length']

type IsTuple<T> = 
    T extends readonly [...params: infer Eles] 
        ? NotEqual<Eles['length'], number> 
        : false;

type NotEqual<A, B> = 
    (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2)
        ? false : true;


type IsTupleResult = IsTuple<[1, 2, 3]>;

type IsTupleResult2 = IsTuple<number[]>;

//UnionToIntersection

type UnionToIntersection<U> = 
    (U extends U ? (x: U) => unknown : never) extends (x: infer R) => unknown
        ? R
        : never;

type UnionToIntersectionResult = UnionToIntersection<{ guang: 1 } | { dong: 2 }>;

//GetOptional
type GetOptional<Obj extends  Record<string, any>> = {
    [
        Key in keyof Obj 
            as {} extends Pick<Obj, Key> ? Key : never
    ] : Obj[Key];
}


type GetOptionalResult = GetOptional<{
  name: string;
  age?: number;
}>;

//GetRequired
type isRequired<Key extends keyof Obj, Obj> = 
    {} extends Pick<Obj, Key> ? never : Key;

type GetRequired<Obj extends Record<string, any>> = { 
    [Key in keyof Obj as isRequired<Key, Obj>]: Obj[Key] 
}

type GetRequiredResult = GetRequired<{
  name: string;
  age?: number;
}>;

//RemoveIndexSignature
type RemoveIndexSignature<Obj extends Record<string, any>> = {
  [
      Key in keyof Obj 
          as Key extends `${infer Str}`? Str : never
  ]: Obj[Key]
}

type RemoveIndexSignatureResult = RemoveIndexSignature<{
  [key: string]: any;
  sleep(): void;
}>;
//ClassPublicProps
class Dong {
  public name: string;
  protected age: number;
  private hobbies: string[];

  constructor() {
    this.name = 'dong';
    this.age = 20;
    this.hobbies = ['sleep', 'eat'];
  }
}

type ClassPublicPropsResult = ClassPublicProps<Dong>;


type ClassPublicProps<Obj extends Record<string, any>> = {
    [Key in keyof Obj]: Obj[Key]    
}

