//insert JavaScript code here

const resetTextAndStyle = (element) => {
  element.style = "";
  element.innerHTML = "";
}


const setClickHandlerOnAllTiles = () => {
  const body = document.getElementsByTagName("tbody")[0];
  const tiles = body.getElementsByTagName('tr');

  for (let i = 0; i < tiles.length; i++) {
      tiles[i].addEventListener("click", (ev) => resetTextAndStyle(ev.target));
  }
};

const insertNewRow = (rowsCount) => {
  const body = document.getElementsByTagName("tbody")[0];

  /// clone existing row and clean its content
  const basicNode = body.children[body.children.length - 1].cloneNode(true);
  for(let j = 0; j < basicNode.children.length; j++) {
    resetTextAndStyle(basicNode.children[j]);
  }

  /// duplicate the row as many times as needed
  for(let i = 0; i < rowsCount; i++) {
    body.appendChild(basicNode.cloneNode(true));
  }
};

const insertNewCol = (colCount) => {
  const body = document.getElementsByTagName("tbody")[0];

  for(let r = 0; r < body.children.length; r++){
    const row = body.children[r];

    /// clone existing tile and clean its content
    const basicNode = row.children[0].cloneNode(true);
    resetTextAndStyle(basicNode);


    /// duplicate the tile in the row as many times as needed
    for(let i = 0; i < colCount; i++) {
      row.appendChild(basicNode.cloneNode(true));
    }
  };  
};

const setValueToTile = () => {
  const x = parseInt(document.getElementById("field_x").value);
  const y = parseInt(document.getElementById("field_y").value);
  const css = document.getElementById("css").value;
  const text = document.getElementById("text").value;

  if (!x || !y || x < 0 || y < 0){
    alert('You need to fill in both x and y fields with positive integer values');
    return;
  }

  const body = document.getElementsByTagName("tbody")[0];
  const tile = body.children[y] ? body.children[y].children[x] : undefined;

  if (!tile) {
    if (y >= body.children.length) {
      insertNewRow(y - body.children.length + 1);
    }

    if(x >= body.children[0].children.length) {
      insertNewCol(x - body.children[0].children.length + 1);
    }

    setValueToTile();
    setClickHandlerOnAllTiles();

    return;
  } else {
    tile.innerHTML = text;
    tile.style = css;
  }
}

const btn = document.getElementById("mybutton");
btn.addEventListener("click", (ev) => setValueToTile());

setClickHandlerOnAllTiles();
