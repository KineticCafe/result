/**
 * A Result model, loosely based on the Rust result type.
 *
 * @module
 */

/**
 * `Result<T, E>` is used for returning and propagating errors.
 *
 * It can be constructed with {@link Ok} or {@link Err}.
 *
 * @typeParam T - The type of the `Ok` value.
 * @typeParam E - The type of the `Err` value.
 */
export class Result<T, E> {
  /** @internal */
  // biome-ignore lint/complexity/noUselessConstructor: hiding from documentation
  constructor() {}

  /**
   * Returns `true` if the result is `Ok`.
   *
   * @example
   *
   * ```typescript
   * const x: Result<number, string> = Ok(2)
   * x.isOk() === true
   *
   * const y: Result<number, string> = Err('hey')
   * y.isOk() === false
   * ```
   */
  isOk(): boolean {
    throw new Error('Abstract Result')
  }

  /**
   * Returns `true` if the result is `Ok` and the contained value matches a
   * predicate.
   *
   * @param pred - The predicate to test the contained value
   * @typeParam T - The type of the contained value
   *
   * @example
   *
   * ```typescript
   * const x: Result<number, string> = Ok(2)
   * x.isOkAnd((v) => v > 1) === true
   *
   * const y: Result<number, string> = Ok(0)
   * y.isOkAnd((v) => v > 1) === false
   *
   * const z: Result<number, string> = Err('hey')
   * z.isOkAnd((v) => v > 1) === false
   * ```
   */
  isOkAnd(pred: (val: T) => boolean): boolean {
    throw new Error('Abstract Result')
  }

  /**
   * Returns `true` if the result is `Err`.
   *
   * @example
   *
   * ```typescript
   * const x: Result<number, string> = Ok(2)
   * x.isErr() === false
   *
   * const y: Result<number, string> = Err('hey')
   * y.isErr() === true
   * ```
   */
  isErr(): boolean {
    throw new Error('Abstract Result')
  }

  /**
   * Returns `true` if the result is `Err` and the contained error matches
   * a predicate.
   *
   * @param pred - The predicate to test the contained error
   * @typeParam E - The type of the contained error
   *
   * @example
   *
   * ```typescript
   * const x: Result<number, string> = Ok(2)
   * x.isErrAnd((e) => e === 'hey') === false
   *
   * const y: Result<number, string> = Err('howdy')
   * y.isErrAnd((e) => e === 'hey') === false
   *
   * const z: Result<number, string> = Err('hey')
   * z.isErrAnd((e) => e === 'hey') === true
   * ```
   */
  isErrAnd(pred: (val: E) => boolean): boolean {
    throw new Error('Abstract Result')
  }

  /**
   * Maps a `Result<T, E>` to `Result<U, E>` by applying a function to
   * the contained `Ok` value, leaving an `Err` value untouched.
   *
   * @param fn - A function that maps `T` to `U`
   * @typeParam T - The type of the contained value
   * @typeParam U - The type of the new contained value
   * @typeParam E - The type of the contained error
   *
   * @example
   *
   * ```typescript
   * const x: Result<number, string> = Ok(2)
   * x.map((v) => v * 2) === Ok(4)
   *
   * const y: Result<number, string> = Err('hey')
   * y.map((v) => v * 2) === Err('hey')
   * ```
   */
  map<U>(fn: (val: T) => U): Result<U, E> {
    throw new Error('Abstract Result')
  }

  /**
   * Returns the provided `defaultValue` (if `Err`), or applies a function to
   * the contained value (if `Ok`).
   *
   * @remarks
   *
   * This implementation reverses the order of the mapping functions from the
   * Rust version.
   *
   * @param defaultValue - The default value to return if `Err`
   * @param fn - A function that maps `T` to `U` if `Ok`
   * @typeParam T - The type of the contained value
   * @typeParam U - The type of the new contained value
   * @typeParam E - The type of the contained error
   *
   * @example
   *
   * ```typescript
   * const x: Result<string, string> = Ok('foo')
   * x.mapOr(42, (v) => v.length) === 3
   *
   * const y: Result<string, string> = Err('bar')
   * y.mapOr(42, (v) => v.length) === 42
   * ```
   *
   * @see {@link Result#mapOrElse}
   */
  mapOr<U>(fn: (val: T) => U, defaultValue: U): U {
    throw new Error('Abstract Result')
  }

  /**
   * Maps a `Result<T, E>` to `U` by applying a fallback function `defaultFn` to
   * a contained `Err` value, or function `fn` to a contained `Ok` value.
   *
   * This function can be used to unpack a successful result while handling an
   * error.
   *
   * @remarks
   *
   * This implementation reverses the order of the mapping functions from the
   * Rust version.
   *
   * @param fn - A function that maps `T` to `U` if `Ok`
   * @param defaultFn - The default value to return if `Err`
   * @typeParam T - The type of the contained value
   * @typeParam U - The type of the new contained value
   * @typeParam E - The type of the contained error
   *
   * @example
   *
   * ```typescript
   * const k = 21
   *
   * const x: Result<string, string> = Ok('foo')
   * x.mapOrElse((v) => v.length, (e) => k * 2) === 3
   *
   * const y: Result<string, string> = Err('bar')
   * y.mapOrElse((v) => v.length, (e) => k * 2) === 42
   * ```
   */
  mapOrElse<U>(fn: (val: T) => U, defaultFn: (val: E) => U): U {
    throw new Error('Abstract Result')
  }

  /**
   * Maps a `Result<T, E>` to `Result<T, F>` by applying a function to
   * a contained `Err`, leaving an `Ok` value untouched.
   *
   * This function can be used to pass through a successful result while
   * handling an error.
   *
   * @param fn - A function that maps `E` to `F` if `Err`
   * @typeParam T - The type of the contained value
   * @typeParam E - The type of the contained error
   * @typeParam F - The type of the new contained error
   *
   * @example
   *
   * ```typescript
   * const x: Result<number, number> = Ok(2)
   * x.mapErr((e) => new Error(`error code: ${e}`)) == Ok(2)
   *
   * const y: Result<number, number> = Err(13)
   * y.mapErr((e) => new Error(`error code: ${e}`)) == Err('error code: 13')
   * ```
   */
  mapErr<F>(fn: (val: E) => F): Result<T, F> {
    throw new Error('Abstract Result')
  }

  /**
   * Calls the provided closure with a reference to the contained value (if
   * `Ok`). The `Result<T, E>` is returned unmodified.
   *
   * @param fn - The closure to call.
   * @typeParam T - The type of the contained value
   * @typeParam E - The type of the contained error
   *
   * @remarks
   *
   * Renamed from `#inspect` because of conflicts with chaijs/loupe.
   *
   * @example
   *
   * ```typescript
   * const x: Result<number, string> = Ok(2)
   * x.inspectOk((v) => console.log(`original: ${v}`))
   *  .map((v) => v * v * v) === Ok(8)
   *
   * // 'original: 2' will be written to the console
   * ```
   */
  inspectOk(fn: (val: T) => void): Result<T, E> {
    throw new Error('Abstract Result')
  }

  /**
   * Calls the provided closure with a reference to the contained error (if
   * `Err`). The `Result<T, E>` is returned unmodified.
   *
   * @param fn - The closure to call.
   * @typeParam T - The type of the contained value
   * @typeParam E - The type of the contained error
   *
   * @example
   *
   * ```typescript
   * const x: Result<number, string> = Err('bar')
   * x.inspectErr((v) => console.log(`error: ${v}`))
   *  .map((v) => v * v * v) === Err('bar')
   *
   * // 'error: bar' will be written to the console
   * ```
   */
  inspectErr(fn: (val: E) => void): Result<T, E> {
    throw new Error('Abstract Result')
  }

  /**
   * Returns the contained `Ok` value or throws an exception if `Err`.
   *
   * Because this function may throw an exception, its use is discouraged.
   * Instead, prefer to use {@link Result#match} to handle the `Err` case
   * explicitly, or call {@link Result#unwrapOr} or {@link Result#unwrapOrElse}.
   *
   * @param message - The message to display before the error value in the
   *                  thrown exception if `Err`.
   * @param errorClass - The error class to use, defaulting to `Error`.
   * @typeParam T - The type of the contained value
   *
   * @example
   *
   * ```typescript
   * let x: Result<number, string> = Err('emergency failure')
   * try {
   *   x.expect('Testing expect')
   * } catch (e) {
   *   e.message === 'Testing expect: emergency failure'
   * }
   * ```
   */
  expect(message: string, errorClass: DynamicError = Error): T {
    throw new Error('Abstract Result')
  }

  /**
   * Returns the contained `Ok` value, or throws an exception if `Err`.
   *
   * Because this function may throw an exception, its use is discouraged.
   * Instead, prefer to use {@link Result#match} to handle the `Err` case
   * explicitly, or call {@link Result#unwrapOr} or {@link Result#unwrapOrElse}.
   *
   * @param errorClass - The error class to use, defaulting to `ReferenceError`.
   * @typeParam T - The type of the contained value
   *
   * @example
   *
   * ```typescript
   * let x: Result<number, string> = Err('emergency failure')
   * try {
   *   x.unwrap()
   * } catch (e) {
   *   e.message === 'Called Result#unwrap on an Err value: emergency failure'
   * }
   * ```
   */
  unwrap(errorClass: DynamicError = ReferenceError): T | never {
    throw new Error('Abstract Result')
  }

  /**
   * Returns the contained `Err` value or throws an exception if `Ok`.
   *
   * Because this function may throw an exception. Prefer to use {@link
   * Result#match} to handle both the `Ok` and `Err` cases explicitly.
   *
   * @param message - The message to display before the error value in the
   *                  thrown exception if `Err`.
   * @param errorClass - The error class to use.
   * @typeParam E - The type of the contained error
   *
   * @example
   *
   * ```typescript
   * let x: Result<number, string> = Ok(10)
   * try {
   *   x.expect('Testing expectErr')
   * } catch (e) {
   *   e.message === 'Testing expectErr: 10'
   * }
   * ```
   */
  expectErr(message: string, errorClass: DynamicError = Error): E {
    throw new Error('Abstract Result')
  }

  /**
   * Returns the contained `Err` value, or throws an exception if `Ok`.
   *
   * Because this function may throw an exception. Prefer to use {@link
   * Result#match} to handle both the `Ok` and `Err` cases explicitly.
   *
   * @param errorClass - The error class to use, defaulting to `ReferenceError`.
   * @typeParam E - The type of the contained value
   *
   * @example
   *
   * ```typescript
   * let x: Result<number, string> = Ok(10)
   * try {
   *   x.unwrapErr()
   * } catch (e) {
   *   e.message === 'Called Result#unwrapErr on an Ok value: 10'
   * }
   * ```
   */
  unwrapErr(errorClass: DynamicError = ReferenceError): E | never {
    throw new Error('Abstract Result')
  }

  /**
   * Returns the contained `Ok` value or a provided default value.
   *
   * @param defaultValue - The default value to return if `Err`
   * @typeParam T - The type of the contained value
   *
   * @example
   *
   * ```typescript
   * const x: Result<number, string> = Ok(9)
   * x.unwrapOr(42) === 9
   *
   * const y: Result<number, string> = Err('error')
   * y.unwrapOr(42) === 42
   * ```
   */
  unwrapOr(defaultValue: T): T {
    throw new Error('Abstract Result')
  }

  /**
   * Returns the contained `Ok` value or computes it from a provided function
   * that transforms the contained `Err` value.
   *
   * @param fn - The function to transform `Err` to the default value
   * @typeParam T - The type of the contained value
   * @typeParam E - The type of the contained error
   *
   * @example
   *
   * ```typescript
   * const x: Result<number, string> = Ok(9)
   * x.unwrapOrElse((e) => e.length) === 9
   *
   * const y: Result<number, string> = Err('foo')
   * y.unwrapOrElesE((e) => e.length) === 3
   * ```
   */
  unwrapOrElse(fn: (val: E) => T): T {
    throw new Error('Abstract Result')
  }

  /**
   * Returns `Result<U, E>` if `Ok` and the current value if `Err`.
   *
   * @typeParam U - The new type for the `Ok` value.
   *
   * @example
   *
   * ```typescript
   * Ok(3).and(Ok('5'))  // => Ok('5')
   * Ok(3).and(Err('5')) // => Err('5')
   * Err(3).and(Ok('5')) // => Err(3)
   * ```
   */
  and<U>(result: Result<U, E>): Result<U, E> {
    throw new Error('Abstract Result')
  }

  /**
   * Calls `fn` if `Ok`, or returns `Err`.
   *
   * This function can be used for control flow based on `Result` values.
   *
   * @typeParam U - The new type for the `Ok` value.
   *
   * @example
   *
   * ```typescript
   * const squaredString = (x: number) => {
   *    return x <= 9 ? Ok(`${x * x}`) : Err('overflowed')
   * }
   *
   * Ok(2).andThen(squaredString)  // => Ok('4')
   * Ok(10).andThen(squaredString) // => Err('overflowed')
   * ```
   */
  andThen<U>(fn: (val: T) => Result<U, E>): Result<U, E> {
    throw new Error('Abstract Result')
  }

  /**
   * Returns `Result<T, F>` if `Err` and the current value if `Ok`.
   *
   * @example
   *
   * ```typescript
   * const w: Result<number, string> = Ok(2)
   * const x: Result<number, string> = Err('not a 2')
   * const y: Result<string, string> = Ok('different type')
   * const z: Result<string, string> = Err('another error')
   *
   * w.or(x) === Ok(2)
   * w.or(y) === Ok(2)
   * x.or(y) === Err('not a 2')
   * x.or(z) === Err('another error')
   * ```
   */
  or<F>(result: Result<T, F>): Result<T, F> {
    throw new Error('Abstract Result')
  }

  /**
   * Calls `fn` if `Ok`, or returns `Err`.
   *
   * This function can be used for control flow based on `Result` values.
   *
   * @example
   *
   * ```typescript
   * const squaredString = (x: number): Result<string, string> => {
   *    return x <= 9 ? Ok(`${x * x}`) : Err('overflowed')
   * }
   *
   * Err(2).orElse(squaredString).unwrap() === '4'
   * Ok(10).orElse(squaredString).unwrapErr() == 'overflowed'
   * ```
   */
  orElse<F>(fn: (val: E) => Result<T, F>): Result<T, F> {
    throw new Error('Abstract Result')
  }

  match<U>(matcher: Match<T, E, U>): U {
    throw new Error('Abstract Result')
  }
}

class OkResult<T, E> extends Result<T, E> {
  private readonly ok: T

  constructor(ok: T) {
    super()
    this.ok = ok
  }

  isOk(): boolean {
    return true
  }

  isOkAnd(pred: (val: T) => boolean): boolean {
    return pred(this.ok)
  }

  isErr(): boolean {
    return false
  }

  isErrAnd(_pred: (val: E) => boolean): boolean {
    return false
  }

  map<U>(fn: (val: T) => U): Result<U, E> {
    return Ok(fn(this.ok))
  }

  mapOr<U>(fn: (val: T) => U, _defaultValue: U): U {
    return fn(this.ok)
  }

  mapOrElse<U>(fn: (val: T) => U, _defaultFn: (val: E) => U): U {
    return fn(this.ok)
  }

  mapErr<F>(_fn: (val: E) => F): Result<T, F> {
    return Ok(this.ok)
  }

  inspectOk(fn: (val: T) => void): Result<T, E> {
    fn(this.ok)

    return this
  }

  inspectErr(_fn: (val: E) => void): Result<T, E> {
    return this
  }

  expect(_message: string, _errorClass: DynamicError = Error): T {
    return this.ok
  }

  unwrap(_errorClass: DynamicError = ReferenceError): T | never {
    return this.ok
  }

  expectErr(message: string, errorClass: DynamicError = Error): E {
    return unwrapFailed(message, this.ok, errorClass)
  }

  unwrapErr(errorClass: DynamicError = ReferenceError): E | never {
    return unwrapFailed('Called Result#unwrapErr on an Ok value', this.ok, errorClass)
  }

  unwrapOr(_defaultValue: T): T {
    return this.ok
  }

  unwrapOrElse(_fn: (val: E) => T): T {
    return this.ok
  }

  and<U>(result: Result<U, E>): Result<U, E> {
    return result
  }

  andThen<U>(fn: (val: T) => Result<U, E>): Result<U, E> {
    return fn(this.ok)
  }

  or<F>(_result: Result<T, F>): Result<T, F> {
    return Ok(this.ok)
  }

  orElse<F>(_fn: (val: E) => Result<T, F>): Result<T, F> {
    return Ok(this.ok)
  }

  match<U>(matcher: Match<T, E, U>): U {
    return matcher.ok(this.ok)
  }
}

class ErrResult<T, E> extends Result<T, E> {
  private readonly err: E

  constructor(err: E) {
    super()
    this.err = err
  }

  isOk(): boolean {
    return false
  }

  isOkAnd(_pred: (val: T) => boolean): boolean {
    return false
  }

  isErr(): boolean {
    return true
  }

  isErrAnd(pred: (val: E) => boolean): boolean {
    return pred(this.err)
  }

  map<U>(_fn: (val: T) => U): Result<U, E> {
    return Err(this.err)
  }

  mapOr<U>(_fn: (val: T) => U, defaultValue: U): U {
    return defaultValue
  }

  mapOrElse<U>(_fn: (val: T) => U, defaultFn: (val: E) => U): U {
    return defaultFn(this.err)
  }

  mapErr<F>(fn: (val: E) => F): Result<T, F> {
    return Err(fn(this.err))
  }

  inspectOk(_fn: (val: T) => void): Result<T, E> {
    return this
  }

  inspectErr(fn: (val: E) => void): Result<T, E> {
    fn(this.err)

    return this
  }

  expect(message: string, errorClass: DynamicError = Error): T {
    return unwrapFailed(message, this.err, errorClass)
  }

  unwrap(errorClass: DynamicError = ReferenceError): T | never {
    return unwrapFailed('Called Result#unwrap on an Err value', this.err, errorClass)
  }

  expectErr(_message: string, _errorClass: DynamicError = Error): E {
    return this.err
  }

  unwrapErr(_errorClass: DynamicError = ReferenceError): E | never {
    return this.err
  }

  unwrapOr(defaultValue: T): T {
    return defaultValue
  }

  unwrapOrElse(fn: (val: E) => T): T {
    return fn(this.err)
  }

  and<U>(_result: Result<U, E>): Result<U, E> {
    return Err(this.err)
  }

  andThen<U>(fn: (val: T) => Result<U, E>): Result<U, E> {
    return Err(this.err)
  }

  or<F>(result: Result<T, F>): Result<T, F> {
    return result
  }

  orElse<F>(fn: (val: E) => Result<T, F>): Result<T, F> {
    return fn(this.err)
  }

  match<U>(matcher: Match<T, E, U>): U {
    return matcher.err(this.err)
  }
}

/**
 * Flattens one level of nested `Result`s, converting `Result<Result<T, E>, E>` to
 * `Result<T, E>`.
 *
 * @param value - The nested `Result`.
 * @typeParam T - The type of the `Ok` value.
 * @typeParam E - The type of the `Err` value.
 *
 * @example
 *
 * ```typescript
 * flattenResult(Ok(Ok('hello'))) // => Ok('hello')
 * flattenResult(Ok(Err(5))) // => Err(5)
 * ```
 */
export const flattenResult = <T, E>(value: Result<Result<T, E>, E>): Result<T, E> => {
  return value.isOk() ? value.unwrap() : Err(value.unwrapErr())
}

/**
 * Constructs an `Ok` {@link Result}.
 *
 * @param ok - The value of type `T` to store.
 * @typeParam T - The type of the `Ok` value.
 * @typeParam E - The type of the `Err` value.
 */
export const Ok = <T, E>(ok: T): Result<T, E> => new OkResult<T, E>(ok)
/**
 * Constructs an `Err` {@link Result}.
 *
 * @param err - The value of type `E` to store.
 * @typeParam T - The type of the `Ok` value.
 * @typeParam E - The type of the `Err` value.
 */
export const Err = <T, E>(err: E): Result<T, E> => new ErrResult<T, E>(err)

/**
 * Unwraps any errors as a list.
 *
 * @param results - The list of `Result` objects to unwrap.
 * @typeParam T - The type(s) of the `Ok` values in `results`.
 * @typeParam E - The type(s) of the `Err` values in `results`.
 */
export const unwrapErrors = <T, E>(results: Result<T, E>[]): E[] => {
  const errors: E[] = []

  for (const result of results) {
    result.inspectErr((e) => errors.push(e))
  }

  return errors
}

/**
 * Filters a list of {@link Result} for any `Err` values, and throws an exception if the
 * list is not empty.
 *
 * @param results - The list of `Result` objects to unwrap.
 * @param message - The message to prepend to the list of errors.
 * @param errorClass - The error class to use, defaulting to `Error`.
 * @typeParam T - The type(s) of the `Ok` values in `results`.
 * @typeParam E - The type(s) of the `Err` values in `results`.
 */
export const unwrapAndThrowErrors = <T, E>(
  results: Result<T, E>[],
  message?: string,
  errorClass: DynamicError = Error,
): void => {
  const errors = unwrapErrors(results)

  if (errors.length > 0) {
    throw new errorClass(
      `${message || 'Errors found'}:\n${errors.map((e) => ` - ${e}`).join('\n')}`,
    )
  }
}

/**
 * Unwraps any results as a list, ignoring errors.
 */
export const unwrapResults = <T, E, V extends Result<T, E>>(results: V[]): T[] =>
  results.filter((v) => v.isOk()).map((v) => v.unwrap() as T)

interface Match<T, E, U> {
  ok: (val: T) => U
  err: (val: E) => U
}

type DynamicError = new (message?: string) => Error

const unwrapFailed = <E>(message: string, err: E, errorClass: DynamicError): never => {
  throw new errorClass(`${message}: ${err}`)
}
