
module.exports = {

    canHandle() {
        return true;
    },

    handle(handlerInput, error) {

        console.log(`~~~~ Error handled: ${error.message}`); // you can see those on CloudWatch

        const speechText = `Desculpe, eu não entendi o que você disse. Por favor tente novamente.`;

        return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt(speechText)
                .getResponse();
    }
}
