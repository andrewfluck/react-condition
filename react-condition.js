var React = require('react');

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
    var hasTest = props.hasOwnProperty('test');
    if (!hasTest && !props.hasOwnProperty('case')) {
        throw new TypeError('<If> requires a `test` prop.');
    }
    var condition = Boolean(hasTest ? props.test : props.case);
    var hasElse = props.hasOwnProperty('else');
    var hasThen = props.hasOwnProperty('then');
    if (hasElse && !hasThen) {
        throw new TypeError('<If> only use `else` prop alongside `then` prop.');
    }
    if ((hasThen ^ props.hasOwnProperty('children')) === 0) {
        throw new TypeError('<If> expects either a `then` prop or children.');
    }
    if (hasThen) {
        return condition ? props.then : hasElse ? props.else : null;
    }
    return React.Children.map(props.children, function (child) {
        var isElse = child.type === Else || child.type === ElseIf;
        return condition !== isElse ? child : null;
    });
}

function Else(props) {
    return props.children;
}

function ElseIf(props) {
    return React.createElement(If, props);
}

Object.defineProperties(exports, {
    If: { enumerable: true, value: If },
    Else: { enumerable: true, value: Else },
    ElseIf: { enumerable: true, value: ElseIf },
    __esModule: { value: true }
});