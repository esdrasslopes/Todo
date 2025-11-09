export abstract class Entity<T> {
  protected constructor(protected props: T) {}

  public equals(entity: Entity<unknown>) {
    if (entity === this) {
      return true;
    }

    return false;
  }
}
