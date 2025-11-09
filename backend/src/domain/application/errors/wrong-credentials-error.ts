export class WrongCredentialsError extends Error {
  constructor() {
    super(`Creadentials are not valid.`);
  }
}
