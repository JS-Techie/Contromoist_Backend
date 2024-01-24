const showLogs = process.env.SHOW_LOGS;
const chalk = require('chalk');

const print = (message, type) => {
  if (showLogs == 'false') {
    return;
  }

  message = message.toUpperCase()

  switch (type) {
    case 'SUCCESS':
      console.log(chalk.green.bold(`[SUCCESS] : ${message}`));
      break;
    case 'WARNING':
      console.log(chalk.yellow.bold(`[WARNING] : ${message}`));
      break;
    case 'ERROR':
      console.log(chalk.red.bold(`[ERROR] : ${message}`));
      break;
    case 'FATAL':
      console.log(chalk.bgRed.white.bold(`[FATAL] : ${message}`));
      break;
    case 'LOG':
      console.log(chalk.blue.bold(`${message}`));
      break;
    default:
      console.log(`[${type}] ${message}`);
      break;
  }
};

module.exports = print;
