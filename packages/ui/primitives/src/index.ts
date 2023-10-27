/// <reference types="styled-jsx" />

/**
 * Only re-export very simple components and types from the root.
 *
 * Heavier components should get their own export in package.json (anything that uses radix).
 *
 * During development, some consumers such as nextjs process ALL of the modules in the import paths
 * for every route/page (no tree-shaking).
 *
 * Splitting things out into separate export paths
 * helps nextjs build fewer modules per page, speeding up build/re-build times.
 * See lines like "event compiled client and server successfully in 1139 ms (878 modules)" in next terminal logs.
 * Pay attention to the (X modules) bit.
 */

export * from './components/Box/index.ts';
export * from './components/Button/index.ts';
export * from './components/Card/index.ts';
export * from './components/ClientOnly/index.ts';
export * from './components/Heading/index.ts';
export * from './components/Icon/index.ts';
export * from './components/Input/index.ts';
export * from './components/Stack/index.ts';
export * from './components/TabMenu/index.ts';
export * from './components/Text/index.ts';
export type { PolymorphicComponent } from './utils/forward-ref.ts';
export { forwardRef, polyRef } from './utils/forward-ref.ts';
