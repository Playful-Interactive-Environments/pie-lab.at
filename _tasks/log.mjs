import chalk from 'chalk';
import dateformat from 'dateformat';

export function log() {
    const time = '[' + chalk.grey(dateformat(new Date(), 'HH:MM:ss')) + ']';
    process.stdout.write(time + ' ');
    console.log.apply(console, arguments);
    return this;
}
