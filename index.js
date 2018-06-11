// get words out of words_alpha.txt and write them to individual json files for easier consumption
// words_alpha.txt from https://github.com/dwyl/english-words

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
    input: fs.createReadStream('words_alpha.txt')
});

const words = {};

rl.on('line', (line) => {
    let index = line.length > 10 ? 10 : line.length;
    if(!words[index]) {
        words[index] = []
    }
    words[index].push(line);
});

rl.on('close', () => {
    for(var i = 1; i <= 10; i++) {
        fs.writeFile(path.join('words', i + '.json'), JSON.stringify(words[i]), (err) => {
            if(err) throw err;
            console.log('saved');
        })
    }
});