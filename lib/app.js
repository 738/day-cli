var pjson = require('../package.json');
var program = require('commander');
var chalk = require('chalk');
var moment = require('moment');
var fs = require('fs');

const LANGUAGE_FILE = './language.daycli';

const ENGLISH = 'en';
const KOREAN = 'ko';

const languageToIndex = {}
languageToIndex[ENGLISH] = 0;
languageToIndex[KOREAN] = 1;

const DAY = [   
    ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
];

exports.daycli = function () {
    program
        .version(pjson.version, '-v, --version')
        .option('-w, --ofweek <input>', 'return the day of week')
        .option('-l, --language <input>', 'language <input>: en, ko')
        .parse(process.argv);

    if (program.ofweek) {
        fs.readFile(LANGUAGE_FILE, function(error, data) {
            if (error) console.error(error);
            else {
                switch (data.toString()) {
                    case ENGLISH:
                        console.log(chalk.cyan(DAY[languageToIndex[ENGLISH]][moment(program.ofweek).toDate().getDay()]));
                        break;
                    case KOREAN:
                        console.log(chalk.magenta(DAY[languageToIndex[KOREAN]][moment(program.ofweek).toDate().getDay()]));
                        break;
                    default:
                        console.log('language error!');
                        break;
                }
            }
        });
    } else if (program.language) {
        fs.writeFile(LANGUAGE_FILE, program.language, 'utf-8', function(error) {
            if (error) console.error(error);
            else {
                switch (program.language) {
                    case ENGLISH:
                    case KOREAN:
                        console.log('you changed language into ' + program.language);
                        break;
                    default:
                        console.log(`you should select languages between ${ENGLISH}, ${KOREAN}`);
                        break;
                }
            }
        });
    }
};
