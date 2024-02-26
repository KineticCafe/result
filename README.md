# @kineticcafe/result

- code :: https://github.com/KineticCafe/result/tree/main/
- issues :: https://github.com/KineticCafe/result/issues

## Description

@kineticcafe/result is another Typescript implementation of the Rust `Result`
type.

## Synopsis

```javascript
import { Ok, Err } from '@kineticcafe/result'

Ok(3) // A successful result
Err('error') // An error
```

## Installation

`@kineticcafe/result` should be added to your list of dependencies in
`package.json`.

```sh
npm add @kineticcafe/result@^0.5
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
