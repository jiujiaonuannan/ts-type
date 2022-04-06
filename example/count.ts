// Add
type BuildArray<
    Length extends number, 
    Ele = unknown, 
    Arr extends unknown[] = []
> = Arr['length'] extends Length 
        ? Arr 
        : BuildArray<Length, Ele, [...Arr, Ele]>;


type Add<Num1 extends number, Num2 extends number> = 
    [...BuildArray<Num1>,...BuildArray<Num2>]['length'];


type AddResult = Add<32, 25>;


// Subtract
type Subtract<Num1 extends number, Num2 extends number> = 
    BuildArray<Num1> extends [...arr1: BuildArray<Num2>, ...arr2: infer Rest]
        ? Rest['length']
        : never;

type SubtractResult = Subtract<33, 12>;

// Multiply
type Mutiply<Num1 extends number, Num2 extends number, Result extends unknown[] = []> =
    Num2 extends 0 ? Result['length']
        : Mutiply<Num1, Subtract<Num2, 1> [...BuildArray<Num1>, ...Result]>;

type MutiplyResult = Mutiply<3, 222>;

// Divide
type Divide<Num1 extends number, Num2 extends number, CountArr extends unknown[] = []> =
    Num1 extends 0 ? CountArr['length']
        : Divide<Subtract<Num1, Num2>, Num2, [unknown, ...CountArr]>;

type DivideResult = Divide<30, 5>;


// StrLen
type StrLen<
    Str extends string,
    CountArr extends unknown[] = []
> = Str extends `${string}${infer Rest}` ? StrLen<Rest, [...CountArr, unknown]> : CountArr['length']

type StrLenResult = StrLen<'Hello World'>;


// GreaterThan
type GreaterThan<
    Num1 extends number,
    Num2 extends number,
    CountArr extends unknown[] = []
> = Num1 extends Num2 
    ? false
    : CountArr['length'] extends Num2
        ? true
        : CountArr['length'] extends Num1
            ? false
            : GreaterThan<Num1, Num2, [...CountArr, unknown]>;


type GreaterThanResult = GreaterThan<3, 4>;

type GreaterThanResult2 = GreaterThan<6, 4>;

// Fibonacci
type FibonacciLoop<
    PrevArr extends unknown[], 
    CurrentArr extends unknown[], 
    IndexArr extends unknown[] = [], 
    Num extends number = 1
> = IndexArr['length'] extends Num
    ? CurrentArr['length']
    : FibonacciLoop<CurrentArr, [...PrevArr, ...CurrentArr], [...IndexArr, unknown], Num> 

type Fibonacci<Num extends number> = FibonacciLoop<[1], [], [], Num>;


// 1、1、2、3、5、8、13、21、34
type FibonacciResult = Fibonacci<8>;
