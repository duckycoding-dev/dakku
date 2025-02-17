// Define arrays for static values
export const cpTypes = ['jis208', 'jis212', 'jis213', 'ucs'] as const;
export const radTypes = ['classical', 'nelson_c'] as const;
export const varTypes = [
  'jis208',
  'jis212',
  'jis213',
  'deroo',
  'njecd',
  's_h',
  'nelson_c',
  'oneill',
  'ucs',
] as const;
export const drTypes = [
  'nelson_c',
  'nelson_n',
  'halpern_njecd',
  'halpern_kkld',
  'heisig',
  'gakken',
  'oneill_names',
  'oneill_kk',
  'moro',
  'henshall',
  'sh_kk',
  'sakade',
  'jf_cards',
  'henshall3',
  'tutt_cards',
  'crowley',
  'kanji_in_context',
  'busy_people',
  'kodansha_compact',
  'maniette',
] as const;
export const qcTypes = [
  'skip',
  'sh_desc',
  'four_corner',
  'deroo',
  'misclass',
] as const;
export const rTypes = [
  'pinyin',
  'korean_r',
  'korean_h',
  'ja_on',
  'ja_kun',
] as const;
export const onTypes = ['kan', 'go', 'tou', "kan'you"] as const;
export const rStatus = ['jy'] as const;
export const skipMisclass = [
  'posn',
  'stroke_count',
  'stroke_and_posn',
  'stroke_diff',
] as const;

// Infer types from arrays
export type CpType = (typeof cpTypes)[number];
export type RadType = (typeof radTypes)[number];
export type VarType = (typeof varTypes)[number];
export type DrType = (typeof drTypes)[number];
export type QcType = (typeof qcTypes)[number];
export type RType = (typeof rTypes)[number];
export type OnType = (typeof onTypes)[number];
export type RStatus = (typeof rStatus)[number];
export type SkipMisclass = (typeof skipMisclass)[number];

export type Codepoint = {
  type: CpType;
  value: string;
};

// Radical information
export type Radical = {
  type: RadType;
  value: number;
};

// Miscellaneous metadata
export type MiscInfo = {
  grade?: number; // School grade (1-10)
  strokeCount: number[]; // Stroke count(s)
  variant?: Variant[];
  frequency?: number; // Kanji frequency rank (1-2500)
  radicalName?: string[]; // Radical names
  jlpt?: number; // JLPT level (1-4)
};

// Kanji Variants (old/new forms)
export type Variant = {
  type: VarType;
  text: string;
};

// Dictionary references
export type DictionaryReference = {
  type: DrType;
  text: string;
  moroVolume?: number;
  moroVolumePage?: number;
};

// Query codes for searching kanji
export type QueryCode = {
  type: QcType;
  value: string;
  skipMisclassification?: SkipMisclass;
};

// Readings and meanings
export type ReadingMeaningGroup = {
  reading?: Reading[];
  meaning?: Meaning[];
};

// Readings (on-yomi, kun-yomi, pinyin, etc.)
export type Reading = {
  readingType: RType;
  text: string;
  onType?: OnType;
  JouyouKanji?: boolean;
};

// Meaning in different languages
export type Meaning = {
  lang?: string;
  text: string;
};

export type KanjiForImport = {
  // id: number;
  literal: string;
  codepoints: Codepoint[];
  radicals: Radical[];
  misc: MiscInfo;
  dictionaryReferences: DictionaryReference[];
  queryCodes: QueryCode[];
  readingsMeanings: ReadingMeaningGroup[];
};
