class Rules {
    constructor(moves) {
        this.moves = moves;
        this.moveCount = moves.length;
        this.lastElementIndex = this.moves.length - 1;
    }

    validateMoves() {
    if (this.moveCount < 3 || this.moveCount % 2 !== 1) {
        return false;
    }
    const uniqueMoves = new Set();
    for (const move of this.moves) {
        if (uniqueMoves.has(move)) {
            return false;
        }
        uniqueMoves.add(move);
    }
        return true;
    }

    displayMenu(moves) {
        moves.forEach((value) => {
            console.log(`${moves.indexOf(value) + 1} - ${value}`)
        })
        console.log(`0 - exit`)
        console.log(`? - help`)
    }

    determineOutcome(userIndex, computerIndex) {

        const loseIndexes = this.getLoseIndexArray(userIndex)

        // Returns the outcome if the user wins, loses, or draws.
        if (userIndex === computerIndex) {
            return `It is a draw. You both chose ${userIndex}`;
        }   else if( loseIndexes.includes(computerIndex) ) {
            return `You lost. ${this.moves[userIndex]} loses to ${this.moves[computerIndex]}!`;
        }
        return `You won. ${this.moves[userIndex]} wins to ${this.moves[computerIndex]}!`;
    }  

    getLoseIndexArray(userIndex) {
        // This part adds the indexes that the user loses to in an array 'loseIndexes'
        const num = Math.floor(this.moveCount / 2);
        const loseIndexes = [];
        for(let j = 1; j <= num; j++) {
            if((userIndex + j + 1) % this.moveCount === 0) {
                loseIndexes.push(this.lastElementIndex)
            }
            if((( userIndex + j + 1) % this.moveCount) !== 0){
                loseIndexes.push((userIndex + j) % this.moveCount);
            } 
        }

        return loseIndexes;
    }
    getWinIndexArray(userIndex) {
        const loseIndexes = this.getLoseIndexArray(userIndex);
        const winIndexes = this.moves
        .map((_, index) => index) // Create an array of all indexes
        .filter((index) => index !== userIndex && !loseIndexes.includes(index));

        return winIndexes;
    }

}

module.exports = Rules;
