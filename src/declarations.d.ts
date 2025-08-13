// src/declarations.d.ts

// For SCSS modules
declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

// For SVG files
declare module '*.svg' {
  const content: any;
  export default content;
}
