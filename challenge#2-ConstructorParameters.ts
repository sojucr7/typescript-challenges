type MyConstructorParameters<T extends new (...args:any)=>any>=T extends new (...args:infer R)=>any?R:never

