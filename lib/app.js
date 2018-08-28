var pjson = require('../package.json');
var program = require('commander');
var chalk = require('chalk');
var moment = require('moment');

const DAY = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

exports.daycli = function () {
    program
        .version(pjson.version, '-v, --version')
        .option('-w, --ofweek <input>', 'return the day of week')
        .parse(process.argv);

    if (program.ofweek) {
        console.log(process.argv);
        console.log(chalk.cyan(DAY[moment(program.ofweek).toDate().getDay()]));
    }
};
