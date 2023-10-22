import { List } from "ts-toolbelt"

type Inventory = readonly string[]

type Room={
    text:string;
    inventory:Inventory;
    actions:Record<string,[string|undefined,Room]>
}

type Room1<I extends Inventory=[]>={
    text:"welcome to the game",
    inventory:I,
    actions:{
        north:[undefined,Room2<I>],
        south:[undefined,Room3<I>]
    }
}

type Room2<I extends Inventory=[]>={
    text:"north room,there is a book here",
    inventory:I,
    actions:{
        south:[undefined,Room1<I>],
        "take book":[undefined,Room2_2<List.Append<I,"book">>]
    }
}

type Room2_2<I extends Inventory=[]>={
    text:"north room",
    inventory:I,
    actions:{
        south:[undefined,Room1<I>]
    }
}

type Room3<I extends Inventory=[]>={
    text:"south room,there is a shelf here",
    inventory:I,
    actions:{
        north:[undefined,Room1<I>],
        "put book on shelf":["book",Room3_2<List.Filter<I,"book">>]
    }
}

type Room3_2<I extends Inventory=[]>={
    text:"you win",
    inventory:I,
    actions:{}
}

type CanAct<R extends Room['actions'][string],I extends Inventory> =R[0] extends undefined?true:List.Includes<I,R[0]> extends 1?true:false

type Act <R extends Room,A extends keyof R['actions']>= CanAct<R['actions'][A],R['inventory']> extends true? R['actions'][A][1]:never

type step1=Act<Room1,'north'>
type step2=Act<step1,'south'>
type step3=Act<step2,'south'>
type step4=Act<step3,'north'>
type step5=Act<step4,'south'>
type step6=Act<step5,'put book on shelf'>