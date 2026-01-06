# @kineticcafe/result

## 0.6.3 / 2026-01-5

- Dependency updates.

## 0.6.2 / 2025-03-01

- Dependency updates.

## 0.6.1 / 2024-03-05

- Renamed `unwrapErrors` to `unwrapErrs`, `unwrapAndThrowErrors` to `throwErrs`,
  and `unwrapResults` to `unwrapOks`. Despite the suggestion inherent in the
  name, an `Err` is not _necessarily_ an error, and they not related to the
  `Error` exception class. The old names are deprecated and will be removed for
  1.0.

  The implementation for the old and new names is identical (they are documented
  alias constants).

- Improved the typings of `unwrapErrs` and `unwrapOks` so that it is clear that
  both the input and output arrays may contain heterogeneous types. This
  involved the use of some explicit `any` typing, but testing in the Typescript
  playground suggests that the internal utility types `InferErr` and `InferOk`
  cause Typescript to properly resolve disparate types.

- Ensured that `new Result()` throws an exception; the only way to instantiate a
  `Result` is through `Ok` or `Err`, which construct internal (non-exported)
  `OkResult` and `ErrResult` classes.

  - Unbound methods from `Result.prototype` throw better exceptions when
    rebound.

- Deprecated `Result#isOkAnd` and `Result#isErrAnd` in favour of `Result#isOk`
  and `Result#isErr` with an optional predicate.

- Deprecated `Result#mapOrElse` in favour of `Result#mapOr` where the provided
  default can either be a value or a function that returns a value.

- Deprecated `Result#unwrapOrElse` in favour of `Result#unwrapOr` where the
  provided default can either be a value or a function that returns a value.

- Improved documentation.

- Fixed GitHub pages deploy: This has been adapted from the "Jekyll" workflow
  that GitHub proposes.

## 0.5.0 / 2024-02-27

- Initial release. The APIs are heavily based on the Rust interface, but it does
  not feel entirely correct for JavaScript / Typescript APIs. Until the final
  shape of the APIs have been resolved, this is considered a pre-release
  version.
