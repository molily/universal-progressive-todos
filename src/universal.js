export const isClient = typeof window === 'object';
export const isServer = !isClient;
