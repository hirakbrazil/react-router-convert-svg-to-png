import App from './App';
import { routes } from './routes';

export async function createRoot() {
  return {
    App,
    routes,
  };
}
