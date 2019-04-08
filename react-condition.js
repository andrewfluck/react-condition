var React,
  { Children, createElement, useState } = require("react");

/**
 * Use the `test` prop with `<If>` and `<ElseIf>` elements to conditionally
 * include certain elements. When an `<If>` test is _truthy_ it does not
 * render any `<ElseIf>` or `<Else>` children. However when it is _falsey_ it
 * _only_ renders `<ElseIf>` and `<Else>` children.
 *
 *   <If test={someCondition}>
 *     This will only be shown if someCondition is truthy.
 *     <ElseIf test={otherCondition}>
 *       This will only be shown if someCondition is falsey
 *       and otherCondition is truthy.
 *       <Else>
 *         This will only be shown if both someCondition and
 *         otherCondition are both falsey.
 *       </Else>
 *     </ElseIf>
 *     <Else>
 *       This will be shown if someCondition is falsey.
 *       <If test={finalCondition}>
 *         This will be shown if someCondition is falsey
 *         and finalCondition is truthy.
 *       </If>
 *     </Else>
 *   </If>
 *
 * Alternatively, you can provide `then` and `else` props.
 *
 *  <If
 *   test={someCondition}
 *   then={'This will only be shown if someCondition is truthy.'}
 *   else={'This will be shown if someCondition is falsey.'}
 * />
 *
 */
function If(props) {
  var hasTest = props.hasOwnProperty("test");
  if (!hasTest && !props.hasOwnProperty("case")) {
    throw new TypeError("<If> requires a `test` prop.");
  }
  var condition = Boolean(hasTest ? props.test : props.case);
  var hasElse = props.hasOwnProperty("else");
  var hasThen = props.hasOwnProperty("then");
  if (hasElse && !hasThen) {
    throw new TypeError("<If> only use `else` prop alongside `then` prop.");
  }
  if ((hasThen ^ props.hasOwnProperty("children")) === 0) {
    throw new TypeError("<If> expects either a `then` prop or children.");
  }
  if (hasThen) {
    return condition ? props.then : hasElse ? props.else : null;
  }
  return Children.map(props.children, function(child) {
    var isElse = child.type === Else || child.type === ElseIf;
    return condition !== isElse ? child : null;
  });
}

function Else(props) {
  return props.children;
}

function ElseIf(props) {
  return createElement(If, props);
}

function Switch(props) {
  var match = null;
  var count = Children.count(props.children);

  var hasExpression = props.hasOwnProperty("expression");
  if (!hasExpression) {
    throw new TypeError("<Switch> requires an `expression` prop.");
  }

  Children.forEach(props.children, (child, i) => {
    if (match) return;

    if (i + 1 === count) {
      if (child.type === Default) {
        match = child;
      }
    } else {
      if (child.type === Default) {
        throw new TypeError(
          "<Default> is required to be the last node if present."
        );
      }
    }

    child.props.value === props.expression ? (match = child) : null;
  });

  return match;
}

function Case(props) {
  var hasValue = props.hasOwnProperty("value");
  var hasThen = props.hasOwnProperty("then");

  if (!hasValue) {
    throw new TypeError("<Case> requires an `value` prop.");
  }

  if ((hasThen ^ props.hasOwnProperty("children")) === 0) {
    throw new TypeError("<Case> expects either a `then` prop or children.");
  }

  return props.then || props.children;
}

function Default(props) {
  var hasThen = props.hasOwnProperty("then");

  if ((hasThen ^ props.hasOwnProperty("children")) === 0) {
    throw new TypeError("<Case> expects either a `then` prop or children.");
  }

  return props.then || props.children;
}

Object.defineProperties(exports, {
  If: { enumerable: true, value: If },
  Else: { enumerable: true, value: Else },
  ElseIf: { enumerable: true, value: ElseIf },
  Switch: { enumerable: true, value: Switch },
  Case: { enumerable: true, value: Case },
  Default: { enumerable: true, value: Default },
  __esModule: { value: true }
});
