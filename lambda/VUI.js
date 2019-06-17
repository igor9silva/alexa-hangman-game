
//             `Chute uma letra.`,
//         ];

//         return handlerInput.responseBuilder
//                 .speak(sentences.join(' '))
//                 .reprompt('Diga alguma letra...')


module.exports.MESSAGES = {
    'en' : {
        
        // words
        'life': 'life',
        'lives': 'lives',
        
        // launch request handler
        'Hello, you are in the Hangman Game!': `Hello, you are in the Hangman Game!`,
        'The game has started!': `The game has started!`,
        'The word has {0} letters.': `The word has {0} letters.`,
        'You have {0} {1}.': `You have {0} {1}.`,
        'Guess a letter.': 'Guess a letter.',
        'Guess any letter...': 'Guess any letter...',
    },
    'pt': {

        // words
        'life': 'vida',
        'lives': 'vidas',

        // launch request handler
        'Hello, you are in the Hangman Game!': `Olá, você está no Jogo da Forca!`,
        'The game has started!': `O jogo já começou!`,
        'The word has {0} letters.': `A palavra possui {0} letras.`,
        'You have {0} {1}.': `Você tem {0} {1}.`,
        'Guess a letter.': 'Chute uma letra.',
        'Guess any letter...': 'Diga alguma letra...',
    },
}

module.exports.WORDS = {
    'en': [
    ],
    'pt': [
        'ventilador',
        'parede',
        'porta',
        'celular',
        'rato',
        'macarrao',
    ],
}
