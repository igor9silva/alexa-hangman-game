
// Constants
const { INITIAL_LIVES } = require('./config');

/// boolean
/// return if letter has already been guessed
function hasBeenGuessed(letter, triedLetters) {
    return triedLetters.includes(letter);
}

/// int
/// return the hit count (how many occurrencies of `letter` in `word`)
function countHits(letter, word) {
    return word.split(letter).length - 1; // `letter` occurrencies in `word`
}

/// int
/// return the current life count
function countLives(word, triedLetters) {

    const failedAttempts = triedLetters.reduce((count, letter) => {
        return count + (word.includes(letter) ? 0 : 1);
    }, 0);
    
    return INITIAL_LIVES - failedAttempts;
}

/// int
/// return how many missing letters there are
function countMissingLetters(word, triedLetters) {

    // sum, for each letter, how many occurrencies of it there are
    const totalHitCount = triedLetters.reduce((count, letter) => {
        return count + (countHits(letter, word));
    }, 0);
    
    return word.length - totalHitCount;
}

module.exports.hasBeenGuessed = hasBeenGuessed;
module.exports.countHits = countHits;
module.exports.countLives = countLives;
module.exports.countMissingLetters = countMissingLetters;