

export class Usuario {

  static fromFirebase({ uid, username, email }) {
    return new Usuario(uid, username, email);
  }

  constructor(
      public uid: string,
      public username: string,
      public email: string,
  ) {}

}
