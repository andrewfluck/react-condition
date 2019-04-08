# React Condition
[![Build Status](https://travis-ci.org/andrewfluck/react-condition.svg?branch=master)](https://travis-ci.org/andrewfluck/react-condition)

React Condition works with React Hooks as part of [@leebyron](https://github.com/leebyron)'s React Velcro architecture

# Installation

```sh
$ yarn add react-condition
```

```sh
$ npm i react-condition
```

## If conditions

Use the `test` prop with `<If>` and `<ElseIf>` elements to conditionally include certain elements. When an `<If>` test is _truthy_ it does not render any `<ElseIf>` or `<Else>` children. However when it is _falsey_ it _only_ renders `<ElseIf>` and `<Else>` children.

```js
<If test={someCondition}>
  This will only be shown if someCondition is truthy.
  <ElseIf test={otherCondition}>
    This will only be shown if someCondition is falsey
    and otherCondition is truthy.
    <Else>
      This will only be shown if both someCondition and
      otherCondition are both falsey.
    </Else>
  </ElseIf>
  <Else>
    This will be shown if someCondition is falsey.
    <If test={finalCondition}>
      This will be shown if someCondition is falsey
      and finalCondition is truthy.
    </If>
  </Else>
</If>
```

Alternatively, you can provide `then` and `else` props.

```js
<If
  test={someCondition}
  then={"This will only be shown if someCondition is truthy."}
  else={"This will be shown if someCondition is falsey."}
/>
```

## Switch conditions

Use the `expression` prop with `<Switch>` element to conditionally include certain elements. When an `<Switch>` compares a value from `<Case>` and the comparison is _truthy_ it _only_ renders the matching child.  However, when the comparison is _falsey_ it continues through the children until it finds a match, or falls back to `<Default>`.

```js
<Switch expression={"blue"}>
    <Case value={"red"}>
        red
    </Case>
    <Case value={"green"}>
        green
    </Case>
    <Case value={"blue"}>
        blue
    </Case>
</Switch>
```

```js
<Switch expression={"hot fucking pink"}>
    <Case value={"red"}>
        red
    </Case>
    <Case value={"green"}>
        green
    </Case>
    <Case value={"blue"}>
        blue
    </Case>
    <Default>
        no color
    </Default>
</Switch>
```

Alternatively, you can provide `then` as props to `<Case>` or `<Default>`

```js
<Switch expression={"hot fucking pink"}>
    <Case value={"red"} then={"red"} />
    <Case value={"red"} then={"green"} />
    <Case value={"red"} then={"blue"} />
    <Default then={"no color"} />
</Switch>
```

## See also

[@leebyron/react-loops](https://github.com/leebyron/react-loops) - The father (or mother, idfk) of this library
