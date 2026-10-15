import { ABBREVIATIONS, type Abbreviation, type AbbreviationCode } from './abbreviations';

export type AbbreviationMatch = {
  start: number;
  end: number;
  text: string;
  count: number | null;
  abbreviations: Abbreviation[];
};

type Spelling = {
  code: AbbreviationCode;
  abbreviation: Abbreviation;
};

const SPELLINGS: Spelling[] = ABBREVIATIONS.flatMap((abbreviation) =>
  abbreviation.codes.map((code) => ({ code, abbreviation })),
);

const WORD_CHAR = /[\p{L}\p{N}]/u;
const NUMBER_BEFORE = /^(\d+) ?/;
const NUMBER_AFTER = /^ ?(\d+)/;

function isWordChar(char: string): boolean {
  return char !== '' && WORD_CHAR.test(char);
}

function sameText(candidate: string, code: AbbreviationCode): boolean {
  return code.exact ? candidate === code.text : candidate.toLowerCase() === code.text.toLowerCase();
}

function matchAt(
  text: string,
  start: number,
  code: AbbreviationCode,
): { end: number; count: number | null } | null {
  let position = start;
  let count: number | null = null;

  if (code.number === 'before') {
    const numberMatch = NUMBER_BEFORE.exec(text.slice(position));
    if (numberMatch) {
      count = Number(numberMatch[1]);
      position += numberMatch[0].length;
    }
  }

  if (!sameText(text.slice(position, position + code.text.length), code)) return null;
  position += code.text.length;

  if (code.number === 'after') {
    const numberMatch = NUMBER_AFTER.exec(text.slice(position));
    if (numberMatch) {
      count = Number(numberMatch[1]);
      position += numberMatch[0].length;
    }
  }

  if (isWordChar(text.charAt(position))) return null;
  return { end: position, count };
}

export function findAbbreviations(text: string): AbbreviationMatch[] {
  const matches: AbbreviationMatch[] = [];
  let index = 0;

  while (index < text.length) {
    if (isWordChar(text.charAt(index - 1))) {
      index++;
      continue;
    }

    let best: AbbreviationMatch | null = null;
    for (const { code, abbreviation } of SPELLINGS) {
      const result = matchAt(text, index, code);
      if (!result) continue;

      if (best === null || result.end > best.end) {
        best = {
          start: index,
          end: result.end,
          text: text.slice(index, result.end),
          count: result.count,
          abbreviations: [abbreviation],
        };
      } else if (result.end === best.end) {
        if (!best.abbreviations.includes(abbreviation)) best.abbreviations.push(abbreviation);
        if (best.count === null) best.count = result.count;
      }
    }

    if (best) {
      matches.push(best);
      index = best.end;
    } else {
      index++;
    }
  }

  return matches;
}
