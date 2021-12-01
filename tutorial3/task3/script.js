//insert JavaScript code here

const setAllTilesClickHandler = () => {
  const body = document.getElementsByTagName("tbody")[0];
  const tiles = body.getElementsByTagName('tr');

  for (let i = 0; i < tiles.length; i++) {
      tiles[i].addEventListener("click", (ev) => {
        ev.target.style = "";
        ev.target.innerHTML = "";
      });
  }
};

const insertNewRow = (rowsCount) => {
  const body = document.getElementsByTagName("tbody")[0];
  for(let i = 0; i < rowsCount; i++) {
    const lastNode = body.children[body.children.length - 1];
    body.appendChild(lastNode.cloneNode(true));
  }
};

const insertNewCol = (colCount) => {
  const body = document.getElementsByTagName("tbody")[0];

  for(let r = 0; r < body.children.length; r++){
    const row = body.children[r];
    for(let i = 0; i < colCount; i++) {
      const node = row.children[0];
      row.appendChild(node.cloneNode(true));
    }
  };  
};

const setValueToTile = () => {
  const x = parseInt(document.getElementById("field_x").value);
  const y = parseInt(document.getElementById("field_y").value);
  const css = document.getElementById("css").value;
  const text = document.getElementById("text").value;

  if (!x || !y || x < 0 || y < 0) return;

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

    return;
  } else {
    tile.innerHTML = text;
    tile.style = css;
  }
}

const btn = document.getElementById("mybutton");
btn.addEventListener("click", (ev) => setValueToTile());

setAllTilesClickHandler();
