import { neonConfig } from '@neondatabase/serverless';
// @ts-expect-error no typings
import ws from 'ws';

export { Client } from '@neondatabase/serverless';

/**
 * Required to use neon/serverless in a node environment (for when we're debugging)
 *
 * https://github.com/neondatabase/serverless/issues/7#issuecomment-1438804485
 */
neonConfig.webSocketConstructor = ws;
