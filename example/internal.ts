
type ParametersRes = Parameters<(name: string, age: number) => {}>;

type ReturnTypeRes = ReturnType<() => 'dong'>;

interface Person {
    name: string;
}

interface PersonConstructor {
    new(name: string): Person;
}

type ConstructorParametersRes = ConstructorParameters<PersonConstructor>;

type InstanceTypeRes = InstanceType<PersonConstructor>;

function hello(this: Person) {
    console.log(this.name);
}

// hello.call({});

type ThisParameterTypeRes = ThisParameterType<typeof hello>;

function say(this: Person, age: number) {
    console.log(this.name);
    return this.name + ' ' + age;
}

type OmitThisParameterRes = OmitThisParameter<typeof say>;

type OmitRes = Omit<{name:'guang', age: 20}, 'name'>;

type PartialRes = Partial<{name: 'dong', ge: 18}>;

type RequiredRes = Required<{name?: 'dong', age?: 18}>;

type ReadonlyRes = Readonly<{name: 'dong', age: 18}>;


type PickRes = Pick<{name: 'dong', age: 18, sex: 1}, 'name' | 'age'>;


type RecordRes = Record<'a' | 'b', number>;

type RecordRes2 = Record<string, number>;


type ExcludeRes = Exclude<'a' | 'b' | 'c' | 'd', 'a' | 'b'>;

type ExtractRes = Extract<'a' | 'b' | 'c' | 'd', 'a' | 'b'>;



type NonNullableRes = NonNullable<null>;

type NonNullableRes2 = NonNullable<{name: 'guang'}>;


type UppercaseRes = Uppercase<'aaaa'>;

type LowercaseRes = Lowercase<'AAA'>;

type CapitalizeRes = Capitalize<'aaa'>;

type UncapitalizeRes = Uncapitalize<'Aaa'>;


