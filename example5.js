function onOpenCvReady() {
  cv['onRuntimeInitialized'] = () => go();
}

function go() {
  var shotmap = uia.shotmap('wafer2')
    .size(600, 10)
    .notch("down")
    .wheel(false)
    .drag(false)
    .dieRect(false) // turn off the grid line
    .diePalette(function(value) {
      switch (value) {
        case 1:
          return 0xff0000;
        case 2:
          return 0xff0000;
        default:
          return 0xffffff; // white background
      }
    });

  shotmap.data(101, 98, 1, 1, "leftdown", "counting")
    .layer("1", layerResult1, layerData)
    .layer("2", layerResult2, layerData);

  shotmap.create(true);
  // try to find out failed areas.
  var result = shotmap.blocking(
    7, // blur parameter
    0xffffff); // ignore white color (background)

  // opencv result.
  // cv.imshow('canvasOutput', result.dst);

  // redraw
  var colors = ["red", "green", "blue", "gray", "lightgray"];
  var canvas = document.getElementById("canvasOutput");
  var ctx = canvas.getContext("2d");
  for (var y = 0; y < result.data.length; y++) {
    var row = result.data[y];
    for (var x = 0; x < row.length; x++) {
      var aid = row[x]; // area id
      var area = result.areas[aid]; // area information
      var rank = true || area.rank < 5; // ranking
      if (aid != 0 && rank) {
        ctx.fillStyle = colors[area.rank % 5];
        ctx.fillRect(x, y, 1, 1)
        ctx.fill();
      }
    }
  }
}

function layerResult1(r, c) {
  if (Math.abs(c - r) <= 4) {
    return Math.random() > 0.5 ? 0 : 1;
  } else {
    return 0;
  }
}

function layerResult2(r, c) {
  if (c >= 70 && Math.abs(c - r) <= 20) {
    return Math.random() > 0.3 ? 0 : 1;
  } else {
    return 0;
  }
}

function layerData(row, col) {
  return "" + row + "," + col;
}