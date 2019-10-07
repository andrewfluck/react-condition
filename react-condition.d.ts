declare module "react-condition" {
  export function If(props: { test: any; children: Children }): JSX.Element;

  export function ElseIf(props: { test: any; children: Children }): JSX.Element;

  export function Else(props: { children: Children }): JSX.Element;

  export function Switch(props: {
    expression: any;
    children: Case | Default | null;
  }): JSX.Element;

  export function Case(props: { value: any; children: Children }): JSX.Element;

  type Default = (props: { children: Children }) => JSX.Element;

  type Case = (props: { value: any; children: Children }) => JSX.Element;

  type Children = Array<JSX.Element> | JSX.Element;

  export function Default(props: { children: Children }): JSX.Element;
}
