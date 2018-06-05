export namespace oUser {
  export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    role: string;
  }

  export interface RegisteredOrLoginUser {
    data: string;
    token: string;
    user: User;
  }
}
