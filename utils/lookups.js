const { MBTI, Enneagram, Zodiac } = require("./enums");

const filterLookup = {
    'mbti': { mbti: { $in: MBTI } },
    'enneagram': { enneagram: { $in: Enneagram } },
    'zodiac': { zodiac: { $in: Zodiac } }
};

const sortLookup = {
    'recent': { created_at: -1 }
};

module.exports = {
    filterLookup,
    sortLookup
}