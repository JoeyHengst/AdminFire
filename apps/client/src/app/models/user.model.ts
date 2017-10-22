export interface Roles {
    reader: boolean;
    author?: boolean;
    contributor?: boolean;
    editor?: boolean;
    subscriber?: boolean;
    admin?: boolean;
  }
  export class User {
    uid?: string;
    email?: string;
    name?: string;
    lastname?: string;
    username?: string;
    photoURL?: string;
    roles?: Roles;
    terms?: string;
    constructor(authData) {
      this.email = authData.email
      this.photoURL = authData.photoURL
      this.uid = authData.uid
      this.name = authData.name;
      this.lastname = authData.lastname;
      this.username = authData.username;
      this.roles = { reader: true }
    }
  }