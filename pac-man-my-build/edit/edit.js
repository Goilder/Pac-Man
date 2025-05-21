const size = 28;
const grid = document.getElementById("map");
const tileType = document.getElementById("tileType");
let layout = Array(size * size).fill(0); // по дефорту все пустое

function drawGrid() {
  grid.innerHTML = ''; // чистим перед перерисовкой

  layout.forEach((val, i) => {
    const tile = document.createElement("div");
    const classMap = ["pac-dot", "wall", "ghost-lair", "power-pellet", "empty"]; // классы стен

    for (let j = 0; j <= 4; j++) {
      tile.classList.remove(classMap[layout[i]]);
    }

    tile.classList.add(classMap[val]);

    tile.onclick = () => {
      layout[i] = parseInt(tileType.value);
      tile.className = "";
      tile.classList.add(classMap[layout[i]]);
    };

    grid.appendChild(tile);
  });
}

function saveMap() {
  document.getElementById("output").value = JSON.stringify(layout);
}

function generate() {
  layout = generateRandomMap(size);
  drawGrid();
}

function generateRandomMap(size) {
  const total = size * size;
  const map = [];

  for (let i = 0; i < total; i++) {
    const x = i % size;
    const y = Math.floor(i / size);

    if (x === 0 || x === size - 1 || y === 0 || y === size - 1) {
      map.push(1);
    } else if ((x % 2 === 0 && y % 2 === 0) && Math.random() < 0.5) {
      map.push(1);
    } else if (Math.random() < 0.02) {
      map.push(3);
    } else {
      map.push(0);
    }
  }

  // Центр — логово
  const center = Math.floor(total / 2);
  map[center] = 2;

  return map;
}

// === Экспорт файлов ===
function downloadFile(content, filename, type) {
  const blob = new Blob([content], { type });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

function exportAsJSON() {
  const content = JSON.stringify(layout, null, 2);
  downloadFile(content, "map.json", "application/json");
}

drawGrid(); // первичная отрисовка


window.exportAsJSON = exportAsJSON;
