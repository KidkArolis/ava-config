# ava-config

If you're using the [config](https://github.com/lorenwest/node-config) package in your project, you might have run into an issue with [ava](https://github.com/sindresorhus/ava) where your config is not required from the right directory, due to how `ava` is changing `process.cwd` to be the dir of each test.

Prerequiring this package will automagically set `NODE_ENV=test` and `NODE_CONFIG_DIR=closest/config/default.yml`

## Usage

  $ npm install --save-dev ava-config

Add to your `package.json`

```js
  {
    ...
    "ava": {
      "require": [
        "ava-config"
      ]
    }
  }
```
