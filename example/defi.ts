// 映射类型
type MapType<T> = {
  [Key in keyof T]?: T[Key]
}

// 重映射
type MapType<T> = {
    [
        Key in keyof T 
            as `${Key & string}${Key & string}${Key & string}`
    ]: [T[Key], T[Key], T[Key]]
}

// 推导 infer
type First<Tuple extends unknown[]> = Tuple extends [infer T,...infer R] ? T : never;
type res = First<[1,2,3]>;
