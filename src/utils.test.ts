import { birthdayFromNow, camelCaseToSentenceCase, capitalize, countWords, countWordsFromHtml, formatCurrency, formatDate, formatDateTime, formatNumber, fromNow, getTimeFromDate, insertIntoArray, isEmail, isEmpty, isNumeric, isPhoneNumber, kebabCase, kebabCaseToPascalCase, kebabCaseToSentenceCase, numberFormat, plural, pluralize, randomNumber, randomString, singular, slugify, snakeCaseToSentenceCase, stripTags, substring, ucwords } from './index'
import dayjs from 'dayjs';

/*======== formatDate =============*/
test("formatDate - can format a date in string format", () => {
    const now = new Date().toISOString()
    const format = 'D MMM, YYYY'
    const formatted = dayjs(now).format(format)
    expect(formatDate(now, format)).toBe(formatted);
});

test("formatDate - can format a date", () => {
    const now = new Date()
    const format = 'D MMM, YYYY'
    const formatted = dayjs(now).format(format)
    expect(formatDate(now, format)).toBe(formatted);
});

test("formatDate - returns an empty string when nullish value is passed", () => {
    expect(formatDate(null)).toBe("");
    expect(formatDate(undefined)).toBe("");
});

test("formatDate - can format a date in unixTime (number) format", () => {
    const now = 1602162242
    const format = 'D MMM, YYYY'
    const formatted = dayjs.unix(now).format(format)
    expect(formatDate(now, format)).toBe(formatted);
});

test("formatDate - returns empty string on invalid date", () => {
    expect(formatDate("abc")).toBe("");
    expect(formatDate("1000")).toBe("");
    expect(formatDate("Jan 14, 1000")).toBe("");
});

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

/*======== randomString =============*/
test("randomString - can get a random string given length", () => {
    expect(randomString(10).length).toBe(10);
    expect(randomString(10).length).toBe(10);
    const numerics = randomString(100).replace(/^\D+/g, '');
    expect(numerics.length).toBe(0);
});

test("randomString - can get a random string including numbers when specified given length", () => {
    expect(randomString(10, true).length).toBe(10);
    const numerics = randomString(100, true).replace(/^\D+/g, '');
    expect(numerics.length).toBeGreaterThanOrEqual(1);
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
    expect(numberFormat("0")).toBe("0.00");
    expect(numberFormat(0)).toBe("0.00");
    expect(numberFormat("0", true)).toBe("0");
    expect(numberFormat(0, true)).toBe("0");
    expect(numberFormat('123456')).toBe("123,456.00");
    expect(numberFormat('123456', true)).toBe("123,456");
});

test("formatNumber - can format numeric strings and numbers", () => {
    expect(formatNumber('abcd')).toBe("");
    expect(formatNumber(null)).toBe("");
    expect(formatNumber(undefined)).toBe("");
    expect(formatNumber("0")).toBe("0.00");
    expect(formatNumber(0)).toBe("0.00");
    expect(formatNumber("0", true)).toBe("0");
    expect(formatNumber(0, true)).toBe("0");
    expect(formatNumber('123456')).toBe("123,456.00");
    expect(formatNumber('123456', true)).toBe("123,456");
});

/*======== formatCurrency =============*/
test("formatCurrency - can format numeric strings and numbers to currency", () => {
    expect(formatCurrency('abcd')).toBe("");
    expect(formatCurrency(null)).toBe("");
    expect(formatCurrency(undefined)).toBe("");
    expect(formatCurrency("0")).toBe("0.00");
    expect(formatCurrency(0)).toBe("0.00");
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
    expect(slugify('iwef âẽèéë eded')).toBe("iwef-aeeee-eded");
    expect(slugify('iwef .--/,;: âẽèéë .--/,;: eded')).toBe("iwef-aeeee-eded");
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

/*======== isPhoneNumber =============*/
test("isPhoneNumber - can check if a string is a phone number", () => {
    expect(isPhoneNumber("123456789")).toBeTruthy();
    expect(isPhoneNumber("+123456789")).toBeTruthy();
    expect(isPhoneNumber("0123456789")).toBeTruthy();
    expect(isPhoneNumber("p123456789")).toBeFalsy();
    expect(isPhoneNumber("~123456789")).toBeFalsy();
});

/*======== isEmail =============*/
test("isEmail - can check if a string is an email", () => {
    expect(isEmail("info@acelords.com")).toBeTruthy();
    expect(isEmail("infoacelords.com")).toBeFalsy();
    expect(isEmail("info@acelordscom")).toBeFalsy();
    expect(isEmail("+123456789")).toBeFalsy();
    expect(isEmail("")).toBeFalsy();
    expect(isEmail("p123456789")).toBeFalsy();
    expect(isEmail(null)).toBeFalsy();
    expect(isEmail(undefined)).toBeFalsy();
});

/*======== isEmpty =============*/
test("isEmpty - can check if a string, array, or object is empty", () => {
    expect(isEmpty("info@acelords.com")).toBeFalsy();
    expect(isEmpty("+123456789")).toBeFalsy();
    expect(isEmpty("+")).toBeFalsy();
    expect(isEmpty(".")).toBeFalsy();
    expect(isEmpty("")).toBeTruthy();
    expect(isEmpty(null)).toBeTruthy();
    expect(isEmpty(undefined)).toBeTruthy();
    expect(isEmpty([])).toBeTruthy();
    expect(isEmpty([1])).toBeFalsy();
    expect(isEmpty(["1"])).toBeFalsy();
    expect(isEmpty({})).toBeTruthy();
    expect(isEmpty({ a: 1 })).toBeFalsy();
    expect(isEmpty({ a: "1" })).toBeFalsy();
});


/*======== ucwords =============*/
test("ucwords - capitalizes first word in a string", () => {
    expect(ucwords('abcd')).toBe("Abcd");
    expect(ucwords('abcd efgh')).toBe("Abcd efgh");
    expect(ucwords('ABCD')).toBe("ABCD");
    expect(ucwords('aBCD')).toBe("ABCD");
    expect(ucwords("0")).toBe("0");
    expect(ucwords(null)).toBe("");
    expect(ucwords(undefined)).toBe("");
    expect(ucwords(' aBCD    ')).toBe("ABCD");
    expect(ucwords(' a B C D    ')).toBe("A B C D");
});

/*======== capitalize =============*/
test("capitalize - capitalizes every first word in a string", () => {
    expect(capitalize('abcd')).toBe("Abcd");
    expect(capitalize('abcd efgh')).toBe("Abcd Efgh");
    expect(capitalize('ABCD')).toBe("ABCD");
    expect(capitalize('aBCD')).toBe("ABCD");
    expect(capitalize("0")).toBe("0");
    expect(capitalize(null)).toBe("");
    expect(capitalize(undefined)).toBe("");
});

/*======== camelCaseToSentenceCase =============*/
test("camelCaseToSentenceCase - converts camelCase string to Sentence case", () => {
    expect(camelCaseToSentenceCase('abcd')).toBe("Abcd");
    expect(camelCaseToSentenceCase('myString')).toBe("My string");
    expect(camelCaseToSentenceCase('myStringIsDope')).toBe("My string is dope");

    expect(camelCaseToSentenceCase('abcd', true)).toBe("Abcd");
    expect(camelCaseToSentenceCase('myString', true)).toBe("My String");
    expect(camelCaseToSentenceCase('myStringIsDope', true)).toBe("My String Is Dope");

    // tests for those who'd pass nonsense arguments
    expect(camelCaseToSentenceCase('abcd efgh', true)).toBe("Abcd efgh");
    expect(camelCaseToSentenceCase('ABCD', true)).toBe("A B C D");
    expect(camelCaseToSentenceCase('aBCD', true)).toBe("A B C D");
    expect(camelCaseToSentenceCase('aBcd', true)).toBe("A Bcd");
    expect(camelCaseToSentenceCase('aBcd efg', true)).toBe("A Bcd efg");
    expect(camelCaseToSentenceCase('aBcd Efg', true)).toBe("A Bcd  Efg");
    expect(camelCaseToSentenceCase("0", true)).toBe("0");
    expect(camelCaseToSentenceCase("123456")).toBe("123456");
    expect(camelCaseToSentenceCase("123 456", true)).toBe("123 456");
    expect(camelCaseToSentenceCase("abc456", true)).toBe("Abc456");
    expect(camelCaseToSentenceCase(null, true)).toBe("");
    expect(camelCaseToSentenceCase(undefined, true)).toBe("");
});

/*======== snakeCaseToSentenceCase =============*/
test("snakeCaseToSentenceCase - converts snake_case string to Sentence case", () => {
    expect(snakeCaseToSentenceCase('abcd')).toBe("Abcd");
    expect(snakeCaseToSentenceCase('my_string')).toBe("My string");
    expect(snakeCaseToSentenceCase('my_string_is_dope')).toBe("My string is dope");

    expect(snakeCaseToSentenceCase('abcd', true)).toBe("Abcd");
    expect(snakeCaseToSentenceCase('my_string', true)).toBe("My String");
    expect(snakeCaseToSentenceCase('my_string_is_dope', true)).toBe("My String Is Dope");

    // tests for those who'd pass nonsense arguments
    expect(snakeCaseToSentenceCase("0", true)).toBe("0");
    expect(snakeCaseToSentenceCase("123_456")).toBe("123 456");
    expect(snakeCaseToSentenceCase("123_456", true)).toBe("123 456");
    expect(snakeCaseToSentenceCase("abc_456")).toBe("Abc 456");
    expect(snakeCaseToSentenceCase("abc_456", true)).toBe("Abc 456");
    expect(snakeCaseToSentenceCase("abc_efg_456")).toBe("Abc efg 456");
    expect(snakeCaseToSentenceCase("abc_efg_456", true)).toBe("Abc Efg 456");
    expect(snakeCaseToSentenceCase("abc_456_efg")).toBe("Abc 456 efg");
    expect(snakeCaseToSentenceCase("abc_456_efg", true)).toBe("Abc 456 Efg");
    expect(snakeCaseToSentenceCase(null, true)).toBe("");
    expect(snakeCaseToSentenceCase(undefined, true)).toBe("");
});

/*======== kebabCaseToSentenceCase =============*/
test("kebabCaseToSentenceCase - converts kebab-case string to Sentence case", () => {
    expect(kebabCaseToSentenceCase('abcd')).toBe("Abcd");
    expect(kebabCaseToSentenceCase('my-string')).toBe("My string");
    expect(kebabCaseToSentenceCase('my-string-is-dope')).toBe("My string is dope");
    expect(kebabCaseToSentenceCase('My string is dope')).toBe("My string is dope");

    expect(kebabCaseToSentenceCase('abcd', true)).toBe("Abcd");
    expect(kebabCaseToSentenceCase('my-string', true)).toBe("My String");
    expect(kebabCaseToSentenceCase('my-string-is-dope', true)).toBe("My String Is Dope");
    expect(kebabCaseToSentenceCase('My String Is Dope', true)).toBe("My  String  Is  Dope");

    // tests for those who'd pass nonsense arguments
    expect(kebabCaseToSentenceCase("0", true)).toBe("0");
    expect(kebabCaseToSentenceCase("123-456")).toBe("123 456");
    expect(kebabCaseToSentenceCase("123-456", true)).toBe("123 456");
    expect(kebabCaseToSentenceCase("123-456-efg")).toBe("123 456 efg");
    expect(kebabCaseToSentenceCase("123-456-efg", true)).toBe("123 456 Efg");
    expect(kebabCaseToSentenceCase(null, true)).toBe("");
    expect(kebabCaseToSentenceCase(undefined, true)).toBe("");
});

/*======== kebabCaseToPascalCase =============*/
test("kebabCaseToPascalCase - converts kebab-case string to PascalCase", () => {
    expect(kebabCaseToPascalCase('abcd')).toBe("Abcd");
    expect(kebabCaseToPascalCase('my-string')).toBe("MyString");
    expect(kebabCaseToPascalCase('my-string-is-dope')).toBe("MyStringIsDope");
    expect(kebabCaseToPascalCase('MyStringIsDope')).toBe("MyStringIsDope");

    // tests for those who'd pass nonsense arguments
    expect(kebabCaseToPascalCase("0")).toBe("0");
    expect(kebabCaseToPascalCase("123-456")).toBe("123456");
    expect(kebabCaseToPascalCase("123-456-efg")).toBe("123456Efg");
    expect(kebabCaseToPascalCase(null)).toBe("");
    expect(kebabCaseToPascalCase(undefined)).toBe("");
});

/*======== kebabCase =============*/
test("kebabCase - converts string to kebab-case", () => {
    expect(kebabCase('abcd')).toBe("abcd");
    expect(kebabCase('aBcD')).toBe("a-bc-d");
    expect(kebabCase('aB-cD')).toBe("a-b-c-d");
    expect(kebabCase('my string')).toBe("my-string");
    expect(kebabCase('my-string-is-dope')).toBe("my-string-is-dope");

    // tests for those who'd pass nonsense arguments
    expect(kebabCase("0")).toBe("0");
    expect(kebabCase("123 456")).toBe("123-456");
    expect(kebabCase("123 456 efg")).toBe("123-456-efg");
    expect(kebabCase("123 456 Efg")).toBe("123-456-efg");
    expect(kebabCase(" 123 456 Efg ")).toBe("123-456-efg");
    expect(kebabCase(null)).toBe("");
    expect(kebabCase(undefined)).toBe("");
});

/*======== countWords =============*/
test("countWords - can get number of words in a string", () => {
    expect(countWords("")).toBe(0);
    expect(countWords("a")).toBe(1);
    expect(countWords("a b")).toBe(2);
    expect(countWords("a-b")).toBe(1);
    expect(countWords(null)).toBe(0);
    expect(countWords(undefined)).toBe(0);
});

/*======== countWordsFromHtml =============*/
test("countWordsFromHtml - can get number of words in a string", () => {
    expect(countWordsFromHtml("")).toBe(0);
    expect(countWordsFromHtml("a")).toBe(1);
    expect(countWordsFromHtml("a b")).toBe(2);
    expect(countWordsFromHtml("a-b")).toBe(1);
    expect(countWordsFromHtml(null)).toBe(0);
    expect(countWordsFromHtml(undefined)).toBe(0);
    expect(countWordsFromHtml("<p>a</p>")).toBe(1);
    expect(countWordsFromHtml("<p>a b</p>")).toBe(2);
    expect(countWordsFromHtml("<p>a-b</p>")).toBe(1);
    expect(countWordsFromHtml("<p><span>f</span>a b</p>")).toBe(3);
});

/*======== birthdayFromNow =============*/
test("birthdayFromNow - can get days to next birthday", () => {
    expect(birthdayFromNow(dayjs('2023-08-23').subtract(4, 'days').toDate())).toBe(361);
    expect(birthdayFromNow(dayjs('2023-08-23').add(4, 'days').toDate())).toBe(3);
    expect(birthdayFromNow(dayjs().toDate())).toBe(0);
    expect(birthdayFromNow(null)).toBe(null);
    expect(birthdayFromNow(undefined)).toBe(null);
});
