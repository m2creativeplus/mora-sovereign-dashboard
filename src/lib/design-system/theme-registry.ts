import { ThemeRegistry } from './types';

export const registry: ThemeRegistry = {
  themes: {
    base: {
      id: 'base',
      type: 'base',
      tokens: {
        colors: { 
          background: '#ffffff', 
          primary: '#000000',
          text: '#1e293b'
        },
        radius: { md: '0.5rem', lg: '0.75rem' },
        typography: { heading: 'Inter', body: 'Inter' }
      }
    },
    m2_sovereign: {
      id: 'm2_sovereign',
      type: 'core',
      extends: 'base',
      tokens: {
        colors: { 
          primary: '#D4AF37', 
          background: '#09090B',
          text: '#FAFAFA'
        },
        typography: { heading: 'Outfit' }
      }
    },
    quikpay: {
      id: 'quikpay',
      type: 'product',
      extends: 'base',
      tokens: {
        colors: { 
          primary: '#22C55E', 
          background: '#F8FAFC' 
        }
      }
    }
  }
};
