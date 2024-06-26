/**
 * merge the grade of all layers.
 * @param {int} drawR The row index of drawing grid.
 * @param {int} drawC The column index of drawing grid.
 * @return {int) 0:pass, 1:failed, 2:good to bad, 3:good to good, -1:unknown.
 */
export default function(drawR, drawC, dx, dy, dw, dh) {
  // find out die(row,col) at drawing(drawR,drawC)
  var pos = this.pos(drawR, drawC);
  var rowOffset = pos.row - this.minRow; // from zero
  var colOffset = pos.col - this.minCol; // from zero

  var found = false;
  var pass = false;
  for (var i = 0; i < this.layers.length; i++) {
    var _layer = this.layers[i];
    if (_layer.enabled()) {
      var code = _layer.result(rowOffset, colOffset, dx, dy, dw, dh);
      if (code >= 0) {
        if (pass && code > 0) {
          return 2; // good to bad
        } else if (pass && found) {
          return 3; // test duo
        }
        pass = (code == 0);
        found = true;
      }
    }
  }
  return found ? pass ? 0 : 1 : -1;
}