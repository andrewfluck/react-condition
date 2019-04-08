///<reference types="react"/>

export function If(props: {
  test: any;
  children: React.ReactNode;
}): React.ReactNode;

export function ElseIf(props: {
  test: any;
  children: React.ReactNode;
}): React.ReactNode;

export function Else(props: { children: React.ReactNode }): React.ReactNode;

export function Switch(props: {
  expression: any;
  children: Case | Default | null;
}): React.ReactNode;

export function Case(props: {
  value: any;
  children: React.ReactNode;
}): React.ReactNode;

export function Default(props: { children: React.ReactNode }): React.ReactNode;
