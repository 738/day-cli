var pjson = require('../package.json');
var program = require('commander');
var chalk = require('chalk');
var moment = require('moment');
var fs = require('fs');
var path = require('path');

const LANGUAGE_FILE = path.resolve(__dirname, './language.daycli');
const DDAY_FILE = path.resolve(__dirname, './dday.daycli');

const ENGLISH = 'en';
const KOREAN = 'ko';
const SEPARATOR = '/';

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
        .option('-l, --language <language>', 'language <input>: en, ko')
        .option('-w, --ofweek <date>', 'return the day of week')
        .option('-d, --dday', 'return your D-Day')
        .option('-s, --save <date/label>', 'save your D-Day')
        .parse(process.argv);

    if (program.language) {
        fs.writeFile(LANGUAGE_FILE, program.language, 'utf-8', function (error) {
            if (error) console.error(error);
            else {
                switch (program.language) {
                    case ENGLISH:
                    case KOREAN:
                        console.log('you changed language into ' + program.language);
                        break;
                    default:
                        console.log(`you should select language between ${ENGLISH}, ${KOREAN}`);
                        break;
                }
            }
        });
    } else if (program.ofweek) {
        fs.readFile(LANGUAGE_FILE, function (error, data) {
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
    } else if (program.dday) {
        fs.readFile(DDAY_FILE, function (error, data) {
            if (error) console.error(error);
            else {
                data.toString().split('\n').forEach(line => {
                    let [label, dueDate] = line.split(SEPARATOR);
                    if (label && dueDate) console.log(getLogString(label, dueDate))
                });
            }
        });
    } else if (program.save) {
        let [dueDate, label] = program.save.split(SEPARATOR);
        let dataString = label + SEPARATOR + dueDate;
        let logString = getLogString(label, dueDate);
        fs.appendFile(DDAY_FILE, dataString + '\n', 'utf-8', function (error) {
            if (error) console.error(error);
            console.log(logString);
        });
    }

    function getLogString(label, dueDate) {
        let dday = moment(dueDate).diff(moment(new Date()), 'days');
        return label + ' : ' + 'D' + (dday >= 0 ? ' - ' + dday : ' + ' + (-dday));
    }
};
