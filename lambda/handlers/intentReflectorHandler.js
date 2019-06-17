
module.exports = {

    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest';
    },

    handle(handlerInput) {

        const intentName = handlerInput.requestEnvelope.request.intent.name;

        const speechText = `You você invocou ${intentName}`;

        return handlerInput.responseBuilder
                .speak(speechText)
                .getResponse();
    }
}
