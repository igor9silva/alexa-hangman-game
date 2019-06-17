
// Constants
const { SUPPORTED_LANGUAGES } = require('./config');

// VUI
const { MESSAGES, WORDS } = require('./VUI');

// Utils
const { randomIndex } = require('./util');

function localeIsValid(locale) {

    if (typeof(locale) !== 'string') {
        return false;
    }

    if (locale.length !== 5) {
        return false;
    }

    const [language, region] = locale.split('-');

    if (language === undefined || language.length !== 2) {
        return false;
    }

    if (region === undefined || region.length !== 2) {
        return false;
    }

    if (!Object.keys(SUPPORTED_LANGUAGES).includes(language.toLowerCase())) {
        return false;
    }

    const regions = SUPPORTED_LANGUAGES[language];

    if (!regions.includes(region.toUpperCase())) {
        return false;
    }

    return true;
}

module.exports.messageLocalizer = function messageLocalizer(locale) {
    
    return function localizedMessage(key, ...params) {

        if (!localeIsValid(locale)) {
            throw "LocaleNotSupported";
        }

        const [language] = locale.split('-');

        let value = MESSAGES[language][key];

        // replace `{0}` for params[0], `{1}` for params[1], etc
        params.forEach((param, i) => value = value.replace(`{${i}}`, param));

        return value;
    }
}

module.exports.localizedRandomWord = function localizedRandomeWord(locale) {

    if (!localeIsValid(locale)) {
        throw "LocaleNotSupported";
    }
    
    const [language] = locale.split('-');
    const words = WORDS[language];

    return words[randomIndex(0, words.length)];
}
