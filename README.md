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

## License
MIT
