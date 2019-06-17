
// `Olá, você está no Jogo da Forca!`,
//             `O jogo já começou!`,
//             `A palavra possui ${chosenWord.length} letras.`,
//             `Você tem ${INITIAL_LIVES} vidas.`,
//             `Chute uma letra.`,
//         ];

//         return handlerInput.responseBuilder
//                 .speak(sentences.join(' '))
//                 .reprompt('Diga alguma letra...')


module.exports.MESSAGES = {
    'en' : {
        'Hello, you are in the Hangman Game!': `Hello, you are in the Hangman Game!`,
        'The game has started!': `The game has started!`,
        'The word has {0} letters.': `The word has {0} letters.`,
    },
    'pt': {
        'Hello, you are in the Hangman Game!': `Olá, você está no Jogo da Forca!`,
        'The game has started!': `O jogo já começou!`,
        'The word has {0} letters.': `A palavra possui {0} letras.`,
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
