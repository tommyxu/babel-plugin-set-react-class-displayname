module.exports = function myPlugin({ types: t }) {
  const addDisplayName = name => t.classProperty(
      t.identifier('displayName'),
      t.stringLiteral(name),
      null,
      null,
      false
  );

  function hasRenderMethod(path) {
    if(!path.node.body) {
      return false;
    }
    var members = path.node.body;
    for(var i = 0; i < members.length; i++) {
      if (members[i].type === 'ClassMethod' && members[i].key.name === 'render') {
        return true;
      }
    }
    return false;
  }

  const visitorClassBody = (path, className) => {
    const length = path.node.body.length;
    let added = false;

    if (!(className && hasRenderMethod(path))) {
      return;
    }
    // console.log('component detected. apply static "displayName" if possible: ' + className);

    for (let i = 0; i < length; i++) {
      if (t.isClassProperty(path.node.body[i])) {
        const key = path.node.body[i].key;
        if (t.isIdentifier(key, { name: 'displayName' }) && !added) {
          added = true;
        }
      }
    }
    if (!added && className) {
      const node = addDisplayName(className);
      path.unshiftContainer('body', node);
      path.get('body.0').node.static = true;
    }
  };

  const classVisitor = {
    ClassDeclaration(path) {
      const pathBody = path.get('body');
      visitorClassBody(pathBody, path.node.id.name);
    },
    ClassExpression(path) {
      const pathBody = path.get('body');
      visitorClassBody(pathBody, path.node.id.name);
    },
  };

  return {
    visitor: {
      Program(path) {
        path.traverse(classVisitor);
      },
    },
  };
};
