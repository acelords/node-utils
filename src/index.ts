import numeral from 'numeral'
import pluralizeLib from 'pluralize'
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime.js";
dayjs.extend(relativeTime);

const MIN_TIMESTAMP = 75600000;
const MIN_DATE = 'January 2, 1970';

/**
 * format a date
 * date => 22nd Jun 2021, 2:00 pm
 * https://day.js.org/docs/en/display/format
 */
export const formatDate = (dt: Date | string | number | null | undefined, format = 'D MMM, YYYY'): string => {
    if (!dt) return "";
    if (isNumeric(dt.toString())) {
        if (Number(dt) < MIN_TIMESTAMP) return ""
        return dayjs.unix(Number(dt)).format(format);
    }
    if (!dayjs(dt).isValid() || dayjs(dt).isBefore(MIN_DATE)) return ""
    return dayjs(dt).format(format);
}

/**
* format a date and include time by default
*/
export const formatDateTime = (dt: Date | string | number | null | undefined, format = 'D MMM, YYYY hh:mm a'): string => {
    if (!dt) return "";
    if (isNumeric(dt.toString())) {
        if (Number(dt) < MIN_TIMESTAMP) return ""
        return dayjs.unix(Number(dt)).format(format);
    }
    if (!dayjs(dt).isValid() || dayjs(dt).isBefore(MIN_DATE)) return ""
    return dayjs(dt).format(format);
}

/**
 * return 24-hour time from an  ISO 8601  date
 */
export const getTimeFromDate = (dt: string | number | Date, format = "HH:mm"): string => {
    if (isNumeric(dt.toString())) {
        if (Number(dt) < MIN_TIMESTAMP) return ""
        return dayjs.unix(Number(dt)).format(format);
    }
    if (!dayjs(dt).isValid() || dayjs(dt).isBefore(MIN_DATE)) return ""
    return dayjs(dt).format(format);
};

/**
* generate a random number, min inclusive, max NOT inclusive
* - Math.random() -> a number from 0 to <1
*/
export const randomNumber = (min = 0, max = 10000) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * - isNumeric('abcd')         // false
 * - isNumeric('123a')         // false
 * - isNumeric('1')         // true
 * - isNumeric('1234567890')         // true
 * - isNumeric('-23')         // true
 * - isNumeric('1234')         // true
 * - isNumeric('1234n')         // true
 * - isNumeric('123.4')         // false
 * - isNumeric('')         // false
 * - isNumeric(undefined)         // false
 * - isNumeric(null)         // false
 */
export function isNumeric(value: string | number | undefined | null): boolean {
    if (!value) return false;
    return /^-?\d+$/.test(value.toString());
}

/**
 * check how long a date is from now
 * - date => 2 days ago
 */
export const fromNow = (date: Date | string | null | undefined, addSuffix = undefined) => {
    if (!date) return "";
    if (!dayjs(date).isValid()) return ""
    return dayjs(date).fromNow(addSuffix);
};

/**
 * Capitalize first word in a string.
 * Does NOT lowerCase the rest
 */
export const ucwords = (str: string): string => str.substring(0, 1).toUpperCase() + str.substring(1)

/**
 * get a substring of a string
 */
export const substring = (str: string | null | undefined, end: number): string => str ? str.substring(0, end) : ''

/**
 * format a number to 2dp.
 * - 1000 becomes 1,000.00.
 * - If toInt=true, 1000000 becomes 1,000,000.
 * - Displaying other groupings/separators is possible, look at the docs http://numeraljs.com/
 */
export const numberFormat = (value: string | number | undefined | null, toInt = false): string => {
    if (!value || !isNumeric(value)) return ""
    const format = toInt ? '0,0' : "0,0.00"
    return numeral(value).format(format)
}

/**
 * format currency. Value passed must be in cents.
 * - 1500000 becomes 15,000.00
 * - 123456 becomes 1,234.56
 */
export const formatCurrency = (value: string | number | undefined | null): string => {
    if (!value || !isNumeric(value)) return ""
    const amount = Number(value.toString()) / 100;
    return numeral(amount).format("0,0.00")
}

/**
 * slugify a string.
 * - iwef k[wef #mgt% becomes iwef-kwef-mgt
 */
export const slugify = (str: string | null | undefined): string => {
    if (!str) return ''
    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/**
* strip html tags an dimg tags from a html string
* @param htmlString string
* @returns string
*/
export const stripTags = (htmlString: string) => {
    return htmlString.replaceAll(/(<([^>]+)>)/gi, '').replace(/<img[^>]*>/gi, '');
}

/**
 * pluralize a word
 */
export function plural(value: string | null | undefined): string {
    if (!value) return ""
    return pluralizeLib.plural(value)
}

/**
 * singularize a word
 */
export function singular(value: string | null | undefined): string {
    if (!value) return ""
    return pluralizeLib.singular(value)
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
export function pluralize(value: string | null | undefined, counter: number): string {
    if (!value) return ""
    if (counter < 2 && counter > 0) {
        return pluralizeLib.singular(value)
    }

    return pluralizeLib.plural(value)
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
    ...arr.slice(index)
]
