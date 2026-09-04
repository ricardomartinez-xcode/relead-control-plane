import { landingEn, type LandingContent } from "./landing.en";

export type Locale = "en";

const catalog: Record<Locale, LandingContent> = {
  en: landingEn,
};

/** Locale-ready accessor. Add `es` to the catalog to enable an /es route later. */
export function getContent(locale: Locale = "en"): LandingContent {
  return catalog[locale] ?? landingEn;
}

export const content = landingEn;
export type { LandingContent };
