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

const insertNewRow = (oldBody, isOnBottom) => {
  const body = document.createElement("tbody");

  /// constructing new row
  let columnsNum = oldBody.children[0].length;
  const newRow = document.createElement("tr");
  for (var i = 0; i < columnsNum; i++) {
    const newTile = document.createElement("td");
    newRow.appendChild(newTile);
  }

  if (!isOnBottom) body.appendChild(newRow);

  body.append(oldBody.children);

  if (isOnBottom) body.appendChild(newRow);

  oldBody.remove();
  const table = document.getElementsByTagName("table")[0];
  table.append(body);
};

const btn = document.getElementById("mybutton");
btn.addEventListener("click", (ev) => {
  const x = parseInt(document.getElementById("field_x").value) - 1;
  const y = parseInt(document.getElementById("field_y").value) - 1;
  const css = document.getElementById("css").value;
  const text = document.getElementById("text").value;

  if (!x || !y) return;

  const body = document.getElementsByTagName("tbody")[0];
  const tile = body.children[y] ? body.children[y].children[x] : undefined;

  if (!tile) {
    if (y > body.children.length) {
      insertNewRow(body, true);
    }
  } else {
    tile.innerHTML = text;
    tile.style = css;
  }
});

setAllTilesClickHandler();
