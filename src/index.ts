/**
 * A [`Result` type][wiki] for Typescript, loosely based on Rusts's [std::result][].
 *
 * [std::result]: https://doc.rust-lang.org/std/result/index.html
 * [wiki]: https://en.wikipedia.org/wiki/Result_type
 *
 * `Result` types contain a value or possible error and should be used to return different
 * types for success and failure without using exceptions for normal flow control. As the
 * values in `Result`s are not directly accessible, there is explicit error handling at
 * the point of use, through matching ({@link Result#match}), transformation ({@link
 * Result#andThen}, {@link Result#orElse}), unwrapping ({@link Result#unwrap}, {@link
 * Result#unwrapErr}), mapping ({@link Result#map}, {@link Result#mapErr}), or propagation
 * (returning the result to callers).
 *
 * The @kineticcafe/result library additionally offers some utilities for dealing with
 * arrays of `Result` types.
 *
 * @module
 */

/**
 * `Result<T, E>` is an implementation of a result type, holding a returned value or
 * possible error.
 *
 * A `Result` can be used instead of throwing an exception, but the values are not
 * directly accessible, requiring explicit consideration of success and failure paths.
 *
 * It can be constructed with {@link Ok} or {@link Err}. It may not be constructed
 * directly.
 *
 * This version is loosely based on the Rust result type.
 *
 * @typeParam T - The type of the `Ok` value.
 * @typeParam E - The type of the `Err` value.
 *
 * @category `Result`
 */
export class Result<T, E> {
  /** @internal */
  constructor() {
    if (this.constructor === Result) {
      throw new Error('Result is abstract, use Ok() or Err()')
    }
  }

  /**
   * Returns `true` if the result is `Ok`.
   *
   * If passed a predicate function, the `Ok` value must satisfy the condition.
   *
   * @param pred - An optional predicate to test the `Ok` value
   *
   * @example
   *
   * ```typescript
   * Ok(2).isOk()                   // => true
   * Ok(0).isOk()                   // => true
   * Ok(2).isOk((v) => v > 1)       // => true
   * Ok(0).isOk((v) => v > 1)       // => false
   *
   * Err('hey').isOk()              // => false
   * Err('hey').isOk((v) => v > 1)  // => false
   * ```
   */
  isOk(_pred?: (val: T) => boolean): boolean {
    this.abstractMethod('isOk')
  }

  /**
   * Returns `true` if the result is `Ok` and the value satisfies the condition of the
   * predicate function.
   *
   * @param pred - The predicate to test the `Ok` value
   *
   * @example
   *
   * ```typescript
   * Ok(2).isOkAnd((v) => v > 1)      // => true
   * Ok(0).isOkAnd((v) => v > 1)      // => false
   * Err('hey').isOkAnd((v) => v > 1) // => false
   * ```
   *
   * @deprecated Use {@link Result#isOk} instead.
   */
  isOkAnd(pred: (val: T) => boolean): boolean {
    return this.isOk(pred)
  }

  /**
   * Returns `true` if the result is `Err`.
   *
   * If passed a predicate function, the `Err` value must satisfy the condition.
   *
   * @param pred - The predicate to test the `Err`
   *
   * @example
   *
   * ```typescript
   * Ok(2).isErr()                          // => false
   * Ok(2).isErr((e) => e === 'hey')        // => false
   *
   * Err('hey').isErr() // => true
   * Err('howdy').isErr((e) => e === 'hey') // => false
   * Err('hey').isErr((e) => e === 'hey')   // => true
   * ```
   */
  isErr(_pred?: (val: E) => boolean): boolean {
    this.abstractMethod('isErr')
  }

  /**
   * Returns `true` if the result is `Err` and the value satisfies the condition of the
   * predicate function.
   *
   * @param pred - The predicate to test the `Err`
   *
   * @example
   *
   * ```typescript
   * Ok(2).isErrAnd((e) => e === 'hey')        // => false
   * Err('howdy').isErrAnd((e) => e === 'hey') // => false
   * Err('hey').isErrAnd((e) => e === 'hey')   // => true
   * ```
   *
   * @deprecated Use {@link Result#isErr} instead.
   */
  isErrAnd(pred: (val: E) => boolean): boolean {
    return this.isErr(pred)
  }

  /**
   * Maps a `Result<T, E>` to `Result<U, E>` by applying a function to
   * the `Ok` value, leaving an `Err` value untouched.
   *
   * @param fn - A function that maps `T` to `U`
   *
   * @example
   *
   * ```typescript
   * Ok(2).map((v) => v * 2)      // => Ok(4)
   * Err('hey').map((v) => v * 2) // => Err('hey')
   * ```
   */
  map<U>(_fn: (val: T) => U): Result<U, E> {
    this.abstractMethod('map')
  }

  /**
   * Runs a function over the `Ok` value, a default value, or a value computed over the
   * `Err` value.
   *
   * @remarks
   *
   * This function combines the Rust functions `Result.map_or` and `Reuslt.map_or_else`
   * and reverses the order of the parameters. That is, the Rust calls:
   *
   * ```rust
   * Ok(2).map_or(42, |v| v * 2) // => 4
   * Ok(2).map_or_else(|e| e.length, |v| v * 2) // => 4
   * ```
   *
   * Will be:
   *
   * ```typescript
   * Ok(2).mapOr((v) => v * 2, 42)              // => 4
   * Ok(2).mapOr((v) => v * 2, (e) => e.length) // => 4
   * ```
   *
   * @param fn - If `Ok`, will be run on the value, mapping `T` to `U`
   * @param defaultValue - If `Err` and a function, runs on the error, mapping `E` to `U`.
   *        If not a function, returns the value.
   * @typeParam U - The type of the new `Ok` value
   *
   * @example
   *
   * ```typescript
   * const k = 21
   *
   * Ok('foo').mapOr((v) => v.length, 42)  // => 3
   * Err('bar').mapOr((v) => v.length, 42) // => 42
   * Ok('foo').mapOr((v) => v.length, (e) => k * 2)  // => 3
   * Err('bar').mapOr((v) => v.length, (e) => k * 2) // => 42
   * ```
   *
   * @see {@link Result#mapOrElse}
   */
  mapOr<U>(_fn: (val: T) => U, _defaultValue: U | ((err: E) => U)): U {
    this.abstractMethod('mapOr')
  }

  /**
   * Maps a `Result<T, E>` to `U` by applying a fallback function `defaultFn` to
   * a `Err` value, or function `fn` to a `Ok` value.
   *
   * This function can be used to unpack a successful result while handling an
   * error.
   *
   * @remarks
   *
   * This function reverses the order of the parameters. That is, the Rust call:
   *
   * ```rust
   * Ok(2).map_or_else(|e| e.length, |v| v * 2) // => 4
   * ```
   *
   * Will be:
   *
   * ```typescript
   * Ok(2).mapOrElse((v) => v * 2, (e) => e.length) // => 4
   * ```
   *
   * @param fn - A function that maps `T` to `U` if `Ok`
   * @param defaultFn - The default value to return if `Err`
   * @typeParam U - The type of the new `Ok` value
   *
   * @example
   *
   * ```typescript
   * const k = 21
   *
   * Ok('foo').mapOrElse((v) => v.length, (e) => k * 2)  // => 3
   * Err('bar').mapOrElse((v) => v.length, (e) => k * 2) // => 42
   * ```
   *
   * @deprecated Use {@link Result#mapOr} instead.
   */
  mapOrElse<U>(fn: (val: T) => U, defaultFn: (val: E) => U): U {
    return this.mapOr(fn, defaultFn)
  }

  /**
   * Maps a `Result<T, E>` to `Result<T, F>` by applying a function to
   * a `Err`, leaving an `Ok` value untouched.
   *
   * This function can be used to pass through a successful result while
   * handling an error.
   *
   * @param fn - A function that maps `E` to `F` if `Err`
   * @typeParam F - The type of the new `Err` value
   *
   * @example
   *
   * ```typescript
   * Ok(2).mapErr((e) => new Error(`error code: ${e}`))   // => Ok(2)
   * Err(13).mapErr((e) => new Error(`error code: ${e}`)) // => Err('error code: 13')
   * ```
   */
  mapErr<F>(_fn: (val: E) => F): Result<T, F> {
    this.abstractMethod('mapErr')
  }

  /**
   * Calls the provided function with a reference to the `Ok` value (if
   * `Ok`). The `Result<T, E>` is returned unmodified.
   *
   * @param fn - The function to call.
   *
   * @remarks
   *
   * Renamed from `#inspect` because of conflicts with chaijs/loupe.
   *
   * @example
   *
   * ```typescript
   * Ok(2)
   *  .inspectOk((v) => console.log(`ok: ${v}`))
   *  .map((v) => v * v * v)
   * // => Ok(8)
   *
   * // console output: 'ok: 2'
   * ```
   */
  inspectOk(_fn: (val: T) => void): Result<T, E> {
    this.abstractMethod('inspectOk')
  }

  /**
   * Calls the provided function with a reference to the `Err` value (if
   * `Err`). The `Result<T, E>` is returned unmodified.
   *
   * @param fn - The function to call.
   *
   * @example
   *
   * ```typescript
   * Err('bar')
   *   .inspectErr((v) => console.log(`err: ${v}`))
   *   .map((v) => v * v * v)
   * // => Err('bar')
   *
   * // console output: 'err: bar'
   * ```
   */
  inspectErr(_fn: (val: E) => void): Result<T, E> {
    this.abstractMethod('inspectErr')
  }

  /**
   * Returns the `Ok` value or throws an exception if `Err`.
   *
   * Because this function may throw an exception, its use is discouraged.
   * Instead, prefer to use {@link Result#match} to handle the `Err` case
   * explicitly, or call {@link Result#unwrapOr} or {@link Result#unwrapOrElse}.
   *
   * @param message - The message to display before the error value in the
   *                  thrown exception if `Err`.
   * @param errorClass - The error class to use, defaulting to `Error`.
   *
   * @example
   *
   * ```typescript
   * try {
   *   Err('emergency failure').expect('Testing expect')
   * } catch (e) {
   *   console.log(e.message)
   *   // console output: 'Testing expect: emergency failure'
   * }
   * ```
   */
  expect(_message: string, _errorClass: ErrorClass = Error): T | never {
    this.abstractMethod('expect')
  }

  /**
   * Returns the `Ok` value, or throws an exception if `Err`.
   *
   * Because this function may throw an exception, its use is discouraged.
   * Instead, prefer to use {@link Result#match} to handle the `Err` case
   * explicitly, or call {@link Result#unwrapOr} or {@link Result#unwrapOrElse}.
   *
   * @param errorClass - The error class to use, defaulting to `ReferenceError`.
   *
   * @example
   *
   * ```typescript
   * try {
   *   Err('emergency failure').unwrap()
   * } catch (e) {
   *   console.log(e.message)
   *   // console output: 'Called Result#unwrap on an Err value: emergency failure'
   * }
   * ```
   */
  unwrap(_errorClass: ErrorClass = ReferenceError): T | never {
    this.abstractMethod('unwrap')
  }

  /**
   * Returns the `Err` value or throws an exception if `Ok`.
   *
   * Because this function may throw an exception. Prefer to use {@link
   * Result#match} to handle both the `Ok` and `Err` cases explicitly.
   *
   * @param message - The message to display before the error value in the
   *                  thrown exception if `Err`.
   * @param errorClass - The error class to use.
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
  expectErr(_message: string, _errorClass: ErrorClass = Error): E | never {
    this.abstractMethod('expectErr')
  }

  /**
   * Returns the `Err` value, or throws an exception if `Ok`.
   *
   * Because this function may throw an exception. Prefer to use {@link
   * Result#match} to handle both the `Ok` and `Err` cases explicitly.
   *
   * @param errorClass - The error class to use, defaulting to `ReferenceError`.
   *
   * @example
   *
   * ```typescript
   * try {
   *   Ok(10).unwrapErr()
   * } catch (e) {
   *   console.log(e.message)
   *   // console output: 'Called Result#unwrapErr on an Ok value: 10'
   * }
   * ```
   */
  unwrapErr(_errorClass: ErrorClass = ReferenceError): E | never {
    this.abstractMethod('unwrapErr')
  }

  /**
   * Returns the `Ok` value or a provided default value.
   *
   * @param defaultValue - The default value to return if `Err`
   *
   * @remarks
   *
   * This functions combines the Rust functions `Result.or` and `Result.or_else`. That is,
   * the Rust calls:
   *
   * ```rust
   * Ok(9).unwrap_or(42)                // => 9
   * Ok(9).unwrap_or_else(|e| e.length) // => 9
   * ```
   *
   * will be:
   *
   * ```typescript
   * Ok(9).unwrapOr(42)               // => 9
   * Ok(9).unwrapOr((e) => e.length)  // => 9
   * ```
   *
   * @example
   *
   * ```typescript
   * Ok(9).unwrapOr(42)                   // => 9
   * Err('error').unwrapOr(42)            // => 42
   * Ok(9).unwrapOr((e) => e.length)      // => 9
   * Err('foo').unwrapOr((e) => e.length) // => 3
   * ```
   */
  unwrapOr(_defaultValue: T | ((err: E) => T)): T {
    this.abstractMethod('unwrapOr')
  }

  /**
   * Returns the `Ok` value or computes it from a provided function
   * that transforms the `Err` value.
   *
   * @param fn - The function to transform `Err` to the default value
   *
   * @example
   *
   * ```typescript
   * Ok(9).unwrapOrElse((e) => e.length)       // => 9
   * Err('foo').unwrapOrElse((e) => e.length) // => 3
   * ```
   *
   * @deprecated Use {@link Result#unwrapOr} instead.
   */
  unwrapOrElse(fn: (val: E) => T): T {
    return this.unwrapOr(fn)
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
  and<U>(_result: Result<U, E>): Result<U, E> {
    this.abstractMethod('and')
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
  andThen<U>(_fn: (val: T) => Result<U, E>): Result<U, E> {
    this.abstractMethod('andThen')
  }

  /**
   * Returns `Result<T, F>` if `Err` and the current value if `Ok`.
   *
   * @example
   *
   * ```typescript
   * Ok(2).or(Err('not a 2'))                // => Ok(2)
   * Ok(2).or(Ok('different ok'))            // => Ok(2)
   * Err('not a 2').or(Ok('different ok'))   // => Ok('different ok')
   * Err('not a 2').or(Err('different err')) // => Err('different err')
   * ```
   */
  or<F>(_result: Result<T, F>): Result<T, F> {
    this.abstractMethod('or')
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
   * Err(2).orElse(squaredString).unwrap()    // => '4'
   * Ok(10).orElse(squaredString).unwrapErr() // => 'overflowed'
   * ```
   */
  orElse<F>(_fn: (val: E) => Result<T, F>): Result<T, F> {
    this.abstractMethod('orElse')
  }

  /**
   * Calls `matcher.ok` if `Ok` or `matcher.err` if `Err`.
   *
   * This is *roughly* equivalent to calling {@link Result#andThen} followed by {@link
   * Result#orElse}.
   *
   * @example
   *
   * ```typescript
   * Ok(10).match({ ok: (v) v * v, err: (_e) => 0 })          // => 100
   * Err('overflow').match({ ok: (v) v * v, err: (_e) => 0 }) // => 0
   * ```
   *
   * @remarks
   *
   * For reasons mostly related to how Typescript inference works, this module is not
   * implemented in terms of `match`, but *it could be*. That is, `andThen` could be:
   *
   * ```typescript
   * const andThen = <T, E, U>(result: Result<T, E>, fn: (T) => Result<U, E>) => {
   *    return result.match({
   *      ok: (t: T) => fn(t)
   *      err: (e: E) => Err(e) // or `result`
   *    })
   * }
   * ```
   */
  match<U>(_matcher: { ok: (t: T) => U; err: (e: E) => U }): U {
    this.abstractMethod('match')
  }

  private abstractMethod(method: string): never {
    throw new Error(`Abstract method Result#${method}`)
  }
}

class OkResult<T, E> extends Result<T, E> {
  private readonly ok: T

  constructor(ok: T) {
    super()
    this.ok = ok
  }

  isOk(pred?: (val: T) => boolean): boolean {
    return pred ? pred(this.ok) : true
  }

  isErr(_pred?: (val: E) => boolean): boolean {
    return false
  }

  map<U>(fn: (val: T) => U): Result<U, E> {
    return Ok(fn(this.ok))
  }

  mapOr<U>(fn: (val: T) => U, _defaultValue: U | ((err: E) => U)): U {
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

  expect(_message: string, _errorClass: ErrorClass = Error): T {
    return this.ok
  }

  unwrap(_errorClass: ErrorClass = ReferenceError): T | never {
    return this.ok
  }

  expectErr(message: string, errorClass: ErrorClass = Error): never {
    return unwrapFailed(message, this.ok, errorClass)
  }

  unwrapErr(errorClass: ErrorClass = ReferenceError): never {
    return unwrapFailed('Called Result#unwrapErr on an Ok value', this.ok, errorClass)
  }

  unwrapOr(_defaultValue: T | ((err: E) => T)): T {
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

  match<U>(matcher: { ok: (t: T) => U; err: (e: E) => U }): U {
    return matcher.ok(this.ok)
  }
}

class ErrResult<T, E> extends Result<T, E> {
  private readonly err: E

  constructor(err: E) {
    super()
    this.err = err
  }

  isOk(_pred: (val: T) => boolean): boolean {
    return false
  }

  isErr(pred: (val: E) => boolean): boolean {
    return pred ? pred(this.err) : true
  }

  map<U>(_fn: (val: T) => U): Result<U, E> {
    return Err(this.err)
  }

  mapOr<U>(_fn: (val: T) => U, defaultValue: U | ((err: E) => U)): U {
    const isFunction = (value: U | ((err: E) => U)): value is (err: E) => U =>
      typeof value === 'function'

    return isFunction(defaultValue) ? defaultValue(this.err) : defaultValue
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

  expect(message: string, errorClass: ErrorClass = Error): never {
    return unwrapFailed(message, this.err, errorClass)
  }

  unwrap(errorClass: ErrorClass = ReferenceError): never {
    return unwrapFailed('Called Result#unwrap on an Err value', this.err, errorClass)
  }

  expectErr(_message: string, _errorClass: ErrorClass = Error): E {
    return this.err
  }

  unwrapErr(_errorClass: ErrorClass = ReferenceError): E | never {
    return this.err
  }

  unwrapOr(defaultValue: T | ((err: E) => T)): T {
    const isFunction = (value: T | ((err: E) => T)): value is (err: E) => T =>
      typeof value === 'function'

    return isFunction(defaultValue) ? defaultValue(this.err) : defaultValue
  }

  unwrapOrElse(fn: (val: E) => T): T {
    return fn(this.err)
  }

  and<U>(_result: Result<U, E>): Result<U, E> {
    return Err(this.err)
  }

  andThen<U>(_fn: (val: T) => Result<U, E>): Result<U, E> {
    return Err(this.err)
  }

  or<F>(result: Result<T, F>): Result<T, F> {
    return result
  }

  orElse<F>(fn: (val: E) => Result<T, F>): Result<T, F> {
    return fn(this.err)
  }

  match<U>(matcher: { ok: (t: T) => U; err: (e: E) => U }): U {
    return matcher.err(this.err)
  }
}

/**
 * @categoryDescription `Result`
 *
 * {@link Result} describes what can be done with a `Result` type, and {@link Ok} and
 * {@link Err} create `Ok` or `Err` results, respectively.
 *
 * @module
 */

/**
 * Constructs an `Ok` {@link Result}.
 *
 * @param ok - The value of type `T` to store.
 * @typeParam T - The type of the `Ok` value.
 * @typeParam E - The type of the `Err` value.
 * @category `Result`
 */
export const Ok = <T, E>(ok: T): Result<T, E> => new OkResult<T, E>(ok)

/**
 * Constructs an `Err` {@link Result}.
 *
 * @param err - The value of type `E` to store.
 * @typeParam T - The type of the `Ok` value.
 * @typeParam E - The type of the `Err` value.
 * @category `Result`
 */
export const Err = <T, E>(err: E): Result<T, E> => new ErrResult<T, E>(err)

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
 * flattenResult(Ok(Err(5)))      // => Err(5)
 * ```
 *
 * @category `Result` Operators
 */
export const flattenResult = <T, E>(value: Result<Result<T, E>, E>): Result<T, E> => {
  return value.isOk() ? value.unwrap() : Err(value.unwrapErr())
}

/**
 * Returns true if the `result` is an `Ok`.
 *
 * @param value - `Result` to test.
 * @typeParam T - The type of the `Ok` value.
 * @typeParam E - The type of the `Err` value.
 *
 * @example
 *
 * ```typescript
 * isOk(Ok('hello')) // => true
 * isOk(Err(5))      // => false
 * ```
 *
 * @category `Result` Operators
 */
export const isOk = <T, E>(value: Result<Result<T, E>, E>): boolean => value.isOk()

/**
 * Returns true if the `result` is an `Ok`.
 *
 * @param value - `Result` to test.
 * @typeParam T - The type of the `Ok` value.
 * @typeParam E - The type of the `Err` value.
 *
 * @example
 *
 * ```typescript
 * isErr(Ok('hello')) // => false
 * isErr(Err(5))      // => true
 * ```
 *
 * @category `Result` Operators
 */
export const isErr = <T, E>(value: Result<Result<T, E>, E>): boolean => value.isErr()

/**
 * @categoryDescription `Result` List Operators
 *
 * Operations on lists (arrays) of `Result`s. These allow the safe unwrapping of `Ok` or
 * `Err` results from an array while ignoring the cases which would cause a panic.
 *
 * @module
 */

/**
 * Unwraps all `Err` values from an array of {@link Result}s.
 *
 * `Ok` values in the array are ignored.
 *
 * @param results - The array of `Result<any, any>` objects to filter and unwrap.
 * @typeParam L - A array of `Result<any, any>`.
 * @returns The array of `Err` results from `results`.
 *
 * @remarks
 *
 * This may return a mixed type `Err` list and it is the responsibility of the caller to
 * handle this.
 *
 * @category `Result` List Operators
 */
// biome-ignore lint/suspicious/noExplicitAny: insufficient inference
export const unwrapErrs = <L extends Result<any, any>[]>(
  results: L,
): InferErr<L[number]>[] => results.filter((v) => v.isErr()).map((v) => v.unwrapErr())

/**
 * Unwraps all `Err` values from an array of {@link Result}s.
 *
 * `Ok` values in the array are ignored.
 *
 * @param results - The array of `Result<any, any>` objects to filter and unwrap.
 * @typeParam L - A array of `Result<any, any>`.
 * @returns The array of `Err` results from `results`.
 *
 * @remarks
 *
 * This may return a mixed type `Err` list and it is the responsibility of the caller to
 * handle this.
 *
 * @category `Result` List Operators
 *
 * @deprecated Use {@link unwrapErrs} instead.
 */
export const unwrapErrors = unwrapErrs

/**
 * Throws an exception if there are any `Err` values in the array of {@link Result}s.
 *
 * The exception message is constructed from string representation of all `Err` values in
 * the list. If `message` is not provided, it defaults to `Errors found`.
 *
 * The exception is created from `errorClass`.
 *
 * @param results - The list of `Result` objects to unwrap.
 * @param message - The message to prepend to the list of errors.
 * @param errorClass - The error class to use, defaulting to `Error`.
 * @typeParam L - A array of `Result<any, any>`.
 *
 * @category `Result` List Operators
 */
// biome-ignore lint/suspicious/noExplicitAny: insufficient inferene
export const throwErrs = <L extends Result<any, any>[]>(
  results: L,
  message?: string,
  errorClass: ErrorClass = Error,
): void => {
  const errors = unwrapErrs(results)

  if (errors.length > 0) {
    const msg =
      message == null
        ? 'Errors found:\n'
        : message.length === 0
          ? ''
          : message.endsWith(':')
            ? `${message}\n`
            : `${message}:\n`

    throw new errorClass(`${msg}${errors.map((e) => ` - ${e}`).join('\n')}`)
  }
}

/**
 * Throws an exception if there are any `Err` values in the array of {@link Result}s.
 *
 * The exception message is constructed from string representation of all `Err` values in
 * the list. If `message` is not provided, it defaults to `Errors found`.
 *
 * The exception is created from `errorClass`.
 *
 * @param results - The list of `Result` objects to unwrap.
 * @param message - The message to prepend to the list of errors.
 * @param errorClass - The error class to use, defaulting to `Error`.
 * @typeParam L - A array of `Result<any, any>`.
 *
 * @category `Result` List Operators
 *
 * @deprecated Use {@link throwErrs} instead.
 */
export const unwrapAndThrowErrors = throwErrs

/**
 * Unwraps all `Ok` values from an array of {@link Result}s.
 *
 * `Err` values in the array are ignored.
 *
 * @param results - The array of `Result<any, any>` objects to filter and unwrap.
 * @typeParam L - A array of `Result<any, any>`.
 * @returns The array of `Ok` results from `results`.
 *
 * @remarks
 *
 * This may return a mixed type `Ok` list and it is the responsibility of the caller to
 * handle this.
 *
 * @category `Result` List Operators
 */
// biome-ignore lint/suspicious/noExplicitAny: insufficient inferene
export const unwrapOks = <L extends Result<any, any>[]>(
  results: L,
): InferOk<L[number]>[] => results.filter((v) => v.isOk()).map((v) => v.unwrap())

/**
 * Unwraps all `Ok` values from an array of {@link Result}s.
 *
 * `Err` values in the array are ignored.
 *
 * @param results - The array of `Result<any, any>` objects to filter and unwrap.
 * @typeParam L - A array of `Result<any, any>`.
 * @returns The array of `Ok` results from `results`.
 *
 * @remarks
 *
 * This may return a mixed type `Ok` list and it is the responsibility of the caller to
 * handle this.
 *
 * @category `Result` List Operators
 * @deprecated Use {@link unwrapOks} instead.
 */
export const unwrapResults = unwrapOks

type InferOk<R> = R extends Result<infer T, unknown> ? T : never
type InferErr<R> = R extends Result<unknown, infer E> ? E : never

type ErrorClass = new (message?: string) => Error

const unwrapFailed = <E>(message: string, err: E, errorClass: ErrorClass): never => {
  throw new errorClass(`${message}: ${err}`)
}
