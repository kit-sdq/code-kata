export type Difficulty = 'easy' | 'medium' | 'hard';
export type Lang = 'de' | 'en';
export type Localized = string | { de: string; en: string };
export interface Match { mode: 'normalized' | 'exact' | 'regex'; caseSensitive: boolean }
export interface KataBase {
  slug: string; id: string; category: string; title: string; difficulty: Difficulty; tags: string[];
  hints: string[]; body: string;           // markdown, template block removed
  langFallback?: boolean;                  // true when shown in a language the kata has no file for
}
export interface Category { id: string; name: Localized; description?: Localized; order: number }
export interface TextKata extends KataBase { type: 'text'; answers: string[]; match: Match }
export interface ChoiceKata extends KataBase {
  type: 'choice'; multiple: boolean; shuffle: boolean;
  options: { text: string; correct: boolean }[];
}
export type JavaValue =
  | number | boolean | string | null
  | JavaValue[]
  | { type: 'long' | 'float' | 'char' | 'double' | 'int'; value: number | string };
export type Check =
  | { type: 'stdout'; expected: string; stdin?: string; label?: string }
  | { type: 'return'; method: string; cases: { args: JavaValue[]; expected: JavaValue }[] };
export interface CodeKata extends KataBase {
  type: 'code'; mainClass: string; allowedImports: string[];
  timeoutMs: number; template: string; checks: Check[];
}
export type Kata = TextKata | ChoiceKata | CodeKata;
