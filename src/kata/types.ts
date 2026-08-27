export type Difficulty = 'easy' | 'medium' | 'hard';
export interface Match { mode: 'normalized' | 'exact' | 'regex'; caseSensitive: boolean }
export interface KataBase {
  slug: string; id: string; category: string; title: string; difficulty: Difficulty; tags: string[];
  hints: string[]; body: string;           // markdown, template block removed
}
export interface Category { id: string; name: string; description?: string; order: number }
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
