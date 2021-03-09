declare module '*.png' {
  const content: string;
  export const ReactComponent: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export const ReactComponent: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
