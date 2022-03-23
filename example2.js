var shotmap = uia.shotmap('wafer2')
  .size(600, 10)
  .notch("down")
  .wheel(false)
  .drag(false)
  .dieRect(false)
  .diePalette(function(value) {
    switch (value) {
      case 0:
        return 0x00ff00;
      case 1:
        return 0x0000ff;
      case 2:
        return 0xff0000;
      default:
        return 0xffffff;
    }
  })
  .attachClick(function(oEvent) { // click event of the die
    alert(oEvent.pick()[0]);
  })


var data = shotmap.data(101, 98, 1, 1, "leftdown", "counting")
  .layer("1", 0, layerData)
  .layer("2", layerResult, layerData)
  .layer("3", layerResult, layerData);

shotmap.create(true);

function layerResult() {
  return Math.random() > 0.2 ? 0 : 1;
}

function layerData(row, col) {
  return "" + row + "," + col;
}

function showLayer(id, enabled) {
  data.layer(id).enabled(enabled);
}