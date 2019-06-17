
// Constants
const { VALID_LETTERS } = require('../config');

// Utils
const {
    parseLetter,
    p,
} = require('../util');

// Game Logic
const {
    hasBeenGuessed,
    countHits,
    countLives,
    countMissingLetters,
} = require('../game');

// i18n
const { messageLocalizer } = require('../i18n');

module.exports = {
    
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'SuggestLetterIntent';
    },
    
    async handle(handlerInput) {
        
        // get request slot (voice parameter)
        const request = handlerInput.requestEnvelope.request;
        const slots = request.intent.slots;
        const letter = parseLetter(slots.letter.value);
        
        // get request locale
        const locale = request.locale;
        const l7d = messageLocalizer(locale);

        let speechText = '';
        let ended = false;

        // get previously persisted attributes
        const attributes = await handlerInput.attributesManager.getSessionAttributes();
        const { word } = attributes;
        let { triedLetters } = attributes;

        // finish shortcut
        const speak = (speechText, shouldEndSession) => {
            return handlerInput.responseBuilder
                    .speak(speechText)
                    .reprompt(l7d('Say any letter...'))
                    .withShouldEndSession(shouldEndSession || false)
                    .getResponse()
        };

        // check if guessed letter is valid
        // else stop here
        if (!VALID_LETTERS.includes(letter)) {
            
            const msg1 = l7d('The letter you\'ve guessed isn\'t valid.');
            const msg2 = l7d('Try another.');

            return speak(p(msg1) + p(msg2));
        }

        // check if letter hasnt been guessed yet
        // else stop here
        if (hasBeenGuessed(letter, triedLetters)) {
            
            const msg1 = l7d('You\'ve already guessed the letter {0}', letter);
            const msg2 = l7d('Try another.');
            
            return speak(p(msg1) + p(msg2));
        }

        // persist new tried letter
        attributes.triedLetters = triedLetters = triedLetters.concat(letter);
        handlerInput.attributesManager.setSessionAttributes(attributes);

        // get hit, life and missing letters count
        const hitCount = countHits(letter, word);
        const lifeCount = countLives(word, triedLetters);
        const missingCount = countMissingLetters(word, triedLetters);
        
                        // suggest letter intent handler
        'Say any letter...'
        'The letter you\'ve guessed isn\'t valid.'
        'Try another.'
        'You\'ve already guessed the letter {0}'
        'You\'ve guessed the letter {0}.'
        'You\'ve hit {0} cases.'
        'You\'ve hit 1 case.'
        'You\'ve not hit any cases.'
        'There is {0} missing letters.'
        'There is 1 missing letter.'
        'Congratulations, you\'ve won! The word is {0}.'
        'You have {0} lives left.'
        'You have 1 life left.'
        'You\'ve lost, there are no lives left! The word was {0}.'

        // say guessed letter
        speechText += p(l7d('You\'ve guessed the letter {0}.', letter));

        // say hit count
        if (hitCount > 1) {
            speechText += p(l7d('You\'ve hit {0} cases.', hitCount));
        } else if (hitCount === 1) {
            speechText += p(l7d('You\'ve hit 1 case.'));
        } else {
            speechText += p(l7d('You\'ve not hit any cases.'));
        }
        
        // say missing count (or tell user it've won)
        if (missingCount > 1) {
            speechText += p(l7d('There is {0} missing letters.', missingCount));
        } else if (missingCount === 1) {
            speechText += p(l7d('There is 1 missing letter.'));
        } else {
            return speak(l7d('Congratulations, you\'ve won! The word is {0}.', word), true);
        }

        // say life count (or tell user it've lost)
        if (lifeCount > 1) {
            speechText += p(l7d('You have {0} lives left.', lifeCount));
        } else if (lifeCount === 1) {
            speechText += p(l7d('You have 1 life left.'));
        } else {
            return speak(l7d(`Acabaram suas vidas, você perdeu! A palavra era  ${word}.`), true);
        }
        
        return speak(speechText);
    }
}
