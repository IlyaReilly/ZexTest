class User {
  login: String;
  password: String;

  constructor(login, password) {
    this.login = login;
    this.password = password;
  }
}

const playwrightProjectsData = JSON.parse(JSON.stringify(require('./PlaywrightProjectsData.json')));

export const userPool = [
  new User(playwrightProjectsData.users.test0.login, playwrightProjectsData.users.test0.password),
  new User(playwrightProjectsData.users.test1.login, playwrightProjectsData.users.test1.password),
  new User(playwrightProjectsData.users.test2.login, playwrightProjectsData.users.test2.password),
  new User(playwrightProjectsData.users.test3.login, playwrightProjectsData.users.test3.password),
  new User(playwrightProjectsData.users.test4.login, playwrightProjectsData.users.test4.password),
  new User(playwrightProjectsData.users.test5.login, playwrightProjectsData.users.test5.password),
  new User(playwrightProjectsData.users.test6.login, playwrightProjectsData.users.test6.password),
  new User(playwrightProjectsData.users.test7.login, playwrightProjectsData.users.test7.password),
  new User(playwrightProjectsData.users.test8.login, playwrightProjectsData.users.test8.password),
  new User(playwrightProjectsData.users.test9.login, playwrightProjectsData.users.test9.password),
];
