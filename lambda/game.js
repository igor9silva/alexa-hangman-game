
// Constants
const { INITIAL_LIVES } = require('./config');

/// boolean
/// return if letter has already been guessed
module.exports.hasBeenGuessed = function hasBeenGuessed(letter, triedLetters) {
    return triedLetters.includes(letter);
}

/// int
/// return the hit count (how many occurrencies of `letter` in `word`)
module.exports.countHits = function countHits(letter, word) {
    return word.split(letter).length - 1; // `letter` occurrencies in `word`
}

/// int
/// return the current life count
module.exports.countLives = function countLives(word, triedLetters) {

    const failedAttempts = triedLetters.reduce((count, letter) => {
        return count + (word.includes(letter) ? 0 : 1);
    }, 0);
    
    return INITIAL_LIVES - failedAttempts;
}

/// int
/// return how many missing letters there are
module.exports.countMissingLetters = function countMissingLetters(word, triedLetters) {

    // sum, for each letter, how many occurrencies of it there are
    const totalHitCount = triedLetters.reduce((count, letter) => {
        return count + (countHits(letter, word));
    }, 0);
    
    return word.length - totalHitCount;
}