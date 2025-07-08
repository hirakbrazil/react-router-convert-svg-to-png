import './index.css'

if (typeof window !== 'undefined') {
  // Register service worker only on client-side
  if ('serviceWorker' in navigator) {
    import('virtual:pwa-register').then(async ({ registerSW }) => {
      const { toast } = await import('sonner');
      
      const updateSW = registerSW({
        onNeedRefresh() {
          toast.info('Update available!', {
            action: {
              label: 'Reload',
              onClick: () => {
                localStorage.setItem('app-updated', 'true');
                setTimeout(() => {
                  updateSW(true);
                }, 200);
              },
            },
            duration: Infinity,
            actionButtonStyle: {
              backgroundColor: 'var(--action-button-bg, #000000)',
              color: 'var(--action-button-text, #ffffff)',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 16px',
              fontWeight: '500',
              cursor: 'pointer',
            },
          });
        },
        onOfflineReady() {
          console.log('App ready to work offline')
        }
      });

      // Show success toast after app mounts
      setTimeout(() => {
        if (localStorage.getItem('app-updated') === 'true') {
          toast.success('App updated successfully!', { duration: 5000 });
          localStorage.removeItem('app-updated');
        }
      }, 200);
    });
  }
}
