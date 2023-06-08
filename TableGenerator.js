const AsciiTable = require('ascii-table');
const Rules = require('./Rules.js');

class TableGenerator {
  constructor(moves) {
      this.moves = moves;
      this.moveCount = moves.length;
      this.rule = new Rules(this.moves);
  }

  generateTable() {
    const table = new AsciiTable('HELP');
    table
      .setHeading('Choice', 'Lose', 'Win').setAlign(0, AsciiTable.CENTER);

      let n = 0;
      this.moves.forEach((value) => {
        // console.log(this.moves[n])
        table.addRow(value, this.loses(this.moves[n]), this.wins(this.moves[n]))
        .setAlign(1, AsciiTable.CENTER)
        .setAlign(2, AsciiTable.CENTER);
        n++
      })

    


    console.log(table.toString())
  }

  loses(move) {

    const losesTo = this.rule.getLoseIndexArray(this.moves.indexOf(move));

    let losesToValueString =''
    for(let n = 0; n < losesTo.length; n++) {
      const losesToValue = this.moves[losesTo[n]];
      losesToValueString += losesToValue
      if(n + 1 < losesTo.length){
        losesToValueString += ', ';
      }
    }
    return losesToValueString; 
    
 } 

 wins(move) {
  const winsTo = this.rule.getWinIndexArray(this.moves.indexOf(move));

  let winsToValueString =''
  for(let n = 0; n < winsTo.length; n++) {
    const winsToValue = this.moves[winsTo[n]];
    winsToValueString += winsToValue
    if(n + 1 < winsTo.length){
      winsToValueString += ', ';
    }
  }

  return winsToValueString;
 }
  
}

module.exports = TableGenerator;
