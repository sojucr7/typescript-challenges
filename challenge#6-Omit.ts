// your code here, please don't use Omit<T, K> in your code
type MyOmit<T, K extends string | number | symbol>=Pick<T, Exclude<keyof T, K>>