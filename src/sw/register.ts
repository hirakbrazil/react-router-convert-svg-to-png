// src/sw/register.ts
export const register = async () => {
  if (import.meta.env.VITE_OFFLINE_SUPPORT === 'true') {
    const { registerSW } = await import('virtual:pwa-register');
    return registerSW;
  } else {
    return () => {}; // no-op
  }
};
