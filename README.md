# tsdoc-config-nick2bad4u

[![CI](https://github.com/Nick2bad4u/tsdoc-config-nick2bad4u/actions/workflows/ci.yml/badge.svg)](https://github.com/Nick2bad4u/tsdoc-config-nick2bad4u/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/tsdoc-config-nick2bad4u.svg)](https://www.npmjs.com/package/tsdoc-config-nick2bad4u)

Shared TSDoc config for Nick2bad4u TypeScript projects.

## Install

```sh
npm install --save-dev tsdoc-config-nick2bad4u
```

## Usage

Create `tsdoc.json`:

```json
{
 "$schema": "https://developer.microsoft.com/json-schemas/tsdoc/v0/tsdoc.schema.json",
 "extends": ["tsdoc-config-nick2bad4u/tsdoc.json"]
}
```

## Verification

```sh
npm run release:verify
```
