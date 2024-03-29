
module.exports.MESSAGES = {

    'en': {
        
        // shared
        'There is {0} missing letters.': 'There is {0} missing letters.',
        'There is 1 missing letter.': 'There is 1 missing letter.',
        'You have {0} lives left.': 'You have {0} lives left.',
        'You have 1 life left.': 'You have 1 life left.',
        'Say any letter...': 'Say any letter...',
        
        // launch request handler
        'Hello, you are in the Hangman Game!': `Hello, you are in the Hangman Game!`,
        'The game has started!': `The game has started!`,
        'The word has {0} letters.': `The word has {0} letters.`,
        'You have {0} lives.': `You have {0} lives.`,
        'Guess a letter.': 'Guess a letter.',
        'Guess any letter...': 'Guess any letter...',
        
        // suggest letter intent handler
        'The letter you\'ve guessed isn\'t valid.': 'The letter you\'ve guessed isn\'t valid.',
        'Try another.': 'Try another.',
        'You\'ve already guessed the letter {0}': 'You\'ve already guessed the letter {0}',
        'You\'ve guessed the letter {0}.': 'You\'ve guessed the letter {0}.',
        'You\'ve hit {0} cases.': 'You\'ve hit {0} cases.',
        'You\'ve hit 1 case.': 'You\'ve hit 1 case.',
        'You\'ve not hit any cases.': 'You\'ve not hit any cases.',
        'Congratulations, you\'ve won! The word is {0}.': 'Congratulations, you\'ve won! The word is {0}.',
        'You\'ve lost, there are no lives left! The word was {0}.': 'You\'ve lost, there are no lives left! The word was {0}.',
        
        // help intent handler
        'Say any letter, ask how you\'re going, or quit! Which one will it be?': 'Say any letter, ask how you\'re going, or quit! Which one will it be?',
        
        // get status intent handler
        'I\'ll speak case by case:': 'I\'ll speak case by case:',
        'empty': 'empty',
        
        // intent reflector handler
        'You\'ve invoked {0}': 'You\'ve invoked {0}',
        
        // error handler
        'Sorry, I didn\'t understand what you\'ve said. Could you please repeat?': 'Sorry, I didn\'t understand what you\'ve said. Could you please repeat?',
        
        // cancel and stop intent handler
        'Bye Bye! It was a nice game!': 'Bye Bye! It was a nice game!',
    },

    'pt': {
        
        // shared
        'There is {0} missing letters.': 'Faltam {0} letras.',
        'There is 1 missing letter.': 'Falta 1 letra.',
        'You have {0} lives left.': 'Restam {0} vidas.',
        'You have 1 life left.': 'Resta 1 vida.',
        'Say any letter...': 'Diga alguma letra...',

        // launch request handler
        'Hello, you are in the Hangman Game!': `Olá, você está no Jogo da Forca!`,
        'The game has started!': `O jogo já começou!`,
        'The word has {0} letters.': `A palavra possui {0} letras.`,
        'You have {0} lives.': `Você tem {0} vidas.`,
        'Guess a letter.': 'Chute uma letra.',
        'Guess any letter...': 'Diga alguma letra...',
        
        // suggest letter intent handler
        'The letter you\'ve guessed isn\'t valid.': 'A letra que você chutou não é válida.',
        'Try another.': 'Tente outra.',
        'You\'ve already guessed the letter {0}': 'Você já chutou a letra {0}',
        'You\'ve guessed the letter {0}.': 'Você chutou a letra {0}.',
        'You\'ve hit {0} cases.': 'Acertou {0} posições.',
        'You\'ve hit 1 case.': 'Acertou 1 posição.',
        'You\'ve not hit any cases.': 'Não acertou nada.',
        'Congratulations, you\'ve won! The word is {0}.': 'Parabéns, você ganhou! A palavra é {0}.',
        'You\'ve lost, there are no lives left! The word was {0}.': 'Acabaram suas vidas, você perdeu! A palavra era {0}.',
        
        // help intent handler
        'Say any letter, ask how you\'re going, or quit! Which one will it be?': 'Diga uma letra, pergunte como está o jogo, ou desista! O que deseja?',
        
        // get status intent handler
        'I\'ll speak case by case:': 'Vou falar casa por casa:',
        'empty': 'vazio',
        
        // intent reflector handler
        'You\'ve invoked {0}': 'You você invocou {0}',
        
        // error handler
        'Sorry, I didn\'t understand what you\'ve said. Could you please repeat?': 'Desculpe, eu não entendi o que você disse. Por favor tente novamente.',
        
        // cancel and stop intent handler
        'Bye Bye! It was a nice game!': 'Tchau! Foi um bom jogo!',
    },
}

module.exports.WORDS = {
    'en': [
        'society',
        'agile',
        'curriculum',
        'cry',
        'fork',
        'shy',
        'attack',
        'rocket',
        'straight',
        'federation',
        'behead',
        'passive',
        'guilt',
        'wear',
        'eavesdrop',
    ],
    'pt': [
        'ventilador',
        'parede',
        'porta',
        'celular',
        'rato',
        'macarrao',
        'vida',
        'jardim',
        'biblioteca',
        'cintura',
        'gaiola',
        'gelatina',
        'pesquisa',
        'estrada',
        'abacaxi',
    ],
}
