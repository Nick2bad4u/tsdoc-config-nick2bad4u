# tsdoc-config-nick2bad4u

[![npm license.](https://flat.badgen.net/npm/license/tsdoc-config-nick2bad4u?color=purple)](https://github.com/Nick2bad4u/tsdoc-config-nick2bad4u/blob/main/LICENSE) [![npm total downloads.](https://flat.badgen.net/npm/dt/tsdoc-config-nick2bad4u?color=pink)](https://www.npmjs.com/package/tsdoc-config-nick2bad4u) [![latest GitHub release.](https://flat.badgen.net/github/release/Nick2bad4u/tsdoc-config-nick2bad4u?color=cyan)](https://github.com/Nick2bad4u/tsdoc-config-nick2bad4u/releases) [![GitHub stars.](https://flat.badgen.net/github/stars/Nick2bad4u/tsdoc-config-nick2bad4u?color=yellow)](https://github.com/Nick2bad4u/tsdoc-config-nick2bad4u/stargazers) [![GitHub forks.](https://flat.badgen.net/github/forks/Nick2bad4u/tsdoc-config-nick2bad4u?color=green)](https://github.com/Nick2bad4u/tsdoc-config-nick2bad4u/forks) [![GitHub open issues.](https://flat.badgen.net/github/open-issues/Nick2bad4u/tsdoc-config-nick2bad4u?color=red)](https://github.com/Nick2bad4u/tsdoc-config-nick2bad4u/issues) [![codecov.](https://flat.badgen.net/codecov/github/Nick2bad4u/tsdoc-config-nick2bad4u?color=blue)](https://codecov.io/gh/Nick2bad4u/tsdoc-config-nick2bad4u)

Shared TSDoc configuration for Nick2bad4u TypeScript projects.

This package publishes a raw `tsdoc.json` that can be extended by tools using
`@microsoft/tsdoc-config` resolution. It keeps the standard TSDoc tag set
enabled and layers TypeDoc's documented tag definitions on top.

## Install

```sh
npm install --save-dev tsdoc-config-nick2bad4u @microsoft/tsdoc-config
```

This shared config depends on TypeDoc so TypeDoc's packaged `typedoc/tsdoc.json`
resolves for ESLint-only consumers too. Install TypeDoc directly in the
consuming project only when that project invokes the TypeDoc CLI.

## Usage

Create or update `tsdoc.json` in the consuming package:

```json
{
 "$schema": "https://developer.microsoft.com/json-schemas/tsdoc/v0/tsdoc.schema.json",
 "extends": ["tsdoc-config-nick2bad4u/tsdoc.json"]
}
```

Tools that load TSDoc configuration from the project root will resolve the
package path through the native `extends` mechanism.

## Included Tags

The effective parser configuration includes:

- Standard TSDoc tags from `@microsoft/tsdoc`, including `@param`,
  `@typeParam`, `@returns`, `@remarks`, `@defaultValue`, `@deprecated`,
  `@alpha`, `@beta`, `@sealed`, `@override`, and `@link`.
- TypeDoc tags from `typedoc/tsdoc.json`, including `@category`, `@group`,
  `@hidden`, `@private`, `@protected`, `@module`, `@linkcode`, `@linkplain`,
  and related TypeDoc documentation controls.

No custom parser wrapper is required.

## Package Exports

- `tsdoc-config-nick2bad4u/tsdoc.json` - the shared config file consumers
  should extend.
- `tsdoc-config-nick2bad4u` - a small ESM helper that exports
  `packageName`, `configFileName`, `configPath`, and `resolveConfigPath()`.
- `tsdoc-config-nick2bad4u/package.json` - package metadata for tooling.

## Verification

```sh
npm run release:verify
npm run coverage
```

The release gate builds the package, runs ESLint, typechecks every local
TypeScript config, runs Vitest, checks formatting, validates package metadata,
and runs secret scanning. Coverage is held to 100% in `vite.config.ts` and
Codecov.

## License

MIT
