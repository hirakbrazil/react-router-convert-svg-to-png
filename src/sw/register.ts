export const register = async () => {
  if (import.meta.env.VITE_OFFLINE_SUPPORT === 'true') {
    const mod = await import('virtual:pwa-register');
    return mod.registerSW;
  }

  // return a dummy function if disabled
  return () => {};
};
