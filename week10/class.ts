type Gender = "male" | "female";

class Human {
    constructor(
        private _name: string,
        private _age: number,
        private _gender: Gender | undefined,
    ) {}

    getName = (): void => {
        console.log(this._name);
    };

    set name(name: string) {
        this._name = name;
    }

    get age(): number {
        return this._age;
    }

    set age(v: number) {
        this._age = v;
    }
}

let james = new Human("james", 10, "male");
james.getName();

// set 키워드로 만든 age에 값 할당
james.age = 11;

// get 키워드로 만든 age의 값 읽기
console.log(james.age); // 11