type MyRequired<T> = {
    [P in keyof T]-?:T[P]
  }