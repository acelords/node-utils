import numeral from "numeral";
import pluralizeLib from "pluralize";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
dayjs.extend(relativeTime);

const MIN_TIMESTAMP = 75600000;
const MIN_DATE = "January 2, 1970";

/**
 * format a date. Default format: "D MMM, YYYY"
 * https://day.js.org/docs/en/display/format
 * - date => 8 Oct, 2020
 * - null|undefined => ""
 * - 1602162242 => 8 Oct, 2020
 */
export const formatDate = (
  dt: Date | string | number | null | undefined,
  format = "D MMM, YYYY"
): string => {
  if (!dt) return "";
  if (isNumeric(dt.toString())) {
    if (Number(dt) < MIN_TIMESTAMP) return "";
    return dayjs.unix(Number(dt)).format(format);
  }
  if (!dayjs(dt).isValid() || dayjs(dt).isBefore(MIN_DATE)) return "";
  return dayjs(dt).format(format);
};

/**
 * format a date and include time by default. Default format: "D MMM, YYYY hh:mm a"
 * - date => 8 Oct, 2020 1:04 pm
 * - 1602162242 => 8 Oct, 2020 1:04 pm
 */
export const formatDateTime = (
  dt: Date | string | number | null | undefined,
  format = "D MMM, YYYY hh:mm a"
): string => {
  if (!dt) return "";
  if (isNumeric(dt.toString())) {
    if (Number(dt) < MIN_TIMESTAMP) return "";
    return dayjs.unix(Number(dt)).format(format);
  }
  if (!dayjs(dt).isValid() || dayjs(dt).isBefore(MIN_DATE)) return "";
  return dayjs(dt).format(format);
};

/**
 * Get the difference in days between two dates
 * - from 8 Oct, 2020 to 8 Oct, 2020 => 0
 * - from 8 Oct, 2020 to 9 Oct, 2020 => 1
 * - from 8 Oct, 2020 to 10 Oct, 2020 => 2
 * - null|undefined => 0
 */
export const daysDiff = (
  from: Date | string | null | undefined,
  to: Date | string | null | undefined
): number => {
  if (!from || !to) return 0;
  const date1 = dayjs(from);
  const date2 = dayjs(to);
  return Math.abs(date1.diff(date2, "day"));
};

/**
 * Get the difference in days between two dates
 * - from 8 Oct, 2020 to 8 Oct, 2020 => 0
 * - from 8 Oct, 2020 to 9 Oct, 2020 => 1
 * - from 8 Oct, 2020 to 10 Oct, 2020 => 2
 * - null|undefined => 0
 */
export const dateDiff = (
  from: Date | string | null | undefined,
  to: Date | string | null | undefined,
  unit:
    | "day"
    | "hour"
    | "minute"
    | "second"
    | "millisecond"
    | "quarter"
    | "month"
    | "year"
): number => {
  if (!from || !to) return 0;
  const date1 = dayjs(from);
  const date2 = dayjs(to);
  return Math.abs(date1.diff(date2, unit));
};

/**
 * return 24-hour time from an  ISO 8601  date. Default format: "HH:mm"
 * - date => 21:04
 * - 1692803186 => 16:04
 */
export const getTimeFromDate = (
  dt: string | number | Date,
  format = "HH:mm"
): string => {
  if (isNumeric(dt.toString())) {
    if (Number(dt) < MIN_TIMESTAMP) return "";
    return dayjs.unix(Number(dt)).format(format);
  }
  if (!dayjs(dt).isValid() || dayjs(dt).isBefore(MIN_DATE)) return "";
  return dayjs(dt).format(format);
};

/**
 * generate a random number, min inclusive, max NOT inclusive
 * - NB: Math.random() ->> a number from 0 to <1
 * - 10,80 returns 10 <= x < 80
 */
export const randomNumber = (min = 0, max = 10000) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * generate a random string
 * @param length number
 * @param includeNumbers boolean
 * @returns string
 */
export const randomString = (length = 6, includeNumbers = false) => {
  let result = "";
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  includeNumbers ? (characters += "0123456789") : "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

/**
 * Check if a string is numeric
 * - isNumeric('abcd')         // false
 * - isNumeric('123a')         // false
 * - isNumeric('1')         // true
 * - isNumeric('1234567890')         // true
 * - isNumeric('-23')         // true
 * - isNumeric('1234')         // true
 * - isNumeric('1234n')         // true
 * - isNumeric('123.4')         // false
 * - isNumeric('123.4', true)         // true
 * - isNumeric('')         // false
 * - isNumeric(undefined)         // false
 * - isNumeric(null)         // false
 */
export function isNumeric(
  value: string | number | undefined | null,
  allowFloat = false
): boolean {
  if (!value) return false;
  return allowFloat
    ? /^-?\d+\.?\d*$/.test(value.toString())
    : /^-?\d+$/.test(value.toString());
}

/**
 * Check how long a date is from now
 * - date => 2 days ago
 * - date => in 2 days
 * - null|undefined => ""
 */
export const fromNow = (
  date: Date | string | null | undefined,
  addSuffix = undefined
): string => {
  if (!date) return "";
  if (!dayjs(date).isValid()) return "";
  return dayjs(date).fromNow(addSuffix);
};

/**
 * Get a substring of a string
 * - abcdef, 1 => a
 * - abcd, 4 => abcd
 * - abc, 10 => abc
 * - null|undefined => ""
 */
export const substring = (
  str: string | null | undefined,
  end: number
): string => (str ? str.substring(0, end) : "");

/**
 * format a number to 2dp.
 * - 1000 becomes 1,000.00.
 * - If toInt=true, 1000000 becomes 1,000,000.
 * - "ab78"  => ""
 * - null|undefined => ""
 * - "0" => "0.00"
 * - 0 => "0.00"
 * - "0", true => "0"
 * - 0, true => "0"
 * - Displaying other groupings/separators is possible, look at the docs http://numeraljs.com/
 */
export const numberFormat = (
  value: string | number | undefined | null,
  toInt = false
): string => {
  const format = toInt ? "0,0" : "0,0.00";
  if (value === 0 || value === "0") return numeral(value).format(format);
  if (!value || !isNumeric(value, true)) return "";
  return numeral(value).format(format);
};

/**
 * An Alias for numberFormat
 * format a number to 2dp.
 * - 1000 becomes 1,000.00.
 * - If toInt=true, 1000000 becomes 1,000,000.
 * - "ab78"  => ""
 * - null|undefined => ""
 * - "0" => "0.00"
 * - 0 => "0.00"
 * - "0", true => "0"
 * - 0, true => "0"
 * - Displaying other groupings/separators is possible, look at the docs http://numeraljs.com/
 */
export const formatNumber = (
  value: string | number | undefined | null,
  toInt = false
): string => {
  return numberFormat(value, toInt);
};

/**
 * format currency. Value passed must be in cents.
 * - 1500000 => 15,000.00
 * - 123456 => 1,234.56
 * - "0" => "0.00"
 * - 0 => "0.00"
 */
export const formatCurrency = (
  value: string | number | undefined | null
): string => {
  const format = "0,0.00";
  if (value === 0 || value === "0") return numeral(0).format(format);
  if (!value || !isNumeric(value, true)) return "";
  const amount = Number(value.toString()) / 100;
  return numeral(amount).format(format);
};

/**
 * slugify a string.
 * - iwef k[wef #mgt%  =>  iwef-kwef-mgt
 * - iwef âẽèéë eded  => iwef-aeeee-eded
 * - iwef .--/,;: âẽèéë .--/,;: eded  => iwef-aeeee-eded
 */
export const slugify = (str: string | null | undefined): string => {
  if (!str) return "";
  str = str.toLowerCase().trim();

  // remove accents, swap ñ for n, etc
  var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
  var to = "aaaaaeeeeeiiiiooooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  return str
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

/**
 * strip html tags an dimg tags from a html string
 * - <p>abcd</p>  =>  abcd
 * - <p>abcd</p> =>  abcd
 * - <p>abcd &nbsp;</p> =>  abcd &nbsp;
 * - <p>abcd &nbsp; &nbsp;</p> =>  abcd &nbsp;
 * - <p>abcd <br/> &middot; karl</p> =>  abcd &middot; karl
 * @param htmlString string
 * @returns string
 */
export const stripTags = (htmlString: string): string => {
  return htmlString
    .replaceAll(/(<([^>]+)>)/gi, "") // replace tags
    .replace(/<img[^>]*>/gi, "") // replace img tags
    .replace(/\s\s+/g, " "); // replace spaces, tabs, newlines with single
};

/**
 * strip html tags an dimg tags from a html string
 * - <p>abcd</p>  =>  abcd
 * - <p>abcd &nbsp;</p>  =>  abcd
 * - <p>abcd &nbsp;  &nbsp;   &nbsp;</p>  =>  abcd
 * - <p>abcd &nbsp; karl</p>  =>  abcd karl
 * - <p>abcd [shortcode] karl</p>  =>  abcd karl
 * - <p>abcd [shortcode karl</p>  =>  abcd [shortcode karl
 * - <p>abcd <br/> karl</p>  =>  abcd karl
 * - <p>abcd <br/> &middot; karl</p>  =>  abcd karl
 * - <p>abcd <br/> &middot karl</p>  =>  abcd &middot karl
 * @param htmlString string
 * @returns string
 */
export const stripHtml = (html: string): string => {
  return html
    .replace(/(<([^>]+)>)/gi, "")
    .replace(/ *\[[^\]]*]/, "") // replace [shortcode]
    .replace(/(&nbsp;|<br>|<br \/>)/g, "") // replace &nbsp; and <br> tags
    .replace(/&.*;/, "") // replace html entities
    .replace(/\s\s+/g, " ") // replace spaces, tabs, newlines with single
    .trim();
};

/**
 * pluralize a word
 */
export function plural(value: string | null | undefined): string {
  if (!value) return "";
  return pluralizeLib.plural(value);
}

/**
 * singularize a word
 */
export function singular(value: string | null | undefined): string {
  if (!value) return "";
  return pluralizeLib.singular(value);
}

/**
 * pluralize or singularize a word given a counter
 * - pluralize(null, 1) => ""
 * - pluralize(undefined, 1) => ""
 * - pluralize(man, 1) => "man"
 * - pluralize(man, 2) => "men"
 * - pluralize(abcds, 0) => "abcds"
 * - pluralize(abcds, 1) => "abcd"
 * - pluralize(abcds, 2) => "abcds"
 */
export function pluralize(
  value: string | null | undefined,
  counter: number
): string {
  if (!value) return "";
  if (counter < 2 && counter > 0) {
    return pluralizeLib.singular(value);
  }

  return pluralizeLib.plural(value);
}

/**
 * Insert another array inside an array at a certain index.
 * If the index exceeds the array length, the elements will be inserted at the end
 *
 * - insertIntoArray([1, 2, 3, 4], 2, [8, 9]) => [1, 2, 8, 9, 3, 4]. \n
 * - insertIntoArray([1, 2], 5, [8, 9]) => [1, 2, 8, 9]
 *
 * @param arr Array<T>
 * @param index number
 * @param newItems any<T>
 * @returns
 */
// @ts-ignore
export const insertIntoArray = (arr, index, ...newItems) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // inserted items
  ...newItems,
  // part of the array after the specified index
  ...arr.slice(index),
];

/**
 * SQL month starts from 1-12, js starts from 0-11
 * @param index Month index as returned from SQL
 * @returns string dayjs().format()
 */
export function getMonthNameFromSqlMonthIndex(index: number, format = "MMM") {
  return dayjs(new Date(2023, index - 1, 1)).format(format);
}

/**
 * check if a string is a phoneNumber.
 * This is a loose check. For advanced use-cases, use the intl package
 * - 123456789 => true
 * - +123456789 => true
 * - 0123456789 => true
 * - p123456789 => false
 * - ~123456789 => false
 */
export const isPhoneNumber = (str: string) => {
  str = str
    .replaceAll("+", "")
    .replaceAll(" ", "")
    .replaceAll("(", "")
    .replaceAll(")", "")
    .replaceAll("-", "")
    .replaceAll("#", "")
    .replaceAll("_", "");

  return !isNaN(Number(str));
};

/**
 * check if email is valide
 * - info@acelords.com => true
 * - infoacelords.com => false
 * - info@acelordscom => false
 * - +123456789 => false
 * - "" | null | undefined => false
 */
export function isEmail(emailAdress: string | null | undefined): boolean {
  if (!emailAdress) return false;

  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (emailAdress.match(regex)) return true;

  return false;
}

/**
 * Check if string, array or object is empty
 * - null|undefined => true
 * - "." => false
 * - "" => true
 * - [] => true
 * - [1] | ["k"] => false
 * - {} => true
 * - {a:4} => false
 */
export const isEmpty = (
  value: string | null | undefined | object | Array<any>
): boolean => {
  if (!value) return true;

  if (typeof value === "object") return Object.keys(value).length < 1;

  if (Array.isArray(value)) return value.length < 1;

  return value.length < 1;
};

/**
 * Capitalize first word in a string.
 * Does NOT lowerCase the rest
 *  - 'abcd efg' => 'Abcd efg'
 * - '    abcd efg  ' => 'Abcd efg'
 */
export const ucwords = (str: string | null | undefined): string =>
  (str || "").trim().substring(0, 1).toUpperCase() +
  (str || "").trim().substring(1);

/**
 * capitalize words in a string
 * - 'abcd efg' => 'Abcd Efg'
 * - '    abcd efg  ' => 'Abcd Efg'
 */
export const capitalize = (value: string | null | undefined): string => {
  if (!value) return "";
  return value
    .replace(/(?:^|\s)\S/g, function (a) {
      return a.toUpperCase();
    })
    .trim();
};

/**
 * convert a string to camelCase
 * - your string is dope => yourStringIsDope
 * - abcd => abcd
 * - abcd efgh => abcdEfgh
 * - abcdEfgh => abcdefgh
 * - a b c d => aBCD
 * - ABCD => abcd
 * - aBCD => abcd
 * - 0 => "0"
 * - null => ""
 * - undefined => ""
 */
export const camelCase = (value: string | null | undefined) => {
  if (!value) return "";
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
};

/**
 * Convert camel case to sentence case
 * - yourStringIsDope => Your string is dope
 * - yourStringIsDope, true => Your String Is Dope
 * - abc456  => Abc456
 */
export const camelCaseToSentenceCase = (
  value: string | null | undefined,
  capitalizeWords = false
): string => {
  if (!value) return "";
  value = value.replace(/([A-Z])/g, " $1").trim();
  return capitalizeWords
    ? value.charAt(0).toUpperCase() + value.slice(1)
    : value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

/**
 * Convert snake case to sentence case
 * - 'my_string_is_dope' => 'My string is dope'
 * - 'my_string_is_dope', true => 'My String Is Dope'
 * - 123_456 => 123 456
 * - abc_efg_456 => Abc efg 456
 * - abc_efg_456, true => Abc Efg 456
 * - abc_456_efg => Abc 456 efg
 * - abc_456_efg, true => Abc 456 Efg
 */
export const snakeCaseToSentenceCase = (
  value: string | null | undefined,
  capitalizeWords = false
): string => {
  if (!value) return "";
  value = value.replace(/(_)/g, " ");
  value = value.replace(/([A-Z])/g, " $1");
  return capitalizeWords
    ? value.replace(/\b\w/g, function (l) {
        return l.toUpperCase();
      })
    : value.charAt(0).toUpperCase() + value.slice(1); // capitalize the first letter - as an example.
};

/**
 * Convert kebab case to sentence case, capitalizing all words
 * - 'your-string-is-dope' => 'Your string is dope'
 * - 'your-string-is-dope', true => 'Your String Is Dope'
 * - 'abcd' => 'abcd'
 * - 'abcd', true => 'Abcd'
 * - 123-456 => 123 456
 * - abc-efg-456 => Abc efg 456
 * - abc-efg-456, true => Abc Efg 456
 * - abc-456-efg => Abc 456 efg
 * - abc-456-efg, true => Abc 456 Efg
 */
export const kebabCaseToSentenceCase = (
  value: string | null | undefined,
  capitalizeWords = false
): string => {
  if (!value) return "";
  value = value.replace(/-([a-z])/g, function (g) {
    return (g[1] ?? "").toUpperCase();
  });
  // separate numbers
  value = value.replace(/-([0-9])/g, function (g) {
    return ` ${g[1] ?? ""}`;
  });
  value = value.replace(/([A-Z])/g, " $1").toLowerCase();

  return capitalizeWords ? capitalize(value) : ucwords(value);
};

/**
 * Convert kebab-case to PascalCase
 * - 'your-string' => 'YourString'
 * - my-string-is-dope => MyStringIsDope
 * - 123-456-efg => 123456Efg
 */
export const kebabCaseToPascalCase = (
  value: string | null | undefined
): string => {
  if (!value) return "";
  value = value.replace(/-([a-z])/g, function (g) {
    return (g[1] ?? "").toUpperCase();
  });
  // handle numbers
  value = value.replace(/-([0-9])/g, function (g) {
    return `${g[1] ?? ""}`;
  });
  value = value.replace(/([A-Z])/g, "$1");
  return value.replace(/\b\w/g, function (l) {
    return l.toUpperCase();
  });
};

/**
 * Convert a string to kebab. The string is trimmed first
 * - abcd => abcd
 * - aBcD => a-bc-d
 * - aB-cD => a-b-c-d
 * - my string => my-string
 * - my-string-is-dope => my-string-is-dope
 * - 123 456 Efg => 123-456-efg
 * -  123 456 Efg  => 123-456-efg
 */
export const kebabCase = (value: string | null | undefined): string => {
  if (!value) return "";

  return value
    .trim()
    .replace(/([a-z])([A-Z])/g, "$1-$2") // get all lowercase letters that are near to uppercase ones
    .replace(/[\s_]+/g, "-") // replace all spaces and low dash
    .toLowerCase();
};

/**
 * Utility to scroll to top in a smooth behaviour
 */
export const scrollToTop = (topOffset = 100) => {
  window.scrollTo({
    top: topOffset,
    behavior: "smooth",
  });
};

/**
 * Count words in a string
 * - "" => 0
 * - "a" => 1
 * - "a b" => 2
 * - "a-b" => 1
 * - null|undefined => 0
 */
export const countWords = (str: string | null | undefined): number => {
  if (!str) return 0;
  return str.split(" ").filter(function (n) {
    return n != "";
  }).length;
};

/**
 * Count words from a html string
 * - "" => 0
 * - "a" => 1
 * - "a b" => 2
 * - "a-b" => 1
 * - null|undefined => 0
 * - "\<p>a\</p>" => 1
 * - \<p>a b\</p> => 2
 * - \<p>a-b\</p> => 1
 * - \<p>\<span>f\</span>a b\</p> => 3
 */
export const countWordsFromHtml = (s: string | null | undefined): number => {
  if (!s) return 0;
  s = s.replace(/<\/?[^>]+(>|$)/g, " "); // strip tags
  s = s.replace(/[.]{2,}/gi, " "); // 2 or more fullstops to 1
  s = s.replace(/[ ]{2,}/gi, " "); // 2 or more space to 1
  s = s.replace(/(^\s*)|(\s*$)/gi, ""); // exclude  start and end white-space
  s = s.replace(/\n /, " "); // exclude newline with a start spacing
  return s.split(" ").filter(function (str) {
    return str != "";
  }).length;
};

/**
 * Get birthday
 * - Date(today - 4 days) => 361  (362 if leap year)
 * - Date(today + 4 days) => 3
 * - Date(today) => 0
 * - null|undefined => null
 */
export const birthdayFromNow = (
  date: Date | string | null | undefined
): number | null => {
  if (!date) return null;
  if (!dayjs(date).isValid()) return null;

  let birthday = new Date(date);

  const today = new Date();

  // Set current year or the next year if you already had birthday this year
  birthday.setFullYear(today.getFullYear());
  if (today > birthday) {
    birthday.setFullYear(today.getFullYear() + 1);
  }

  // Calculate difference between days
  return Math.floor(
    (birthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
};

/**
 * Get random elements from an array
 * Protects from taking more elements than the array length
 * - [1,2,3,4,5], 2 => [3,1]
 * - [1,2,3], 5 => [3,1,2]
 */
export const getRandomElementsFromArray = <T extends any>(
  arr: Array<T>,
  take = 1
): Array<T> => {
  // Shuffle array
  const shuffled = arr.sort(() => 0.5 - Math.random());
  const safeTake = take > arr.length ? arr.length : take;

  // Get sub-array of first n elements after shuffled
  return shuffled.slice(0, safeTake);
};

/**
 * Check if it's Christmas time
 * @param decemberStartDay e.g. 23   -> 23rd December
 * @param januaryNextYearEndDay e.g. 5th -> 5th January
 * @param dateToCheck e.g. new Date() -> Date to check
 * @returns
 */
export const isChristmasTime = (args?: {
  decemberStartDay?: number;
  januaryNextYearEndDay?: number;
  dateToCheck?: Date;
}): boolean => {
  const decemberStartDay = args?.decemberStartDay || 23; // 23rd dec
  const januaryNextYearEndDay = args?.januaryNextYearEndDay || 5; // 5th jan
  const dateToCheck = args?.dateToCheck || new Date();

  // prior
  const dateFrom = new Date(new Date().getFullYear(), 11, decemberStartDay);
  const dateTo = new Date(new Date().getFullYear() + 1, 0, 1); // 1st jan

  // after
  const dateFrom2 = new Date(new Date().getFullYear(), 0, 1); // 1st jan
  const dateTo2 = new Date(new Date().getFullYear(), 0, januaryNextYearEndDay);

  return (
    (dateToCheck >= dateFrom && dateToCheck <= dateTo) ||
    (dateToCheck >= dateFrom2 && dateToCheck <= dateTo2)
  );
};

/**
 * convert a value to a boolean
 * - "true" => true
 * - "false" => false
 * - "1" => true
 * - "0" => false
 * - "yes" => true
 * - "no" => false
 * - "on" => true
 * - default => false
 */
export const boolean = function (value: any): boolean {
  switch (Object.prototype.toString.call(value)) {
    case "[object String]":
      return ["true", "t", "yes", "y", "on", "1"].includes(
        value.trim().toLowerCase()
      );

    case "[object Number]":
      return value.valueOf() === 1;

    case "[object Boolean]":
      return value.valueOf();

    default:
      return false;
  }
};

/**
 * Check if a value is booleanable
 * - "true" => true
 * - "false" => false
 * - "1" => true
 * - "0" => false
 * - "yes" => true
 * - "no" => false
 * - "on" => true
 * - "off" => false
 * - "n" => false
 * - "f" => false
 * - default => false
 */
export const isBooleanable = function (value: any): boolean {
  switch (Object.prototype.toString.call(value)) {
    case "[object String]":
      return [
        "true",
        "t",
        "yes",
        "y",
        "on",
        "1",
        "false",
        "f",
        "no",
        "n",
        "off",
        "0",
      ].includes(value.trim().toLowerCase());

    case "[object Number]":
      return [0, 1].includes(value.valueOf());

    case "[object Boolean]":
      return true;

    default:
      return false;
  }
};

/**
 * Get the ordinal suffix for a number
 * - 1 => "st"
 * - 2 => "nd"
 * - 3 => "rd"
 * - 4 => "th"
 */
export const ordinalSuffix = (number: number): string => {
  if (number > 3 && number < 21) return "th";
  switch (number % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

/**
 * Get the number with ordinal suffix for a number
 * - 1 => "1st"
 * - 2 => "2nd"
 * - 3 => "3rd"
 * - 4 => "4th"
 */
export const nthNumber = (number: number): string => {
  return number + ordinalSuffix(number);
};

/**
 * Generates a strong, random password with customizable character types.
 *
 * @param {object} options - An object to configure the password generation.
 * @param {number} [options.length=12] - The desired length of the password.
 * @param {boolean} [options.includeUppercase=true] - Whether to include uppercase letters (A-Z).
 * @param {boolean} [options.includeNumbers=true] - Whether to include numbers (0-9).
 * @param {boolean} [options.includeSymbols=true] - Whether to include special symbols (!@#$%...).
 * @param {boolean} [options.includeLowercase=true] - Whether to include lowercase letters (a-z). Defaults to true and cannot be false to ensure basic password integrity.
 * @returns {string} The generated strong password.
 * @throws {Error} If no valid character types are selected (should not happen with default lowercase).
 */
export function generateStrongPassword({
  length = 10,
  includeUppercase = true,
  includeNumbers = true,
  includeSymbols = true,
  includeLowercase = true, // Sensible default, and hard to make it false
} = {}): string {
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()-_=+[]{}|;:,.<>?";

  let passwordCharacters = []; // Use an array for easier shuffling
  let availableCharactersPool = "";

  // --- Ensure at least one character of each requested type is included ---

  if (includeLowercase) {
    availableCharactersPool += lowercaseChars;
    passwordCharacters.push(
      lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)]
    );
  } else {
    // If somehow includeLowercase is false, we still need to ensure
    // there's a base set of characters if other types are off.
    // However, it's a strong recommendation to always include lowercase.
    // For this function, we'll make it always true internally if not explicitly false.
    // If you absolutely need to exclude it, adjust logic, but it makes weaker passwords.
    console.warn(
      "It's highly recommended to include lowercase characters for stronger passwords."
    );
  }

  if (includeUppercase) {
    availableCharactersPool += uppercaseChars;
    passwordCharacters.push(
      uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)]
    );
  }
  if (includeNumbers) {
    availableCharactersPool += numberChars;
    passwordCharacters.push(
      numberChars[Math.floor(Math.random() * numberChars.length)]
    );
  }
  if (includeSymbols) {
    availableCharactersPool += symbolChars;
    passwordCharacters.push(
      symbolChars[Math.floor(Math.random() * symbolChars.length)]
    );
  }

  // Fallback if no specific character types are selected but length is requested
  if (availableCharactersPool.length === 0 && length > 0) {
    // If for some reason all options are false, ensure a default set.
    // This is a safety net. Default `includeLowercase=true` should prevent this.
    console.warn(
      "No character types selected, falling back to lowercase only."
    );
    availableCharactersPool = lowercaseChars;
    if (passwordCharacters.length === 0) {
      // Only add if no other characters already added
      passwordCharacters.push(
        lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)]
      );
    }
  }

  if (availableCharactersPool.length === 0) {
    throw new Error(
      "Cannot generate password: No character types available. Please ensure at least one type is included."
    );
  }

  // --- Fill the remaining length with random characters from the pool ---
  for (let i = passwordCharacters.length; i < length; i++) {
    const randomIndex = Math.floor(
      Math.random() * availableCharactersPool.length
    );
    passwordCharacters.push(availableCharactersPool[randomIndex]);
  }

  // --- Shuffle the password characters to ensure randomness ---
  for (let i = passwordCharacters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [passwordCharacters[i], passwordCharacters[j]] = [
      passwordCharacters[j],
      passwordCharacters[i],
    ];
  }

  return passwordCharacters.join("");
}
