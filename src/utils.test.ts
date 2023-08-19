import { formatCurrency, formatDateTime, fromNow, getTimeFromDate, insertIntoArray, isNumeric, numberFormat, plural, pluralize, randomNumber, singular, slugify, stripTags, substring, ucwords } from './index'
import dayjs from 'dayjs';

/*======== formatDateTime =============*/
test("formatDateTime - can format a date in string format", () => {
    const now = new Date().toISOString()
    const format = 'D MMM, YYYY'
    const formatted = dayjs(now).format(format)
    expect(formatDateTime(now, format)).toBe(formatted);
});

test("formatDateTime - can format a date", () => {
    const now = new Date()
    const format = 'D MMM, YYYY'
    const formatted = dayjs(now).format(format)
    expect(formatDateTime(now, format)).toBe(formatted);
});

test("formatDateTime - returns an empty string when nullish value is passed", () => {
    expect(formatDateTime(null)).toBe("");
    expect(formatDateTime(undefined)).toBe("");
});

test("formatDateTime - can format a date in unixTime (number) format", () => {
    const now = 1602162242
    const format = 'D MMM, YYYY'
    const formatted = dayjs.unix(now).format(format)
    expect(formatDateTime(now, format)).toBe(formatted);
});

test("formatDateTime - returns empty string on invalid date", () => {
    expect(formatDateTime("abc")).toBe("");
    expect(formatDateTime("1000")).toBe("");
    expect(formatDateTime("Jan 14, 1000")).toBe("");
});

/*======== getTimeFromDate =============*/
test("getTimeFromDate - can format a date in string format to time", () => {
    const now = new Date().toISOString()
    const format = 'HH:mm'
    const formatted = dayjs(now).format(format)
    expect(getTimeFromDate(now, format)).toBe(formatted);
});

test("getTimeFromDate - can format a date format to time", () => {
    const now = new Date()
    const format = 'HH:mm'
    const formatted = dayjs(now).format(format)
    expect(getTimeFromDate(now, format)).toBe(formatted);
});

test("getTimeFromDate - can format a date in unixTime (number) format to time", () => {
    const now = 1602162242
    const format = 'HH:mm'
    const formatted = dayjs.unix(now).format(format)
    expect(getTimeFromDate(now, format)).toBe(formatted);
});

/*======== randomNumber =============*/
test("randomNumber - can get a random number given min and max", () => {
    expect(randomNumber(10, 80)).toBeGreaterThanOrEqual(10);
    expect(randomNumber(10, 80)).toBeLessThan(80);
    expect(randomNumber(10, 11)).toBeGreaterThanOrEqual(10);
    expect(randomNumber(10, 11)).toBeLessThan(11);
});

/*======== randomNumber =============*/
test("isNumeric - check if a string|number is numeric", () => {
    expect(isNumeric('abcd')).toBeFalsy();
    expect(isNumeric('123a')).toBeFalsy();
    expect(isNumeric('1')).toBeTruthy();
    expect(isNumeric('1234567890')).toBeTruthy();
    expect(isNumeric('-23')).toBeTruthy();
    expect(isNumeric('1234')).toBeTruthy();
    // expect(isNumeric('1234e')).toBeTruthy();
    expect(isNumeric('123.4')).toBeFalsy();
    expect(isNumeric('')).toBeFalsy();
    expect(isNumeric(undefined)).toBeFalsy();
    expect(isNumeric(null)).toBeFalsy();
});

/*======== fromNow =============*/
test("fromNow - can get the time fromNow", () => {
    expect(fromNow('abcd')).toBe("");
    expect(fromNow(null)).toBe("");
    expect(fromNow(undefined)).toBe("");

    let dt = dayjs().subtract(1, 'day').toISOString()
    expect(fromNow(dt)).toBe("a day ago");
    dt = dayjs().add(1, 'day').toISOString()
    expect(fromNow(dt)).toBe("in a day");
});

/*======== ucwords =============*/
test("ucwords - capitalizes first word in a string", () => {
    expect(ucwords('abcd')).toBe("Abcd");
    expect(ucwords('abcd efgh')).toBe("Abcd efgh");
    expect(ucwords('ABCD')).toBe("ABCD");
    expect(ucwords('aBCD')).toBe("ABCD");
});

/*======== substring =============*/
test("substring - can get a substring of a string", () => {
    expect(substring('abcd', 2)).toBe("ab");
    expect(substring(null, 2)).toBe("");
    expect(substring(undefined, 2)).toBe("");
    expect(substring('abcdef', 1)).toBe("a");
    expect(substring('abcd', 4)).toBe("abcd");
    expect(substring('abc', 10)).toBe("abc");
});

/*======== numberFormat =============*/
test("numberFormat - can format numeric strings and numbers", () => {
    expect(numberFormat('abcd')).toBe("");
    expect(numberFormat(null)).toBe("");
    expect(numberFormat(undefined)).toBe("");
    expect(numberFormat('123456')).toBe("123,456.00");
    expect(numberFormat('123456', true)).toBe("123,456");
});

/*======== formatCurrency =============*/
test("formatCurrency - can format numeric strings and numbers to currency", () => {
    expect(formatCurrency('abcd')).toBe("");
    expect(formatCurrency(null)).toBe("");
    expect(formatCurrency(undefined)).toBe("");
    expect(formatCurrency('123456')).toBe("1,234.56");
    expect(formatCurrency('12345600')).toBe("123,456.00");
});

/*======== slugify =============*/
test("slugify - can return a sane slug from a string", () => {
    expect(slugify('abcd')).toBe("abcd");
    expect(slugify(null)).toBe("");
    expect(slugify(undefined)).toBe("");
    expect(slugify('123456 abcd')).toBe("123456-abcd");
    expect(slugify('iwef k[wef #mgt%')).toBe("iwef-kwef-mgt");
});

/*======== stripTags =============*/
test("stripTags - can strip tags from a html string", () => {
    expect(stripTags('abcd')).toBe("abcd");
    expect(stripTags('<p>abcd</p>')).toBe("abcd");
});

/*======== plural =============*/
test("plural - can pluralize a string", () => {
    expect(plural(null)).toBe("");
    expect(plural(undefined)).toBe("");
    expect(plural('man')).toBe("men");
    expect(plural('men')).toBe("men");
    expect(plural('cat')).toBe("cats");
    expect(plural('abcd')).toBe("abcds");
});

/*======== plural =============*/
test("singular - can singularize a string", () => {
    expect(singular(null)).toBe("");
    expect(singular(undefined)).toBe("");
    expect(singular('men')).toBe("man");
    expect(singular('cats')).toBe("cat");
    expect(singular('abcds')).toBe("abcd");
});

/*======== pluralize =============*/
test("pluralize - can singularize a string", () => {
    expect(pluralize(null, 1)).toBe("");
    expect(pluralize(undefined, 1)).toBe("");
    expect(pluralize('man', 1)).toBe("man");
    expect(pluralize('man', 2)).toBe("men");
    expect(pluralize('cat', 0)).toBe("cats");
    expect(pluralize('cat', 1)).toBe("cat");
    expect(pluralize('cat', 2)).toBe("cats");
    expect(pluralize('abcds', 0)).toBe("abcds");
    expect(pluralize('abcds', 1)).toBe("abcd");
    expect(pluralize('abcds', 2)).toBe("abcds");
});

/*======== insertIntoArray =============*/
test("insertIntoArray - can insert another array inside an array at a certain index", () => {
    expect(insertIntoArray([1, 2, 3, 4], 2, [8, 9]).join(',')).toBe([1, 2, 8, 9, 3, 4].join(','));
    expect(insertIntoArray([1, 2], 5, [8, 9]).join(',')).toBe([1, 2, 8, 9].join(','));
});
