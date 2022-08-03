import {playwrightProjectsData} from '../TestsLogic/UITests/BaseTest';

class User {
  login: String;
  password: String;
  usedFlag: Boolean;

  constructor(login, password, usedFlag) {
    this.login = login;
    this.password = password;
    this.usedFlag = usedFlag;
  }
}

export class UserPool {
  userPool: Array<User>;

  constructor() {
    this.userPool = [
      new User(playwrightProjectsData.users.test0.login, playwrightProjectsData.users.test0.password, false),
      new User(playwrightProjectsData.users.test1.login, playwrightProjectsData.users.test1.password, false),
      new User(playwrightProjectsData.users.test2.login, playwrightProjectsData.users.test2.password, false),
      new User(playwrightProjectsData.users.test3.login, playwrightProjectsData.users.test3.password, false),
      new User(playwrightProjectsData.users.test4.login, playwrightProjectsData.users.test4.password, false),
      new User(playwrightProjectsData.users.test5.login, playwrightProjectsData.users.test5.password, false),
      new User(playwrightProjectsData.users.test6.login, playwrightProjectsData.users.test6.password, false),
      new User(playwrightProjectsData.users.test7.login, playwrightProjectsData.users.test7.password, false),
      new User(playwrightProjectsData.users.test8.login, playwrightProjectsData.users.test8.password, false),
      new User(playwrightProjectsData.users.test9.login, playwrightProjectsData.users.test9.password, false),
    ];
  }
}
