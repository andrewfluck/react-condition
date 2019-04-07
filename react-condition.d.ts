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
