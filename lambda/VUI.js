
const LANGUAGES = {
    'en': ['US', 'UK', 'AU', 'CA', 'IN'],
    'pt': ['BR', 'PT'],
};

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

    if (!Object.keys(LANGUAGES).includes(language.toLowerCase())) {
        return false;
    }

    const regions = LANGUAGES[language];

    if (!regions.includes(region)) {
        return false;
    }

    return true;
}

function localizedMessage(key, locale) {
    
    if (!localeIsValid(locale)) {
        throw "LocaleNotSupported";
    }
    
    const [language] = locale.split('_');
    
    return MESSAGES[language][key];
}