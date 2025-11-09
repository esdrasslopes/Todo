export class UnauthorizedError extends Error {
  constructor() {
    super("Only admin users or enterprises can created an user");
  }
}
