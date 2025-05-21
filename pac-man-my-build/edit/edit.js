const size = 20;
const grid = document.getElementById("map");
const tileType = document.getElementById("tileType");
let layout = Array(size * size).fill(0); // по умолчанию всё pac-dot

function drawGrid() {
  grid.innerHTML = ''; // очищаем DOM перед перерисовкой

  layout.forEach((val, i) => {
    const tile = document.createElement("div");

    // Удаляем все старые tile-классы
    for (let j = 0; j <= 4; j++) {
      tile.classList.remove(`tile-${j}`);
    }

    tile.classList.add(`tile-${val}`);
    tile.onclick = () => {
      layout[i] = parseInt(tileType.value);
      tile.className = ''; // сброс всех классов
      tile.classList.add(`tile-${layout[i]}`);
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
      map.push(1); // стены по краям
    } else if ((x % 2 === 0 && y % 2 === 0) && Math.random() < 0.5) {
      map.push(1); // случайные внутренние стены
    } else if (Math.random() < 0.02) {
      map.push(3); // power-pellet
    } else {
      map.push(0); // pac-dot
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
