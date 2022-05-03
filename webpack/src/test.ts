interface MyElement {
    width: number,
    height: number,
    selector: string,
}

type RecordOfElement = Exclude<{
    width: number,
    height: number
}, MyElement>;