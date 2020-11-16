export interface TRecord {
  en: Record<string, string>;
  ja: Record<string, string>;
}

export type Lang = keyof TRecord;
