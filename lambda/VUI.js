
const { SUPPORTED_LANGUAGES } = require('./config');

const MESSAGES = {
    'en' : {
        
    },
    'pt': {
        
    }
}

function localeIsValid(locale) {

    if (typeof(locale) !== 'string') {
        return false;
    }

    if (locale.length !== 5) {
        return false;
    }

    const [language, region] = locale.split('_');

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

module.exports.localizedMessage = function localizedMessage(key, locale) {
    
    if (!localeIsValid(locale)) {
        throw "LocaleNotSupported";
    }
    
    const [language] = locale.split('_');
    
    return MESSAGES[language][key];
}

module.exports.localizedRandomeWord = function localizedRandomeWord(locale) {
    
}
