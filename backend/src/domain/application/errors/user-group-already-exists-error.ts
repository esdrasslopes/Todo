export class UserGroupAlreadyExistsError extends Error {
  constructor(group: string) {
    super(`User group "${group}" already exists`);
  }
}
