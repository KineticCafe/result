# @kineticcafe/result

- code :: https://github.com/KineticCafe/result/tree/main/
- issues :: https://github.com/KineticCafe/result/issues

## Description

@kineticcafe/result is another [`Result` type][wiki] implementation for
Typescript, loosely based on Rust's [std::result][] type.

`Result` types contain a value or possible error and should be used to return
different types for success and failure without using exceptions for normal flow
control. As the values in `Result`s are not directly accessible, there is
explicit error handling at the point of use, through matching (`Result#match`),
transformation (`Result#andThen`, `Result#orElse`), unwrapping (`Result#unwrap`,
`Result#unwrapErr`), mapping (`Result#map`, `Result#mapErr`), or propagation
(returning the result to callers).

The @kineticcafe/result library additionally offers some utilities for dealing
with arrays of `Result` types.

## Synopsis

```javascript
import { Ok, Err } from '@kineticcafe/result'

Ok(3) // A successful result
Err('error') // A likely error
```

## Installation

`@kineticcafe/result` should be added to your list of dependencies in
`package.json`.

```sh
npm add @kineticcafe/result@^0.6
```

## Semantic Versioning

`@kineticcafe/result` uses a [Semantic Versioning][] scheme with one significant
change:

- When PATCH is zero (`0`), it will be omitted from version references.

## Contributing

@kineticcafe/result [welcomes contributions][]. This project, like all Kinetic
Commerce [open source projects][], is under the Kinetic Commerce Open Source
[Code of Conduct][].

This project is licensed under the Apache Licence, version 2.0 and requires
certification via a Developer Certificate of Origin. See [Licence.md][] for more
details.

[welcomes contributions]: https://github.com/KineticCafe/result/blob/main/Contributing.md
[code of conduct]: https://github.com/KineticCafe/code-of-conduct
[open source projects]: https://github.com/KineticCafe
[semantic versioning]: http://semver.org/
[licence.md]: https://github.com/KineticCafe/result/blob/main/Licence.md
[std::result]: https://doc.rust-lang.org/std/result/index.html
[wiki]: https://en.wikipedia.org/wiki/Result_type
