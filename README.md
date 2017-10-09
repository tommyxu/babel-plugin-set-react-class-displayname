# babel-plugin-set-react-class-displayname

Babel plugin that injects class-name as `displayName` property.

Disclaimer:

This project directly introduces the code from following git repositories:

* Krizzu/babel-plugin-transform-react-class-displayname
* opbeat/babel-plugin-add-react-displayname


## What it does

1. Detect the class declaration or class expression which has render() method (considering it as `React.Component`)
2. Add `displayName` class property (static property) on it.


## Install:

```
  npm i -D babel-plugin-set-react-class-displayname
```

or

```
  yarn add --dev babel-plugin-set-react-class-displayname
```

## Usage:

via `.babelrc` or `webpack`

```
{
   "plugins": ["set-react-class-displayname"],
}
```

via `cli`

```
babel --plugins set-react-class-displayname script.js
```

Note:

If You want to use this plugin with `es2015` preset, you need to install [transform class properties plugin](https://babeljs.io/docs/plugins/transform-class-properties/)

```
plugins: ['transform-class-properties']
```

## Example:

In:

```
  const component = class Class1 extends React.Component {
    render() {
      // ...
    }

  };

  class Class2 extends React.Component {
    render() {
      // ...
    }
  }
```

Out:

```
  const component = class Class1 {
    static displayName = "Class1";
  };

  class Class2 {
    static displayName = "Class2";
  }
```
