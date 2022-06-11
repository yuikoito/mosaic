// Either型の定義

export type Either<E, T> = Left<E, T> | Right<E, T>;

export class Right<E, T> {
  constructor(readonly value: T) {}
  type = 'right' as const;
  isRight(): this is Right<E, T> {
    return true;
  }
  isLeft(): this is Left<E, T> {
    return false;
  }
}

export class Left<E, T> {
  constructor(readonly value: E) {}
  type = 'left' as const;
  isRight(): this is Right<E, T> {
    return false;
  }
  isLeft(): this is Left<E, T> {
    return true;
  }
}
