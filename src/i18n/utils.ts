// src/i18n/utils.ts - i18n helper utilities based on Astro i18n Recipe
import { ui, defaultLang, showDefaultLang, languages, type SupportedLanguage } from './ui';

export function getLangFromUrl(url: URL): SupportedLanguage {
  const segments = url.pathname.split('/').filter(Boolean);
  const first = segments[0];
  if (first && first in languages) {
    return first as SupportedLanguage;
  }
  return defaultLang;
}

export function useTranslations(lang: SupportedLanguage) {
  return function t(key: keyof typeof ui[typeof defaultLang]): string {
    const langDict = ui[lang] as Record<string, string>;
    const defaultDict = ui[defaultLang] as Record<string, string>;
    return (langDict && langDict[key]) || defaultDict[key] || (key as string);
  };
}

export function useTranslatedPath(lang: SupportedLanguage) {
  return function translatePath(path: string, targetLang: SupportedLanguage = lang): string {
    // Clean leading and trailing slashes for uniformity
    const cleanPath = path.replace(/^\/+|\/+$/g, '');
    
    // Remove current lang prefix if present in the given path
    const parts = cleanPath.split('/');
    if (parts[0] && parts[0] in languages) {
      parts.shift();
    }
    const purePath = parts.join('/');

    if (!showDefaultLang && targetLang === defaultLang) {
      return purePath ? `/${purePath}` : '/';
    }
    return purePath ? `/${targetLang}/${purePath}` : `/${targetLang}/`;
  };
}

export function getCleanPathname(url: URL): string {
  const segments = url.pathname.split('/').filter(Boolean);
  if (segments[0] && segments[0] in languages) {
    segments.shift();
  }
  return segments.join('/');
}

export function getHreflangAlternates(purePath: string, siteUrl: string = 'https://aipixeltest.com') {
  const clean = purePath.replace(/^\/+|\/+$/g, '');
  const pathSuffix = clean ? `/${clean}` : '';
  const rootPath = clean ? `/${clean}` : '/';

  const alternates = [
    { lang: 'x-default', href: `${siteUrl}${rootPath}` },
    { lang: 'en', href: `${siteUrl}${rootPath}` },
    { lang: 'es', href: `${siteUrl}/es${pathSuffix}/` },
    { lang: 'ja', href: `${siteUrl}/ja${pathSuffix}/` },
    { lang: 'fr', href: `${siteUrl}/fr${pathSuffix}/` },
    { lang: 'de', href: `${siteUrl}/de${pathSuffix}/` },
    { lang: 'pt', href: `${siteUrl}/pt${pathSuffix}/` },
    { lang: 'ko', href: `${siteUrl}/ko${pathSuffix}/` },
    { lang: 'it', href: `${siteUrl}/it${pathSuffix}/` },
  ];

  return alternates;
}
