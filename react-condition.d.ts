export function If(props: {
  test: any;
  children: JSX.Element;
}): JSX.Element;

export function ElseIf(props: {
  test: any;
  children: JSX.Element;
}): JSX.Element;

export function Else(props: { children: JSX.Element }): JSX.Element;

export function Switch(props: {
  expression: any;
  children: Case | Default | null;
}): JSX.Element;

export function Case(props: {
  value: any;
  children: JSX.Element;
}): JSX.Element;

type Default = (props: {children: JSX.Element}) => JSX.Element

type Case = (props: {
  value: any,
  children: JSX.Element
}) => JSX.Element

export function Default(props: { children: JSX.Element }): JSX.Element;
