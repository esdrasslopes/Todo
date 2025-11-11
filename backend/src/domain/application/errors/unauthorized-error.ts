export class UnauthorizedError extends Error {
  constructor() {
    super("Only admin users can access this route.");
  }
}
