export class User {
  private _id: string | null;
  private email: string;
  private password?: string;

  constructor(email: string) {
    this._id = null;
    this.email = email;
  }

  public static create(email: string): User {
    return new User(email);
  }

  setId(value: string | null) {
    this._id = value;
  }

  getId(): string | null {
    return this._id;
  }

  getEmail(): string {
    return this.email;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  getPassword(): string | undefined {
    return this.password;
  }

  setPassword(password: string): void {
    this.password = password;
  }
}
