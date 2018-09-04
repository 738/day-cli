# day-cli

![Build Status](https://img.shields.io/teamcity/codebetter/bt428.svg)

The Command Line Interface that helps day calculation (Powered by Holy Kiwi 🥝)
It supports English, and Korean

## Installation
```bash
npm install -g day-cli
```

## Usage

### Get day of week
```bash
$ day -w 2018-08-28
Tuesday
$ day --ofweek 1995-07-04
Tuesday
```

### Language configuration
```bash
$ day -l ko
you changed language into ko
$ day -w 2018-08-28
화요일
```

### D-Day (TBD)

#### Save D-Day
```bash
$ day -s "20181108/My CS Exam"
My CS Exam : D - 70
$ day -s "20181018/Mom Birthday"
Mom Birthday : D - 49
```

#### View D-Day
```bash
$ day -d
Mom Birthday : D - 49
My CS Exam : D - 70
```


## License
MIT
