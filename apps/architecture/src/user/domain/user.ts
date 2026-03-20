export class User {
  constructor(
    private id: string | null,
    private email: string,
    private password: string,
  ) {}

  public static create(email: string, password: string): User {
    return new User(null, email, password);
  }

  getId(): string | null {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  getPassword(): string {
    return this.password;
  }

  setPassword(password: string): void {
    this.password = password;
  }
}
