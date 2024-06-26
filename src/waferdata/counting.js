/**
 * merge the grade of all layers.
 * @param {int} drawR The row index of drawing.
 * @param {int} drawC The column index of drawing.
 * @return {int) 0: pass, -1: unknown, others: failed count.
 */
export default function(drawR, drawC, dx, dy, dw, dh) {
  // find out die(row,col) at drawing(drawR,drawC)
  var pos = this.pos(drawR, drawC);
  var rowOffset = pos.row - this.minRow;
  var colOffset = pos.col - this.minCol;

  var found = false;
  var result = 0;
  for (var i = 0; i < this.layers.length; i++) {
    var _layer = this.layers[i];
    if (_layer.enabled()) {
      var fail = _layer.result(rowOffset, colOffset, dx, dy, dw, dh);
      if (fail >= 0) {
        found = true;
        result += fail;
      }
    }
  }
  return found ? result : -1;
}