export type ThemeType = 'core' | 'agency' | 'product' | 'client' | 'base';
export type ThemeId = 'base' | 'm2_sovereign' | 'quikpay' | 'energy_bridge' | 'kaltirsi' | string;

export interface ThemeTokens {
  colors?: {
    primary?: string;
    background?: string;
    text?: string;
    accent?: string;
    [key: string]: string | undefined;
  };
  radius?: Record<string, string>;
  typography?: Record<string, string>;
}

export interface ThemeDefinition {
  id: ThemeId;
  type: ThemeType;
  extends?: ThemeId;
  tokens: ThemeTokens;
}

export interface ThemeRegistry {
  themes: Record<ThemeId, ThemeDefinition>;
}
