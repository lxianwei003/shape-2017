const moment = require('moment');

module.exports = {
    getScore,
    sortObjects
};

// Array to sort, amount of objects to return
function sortObjects(objs) {
    function compare(a,b) {
        if (a.score > b.score)
            return -1;
        if (a.score < b.score)
            return 1;
        return 0;
    }
    return objs.sort(compare);
}

function getScore(historyObj) {
    /*
        Example of 'historyObj':
        {
            id: 7706,
            url: 'https://codeforgeek.com/2014/07/node-sqlite-tutorial/',
            title: 'Node and SQLite tutorial | Codeforgeek',
            visit_count: 1,
            typed_count: 0,
            last_visit_time: 13144014093481128,
            hidden: 0
        }
    */

    if (!historyObj) {
        return;
    }

    var visits = historyObj.visit_count;
    var visitsNormalized = visits > 40 ? 40 : visits;

    var date = win32EpochToDate(historyObj.last_visit_time);
    var weeksAgo = moment().diff(date, "weeks");

    return calculateScore(visitsNormalized, weeksAgo);
}

function calculateScore(visits, weeksAgo) {
    return visits / parseFloat(Math.pow(2, weeksAgo));
}

function win32EpochToDate(fileTime) {
    return new Date (fileTime / 1000 - 11644473600000);
}
