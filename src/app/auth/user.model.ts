export interface IUser {
  id: string;
  email: string;
}

export class User implements IUser {
  constructor(
    public id: string,
    public email: string,
    private token?: string) {
  }

  get accessToken(): string {
    return this.token;
  }
}
