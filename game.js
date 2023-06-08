const Rules = require('./Rules');
const TableGenerator = require('./TableGenerator');
const KeyGenerator = require('./KeyGenerator');
const prompt = require('prompt-sync')();

const moves = process.argv.slice(2);
const rules = new Rules(moves);
const table = new TableGenerator(moves);
const keyGenerator = new KeyGenerator(moves);

if (!rules.validateMoves()) {
  console.log('Please provide an odd number of non-repeating strings. For example: Rock Paper Scissors');
  process.exit(1);
}

function playGame() {
    const computerMove = Math.floor(Math.random() * moves.length);
    const hmac = keyGenerator.calculateHmac(computerMove);
    console.log(`HMAC: ${hmac}`);
    
    rules.displayMenu(moves);
    const playerMove = getMove(moves);

    console.log(`Your move: ${moves[playerMove]}`)
    console.log(`Computer move: ${moves[computerMove]}`)

    console.log(rules.determineOutcome(playerMove, computerMove));

    console.log(`HMAC key: ${keyGenerator.getKey()}`);
}

function getMove(moves) {
    const userMove = prompt('Enter a move index: ');
    
    if(userMove === '?') {
        table.generateTable();
        return getMove(moves);
    }
    if(userMove === '0') {
        process.exit(0);
    }

    const index = parseInt(userMove);
    if (isNaN(index) || index < 1 || index > moves.length) {
      console.log('Invalid move index. Please try again.');
      return getMove(moves);
    }
    return index - 1;
}

playGame();

