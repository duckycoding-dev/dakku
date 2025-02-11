# Data imported from open source sources

I've downloaded data from `KanjiDic2`, `JMdict` and `Tatoeba`

# Download KanjiDic2

curl -O http://www.edrdg.org/kanjidic/kanjidic2.xml.gz
gunzip kanjidic2.xml.gz # Extract

# Download JMdict

curl -O ftp://ftp.edrdg.org/pub/Nihongo//JMdict_e.gz
gunzip JMdict_e.gz # Extract

# Download Tatoeba sentences

curl -O https://tatoeba.org/en/exports/download/57902/Sentence%20pairs%20in%20English-Japanese%20-%202025-02-11.tsv
tar -xjf sentences.tar.bz2 # Extract
mv sentences.csv tatoeba_sentences.csv
