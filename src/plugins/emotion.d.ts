import '@emotion/react';
import { Theme as MyTheme } from '@/types/theme';

declare module '@emotion/react' {
  export interface Theme extends MyTheme {}
}
