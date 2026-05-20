import { ThemeId, ThemeDefinition, ThemeTokens } from './types';
import { registry } from './theme-registry';

/**
 * Recursively resolves a theme's tokens by merging with its parent (extends).
 * Safe fallback guarantees it never crashes the UI.
 */
export function resolveTheme(themeId: ThemeId): ThemeTokens {
  const theme = registry.themes[themeId];
  
  if (!theme) {
    console.warn(`[M2 Engine] Theme '${themeId}' not found. Falling back to 'base'.`);
    return registry.themes['base']?.tokens || {};
  }
  
  if (theme.extends) {
    const parentTokens = resolveTheme(theme.extends);
    return mergeTokens(parentTokens, theme.tokens);
  }
  
  return theme.tokens;
}

function mergeTokens(parent: ThemeTokens, child: ThemeTokens): ThemeTokens {
  return {
    ...parent,
    ...child,
    colors: { ...parent.colors, ...child.colors },
    radius: { ...parent.radius, ...child.radius },
    typography: { ...parent.typography, ...child.typography }
  };
}

/**
 * Extracts Tailwind CSS variables from resolved tokens.
 * This prevents agents from hardcoding className="bg-yellow-500".
 */
export function generateCssVariables(tokens: ThemeTokens): React.CSSProperties {
  const vars: Record<string, string> = {};
  
  if (tokens.colors) {
    Object.entries(tokens.colors).forEach(([key, value]) => {
      if (value) vars[`--theme-color-${key}`] = value;
    });
  }
  
  if (tokens.radius) {
    Object.entries(tokens.radius).forEach(([key, value]) => {
      if (value) vars[`--theme-radius-${key}`] = value;
    });
  }
  
  return vars as React.CSSProperties;
}
