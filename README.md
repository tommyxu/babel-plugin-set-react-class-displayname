# babel-plugin-set-react-class-displayname

Babel plugin that adds class name as static property `displayName`.

## Disclaimer:

This project directly introduces the code from following git repositories:

* Krizzu/babel-plugin-transform-react-class-displayname
* opbeat/babel-plugin-add-react-displayname


## What it does

1. Detect the class declaration or class expression which has render() method (considering it as `React.Component`)
2. Add `displayName` class property (static property) on it.

Nothing else.

## Updates

1.0.2 Accept a merge request to support anonymous class (`const A = class extends Component { ... }`). The displayName is set to `AnonymousClass`. Here's the original comment from the contributor:
> I personally find useful AnonymousClass as a hint rather than no displayName which then gets mangled when minifying the source. 

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
