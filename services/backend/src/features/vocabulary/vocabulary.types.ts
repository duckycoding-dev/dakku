// String union types for categorization labels
export type Dialect =
  | 'Brazilian'
  | 'Hokkaido-ben'
  | 'Kansai-ben'
  | 'Kantou-ben'
  | 'Kyoto-ben'
  | 'Kyuushuu-ben'
  | 'Nagano-ben'
  | 'Osaka-ben'
  | 'Ryuukyuu-ben'
  | 'Touhoku-ben'
  | 'Tosa-ben'
  | 'Tsugaru-ben';

export type Field =
  | 'agriculture'
  | 'anatomy'
  | 'archeology'
  | 'architecture'
  | 'art, aesthetics'
  | 'astronomy'
  | 'audiovisual'
  | 'aviation'
  | 'baseball'
  | 'biochemistry'
  | 'biology'
  | 'botany'
  | 'boxing'
  | 'Buddhism'
  | 'business'
  | 'card games'
  | 'chemistry'
  | 'Chinese mythology'
  | 'Christianity'
  | 'civil engineering'
  | 'clothing'
  | 'computing'
  | 'crystallography'
  | 'dentistry'
  | 'ecology'
  | 'economics'
  | 'electricity, elec. eng.'
  | 'electronics'
  | 'embryology'
  | 'engineering'
  | 'entomology'
  | 'figure skating'
  | 'film'
  | 'finance'
  | 'fishing'
  | 'food, cooking'
  | 'gardening, horticulture'
  | 'genetics'
  | 'geography'
  | 'geology'
  | 'geometry'
  | 'go (game)'
  | 'golf'
  | 'grammar'
  | 'Greek mythology'
  | 'hanafuda'
  | 'horse racing'
  | 'Internet'
  | 'Japanese mythology'
  | 'kabuki'
  | 'law'
  | 'linguistics'
  | 'logic'
  | 'martial arts'
  | 'mahjong'
  | 'manga'
  | 'mathematics'
  | 'mechanical engineering'
  | 'medicine'
  | 'meteorology'
  | 'military'
  | 'mineralogy'
  | 'mining'
  | 'motorsport'
  | 'music'
  | 'noh'
  | 'ornithology'
  | 'paleontology'
  | 'pathology'
  | 'pharmacology'
  | 'philosophy'
  | 'photography'
  | 'physics'
  | 'physiology'
  | 'politics'
  | 'printing'
  | 'professional wrestling'
  | 'psychiatry'
  | 'psychoanalysis'
  | 'psychology'
  | 'railway'
  | 'Roman mythology'
  | 'Shinto'
  | 'shogi'
  | 'skiing'
  | 'sports'
  | 'statistics'
  | 'stock market'
  | 'sumo'
  | 'surgery'
  | 'telecommunications'
  | 'trademark'
  | 'television'
  | 'veterinary terms'
  | 'video games'
  | 'zoology';

export type KanjiInfo =
  | 'ateji (phonetic) reading'
  | 'word containing irregular kana usage'
  | 'word containing irregular kanji usage'
  | 'irregular okurigana usage'
  | 'word containing out-dated kanji or kanji usage'
  | 'rarely used kanji form'
  | 'search-only kanji form';
export type MiscInfo =
  | 'abbreviation'
  | 'archaic'
  | 'character'
  | "children's language"
  | 'colloquial'
  | 'company name'
  | 'creature'
  | 'dated term'
  | 'deity'
  | 'derogatory'
  | 'document'
  | 'euphemistic'
  | 'event'
  | 'familiar language'
  | 'female term or language'
  | 'fiction'
  | 'formal or literary term'
  | 'given name or forename, gender not specified'
  | 'group'
  | 'historical term'
  | 'honorific or respectful (sonkeigo) language'
  | 'humble (kenjougo) language'
  | 'idiomatic expression'
  | 'jocular, humorous term'
  | 'legend'
  | 'manga slang'
  | 'male term or language'
  | 'mythology'
  | 'Internet slang'
  | 'object'
  | 'obsolete term'
  | 'onomatopoeic or mimetic word'
  | 'organization name'
  | 'other'
  | 'full name of a particular person'
  | 'place name'
  | 'poetical term'
  | 'polite (teineigo) language'
  | 'product name'
  | 'proverb'
  | 'quotation'
  | 'rare term'
  | 'religion'
  | 'sensitive'
  | 'service'
  | 'ship name'
  | 'slang'
  | 'railway station'
  | 'family or surname'
  | 'word usually written using kana alone'
  | 'unclassified name'
  | 'vulgar expression or word'
  | 'work of art, literature, music, etc. name'
  | 'rude or X-rated term (not displayed in educational software)'
  | 'yojijukugo';
export type PartOfSpeech =
  | 'noun or verb acting prenominally'
  | 'adjective (keiyoushi)'
  | 'adjective (keiyoushi) - yoi/ii class'
  | "'kari' adjective (archaic)"
  | "'ku' adjective (archaic)"
  | 'adjectival nouns or quasi-adjectives (keiyodoshi)'
  | 'archaic/formal form of na-adjective'
  | "nouns which may take the genitive case particle 'no'"
  | 'pre-noun adjectival (rentaishi)'
  | "'shiku' adjective (archaic)"
  | "'taru' adjective"
  | 'adverb (fukushi)'
  | "adverb taking the 'to' particle"
  | 'auxiliary'
  | 'auxiliary adjective'
  | 'auxiliary verb'
  | 'conjunction'
  | 'copula'
  | 'counter'
  | 'expressions (phrases, clauses, etc.)'
  | 'interjection (kandoushi)'
  | 'noun (common) (futsuumeishi)'
  | 'adverbial noun (fukushitekimeishi)'
  | 'proper noun'
  | 'noun, used as a prefix'
  | 'noun, used as a suffix'
  | 'noun (temporal) (jisoumeishi)'
  | 'numeric'
  | 'pronoun'
  | 'prefix'
  | 'particle'
  | 'suffix'
  | 'unclassified'
  | 'verb unspecified'
  | 'Ichidan verb'
  | 'Ichidan verb - kureru special class'
  | "Nidan verb with 'u' ending (archaic)"
  | "Nidan verb (upper class) with 'bu' ending (archaic)"
  | "Nidan verb (lower class) with 'bu' ending (archaic)"
  | "Nidan verb (upper class) with 'dzu' ending (archaic)"
  | "Nidan verb (lower class) with 'dzu' ending (archaic)"
  | "Nidan verb (upper class) with 'gu' ending (archaic)"
  | "Nidan verb (lower class) with 'gu' ending (archaic)"
  | "Nidan verb (upper class) with 'hu/fu' ending (archaic)"
  | "Nidan verb (lower class) with 'hu/fu' ending (archaic)"
  | "Nidan verb (upper class) with 'ku' ending (archaic)"
  | "Nidan verb (lower class) with 'ku' ending (archaic)"
  | "Nidan verb (upper class) with 'mu' ending (archaic)"
  | "Nidan verb (lower class) with 'mu' ending (archaic)"
  | "Nidan verb (lower class) with 'nu' ending (archaic)"
  | "Nidan verb (upper class) with 'ru' ending (archaic)"
  | "Nidan verb (lower class) with 'ru' ending (archaic)"
  | "Nidan verb (lower class) with 'su' ending (archaic)"
  | "Nidan verb (upper class) with 'tsu' ending (archaic)"
  | "Nidan verb (lower class) with 'tsu' ending (archaic)"
  | "Nidan verb (lower class) with 'u' ending and 'we' conjugation(archaic)"
  | "Nidan verb (upper class) with 'yu' ending (archaic)"
  | "Nidan verb (lower class) with 'yu' ending (archaic)"
  | "Nidan verb (lower class) with 'zu' ending (archaic)"
  | "Yodan verb with 'bu' ending (archaic)"
  | "Yodan verb with 'gu' ending (archaic)"
  | "Yodan verb with 'hu/fu' ending (archaic)"
  | "Yodan verb with 'ku' ending (archaic)"
  | "Yodan verb with 'mu' ending (archaic)"
  | "Yodan verb with 'nu' ending (archaic)"
  | "Yodan verb with 'ru' ending (archaic)"
  | "Yodan verb with 'su' ending (archaic)"
  | "Yodan verb with 'tsu' ending (archaic)"
  | 'Godan verb - -aru special class'
  | "Godan verb with 'bu' ending"
  | "Godan verb with 'gu' ending"
  | "Godan verb with 'ku' ending"
  | 'Godan verb - Iku/Yuku special class'
  | "Godan verb with 'mu' ending"
  | "Godan verb with 'nu' ending"
  | "Godan verb with 'ru' ending"
  | "Godan verb with 'ru' ending (irregular verb)"
  | "Godan verb with 'su' ending"
  | "Godan verb with 'tsu' ending"
  | "Godan verb with 'u' ending"
  | "Godan verb with 'u' ending (special class)"
  | 'Godan verb - Uru old class verb (old form of Eru)'
  | 'intransitive verb'
  | 'Kuru verb - special class'
  | 'irregular nu verb'
  | 'irregular ru verb, plain form ends with -ri'
  | 'noun or participle which takes the aux. verb suru'
  | 'su verb - precursor to the modern suru'
  | 'suru verb - included'
  | 'suru verb - special class'
  | 'transitive verb'
  | 'Ichidan verb - zuru verb (alternative form of -jiru verbs)';
export type ReadingInfo =
  | 'gikun (meaning as reading) or jukujikun (special kanji reading)'
  | 'word containing irregular kana usage'
  | 'out-dated or obsolete kana usage'
  | 'rarely used kana form'
  | 'search-only kana form';

export type Priority =
  | 'news1' // News priority 1
  | 'news2' // News priority 2
  | 'ichi1' // Ichimango priority 1
  | 'ichi2' // Ichimango priority 2
  | 'spec1' // Special priority 1
  | 'spec2' // Special priority 2
  | 'gai1' // Gai priority 1
  | 'gai2' // Gai priority 2
  | `nf${string}`; // Frequency number

// Additional types inferred from JMdict_e.xml and database schema

export type Gloss = {
  text: string;
  lang?: string;
  gender?: string;
  type?: 'lit' | 'fig' | 'expl';
};

export type LoanwordSource = {
  originalWordOrSentence?: string;
  originalLang?: string;
  type?: 'full' | 'part';
  waseieigo?: boolean;
};

export type Sense = {
  glosses: Gloss[];
  partsOfSpeech: PartOfSpeech[];
  fields: Field[];
  miscs: MiscInfo[];
  dialects: Dialect[];
  infos: string[];
  loanwordSources: LoanwordSource[];
  stagk: string[];
  stagr: string[];
  xrefs: string[];
  antonyms?: string[];
};

export type KanjiTag = PartOfSpeech | Field | MiscInfo;

export type KanjiElement = {
  text: string;
  infos: KanjiInfo[];
  priorities: Priority[];
};

export type ReadingElement = {
  text: string;
  noKanji: boolean;
  restrictions: string[];
  infos: ReadingInfo[];
  priorities: Priority[];
};

export type Vocabulary = {
  id: number;
  kanji?: KanjiElement[];
  readings: ReadingElement[];
  senses: Sense[];
  tags: KanjiTag[];
  priorities: Priority[];
};
