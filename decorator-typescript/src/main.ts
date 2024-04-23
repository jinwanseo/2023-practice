interface Human {
  name: string;
  age: number;
  health?: number;
}
@UserBase
class User implements Human {
  constructor(public name: string, public age: number) {}
  intro() {
    console.log("hello~~");
  }
}

function UserBase(constructor: typeof User) {
  const saveFunc = constructor.prototype.intro;
  constructor.prototype.intro = () => {
    saveFunc();
    console.log("who?");
  };
}

const jwseo = new User("jinwan", 37);
jwseo.intro();
