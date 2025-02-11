import { XMLParser } from 'fast-xml-parser';
import { db } from '../../src/db';
import { kanji } from '../../src/features/kanji/kanji.db';
import fs from 'fs/promises';

type KanjiSymbol = string;
type CodePoint = {
  cp_value: string[];
};
type Radical = {
  rad_value: number | number[];
};
type Misc = {
  stroke_count: number;
  variant: string;
  grade: number;
  freq: number;
  jlpt: number;
  rad_name: [];
};
type DicNumber = {
  dic_ref: number[];
};
type QueryCode = {
  q_code: string | (string | number)[];
};
type ReadingMeaning = {
  rmgroup: {
    reading: string | string[];
    meaning: string | string[];
  };
  nanori: string | string[];
};
type KanjiFromXML = {
  literal: KanjiSymbol;
  codepoint: CodePoint;
  radical: Radical;
  misc: Misc;
  dic_number: DicNumber;
  query_code: QueryCode;
  reading_meaning: ReadingMeaning;
};

async function importKanjiData() {
  const xml = await fs.readFile(
    '../../../../opensource_data_used/kanjidic2.xml',
    'utf-8',
  );

  const json: KanjiFromXML[] = new XMLParser().parse(xml).kanjidic2.character;

  // read the json and save into a Set every field found
  // const kanjiArray = json.map((k) => ({
  //   id: k.literal,
  //   meaning: k.meaning[0].text,
  //   onyomi: k.reading.filter((r) => r.type === "ja_on").map((r) => r.text),
  //   kunyomi: k.reading.filter((r) => r.type === "ja_kun").map((r) => r.text),
  //   jlpt: k.misc.jlpt_level || null,
  //   frequency: k.misc.freq || null,
  //   strokes: k.misc.stroke_count[0],
  // }));

  // for (const entry of kanjiArray) {
  //   await db.insert(kanji).values(entry);
  // }

  // console.log("✅ Kanji import complete!");
}

importKanjiData();
