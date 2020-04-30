module.exports = {
  awsError: (err) => {
    const fs = require('fs');
    const log_file = fs.createWriteStream(__dirname + 'debug.log', { flags: 'w' });
    const log_stdout = process.stdout;

    log_file.write(JSON.stringify(err, null, 2));
    log_stdout.write(JSON.stringify(err, null, 2));
    return err;
  }
}