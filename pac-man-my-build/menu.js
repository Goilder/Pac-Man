function saveLastMap(map){
  localStorage.setItem('map_name', map)
}

function startNewGame() {
  console.log('window.location.href');
  window.location.href = "./game/game.html?map=default";
  // window.location.href = "asdasd.html";
}

function continueGame() {
  // console.log('window.location.href');
  // // alert("Функция продолжения пока не реализована.");
  // const last_map = localStorage.getItem("map_name");
  // window.location.href = "./game/game.html?map="+last_map

  const lastSlot = localStorage.getItem("pacmanLastSlot");
  if (!lastSlot) {
    alert("Нет сохранённой игры.");
    return;
  }

  const saved = JSON.parse(localStorage.getItem(`pacmanSave_slot${lastSlot}`));
  if (!saved) {
    alert("Слот повреждён или пуст.");
    return;
  }

  const map = saved.selectedMap || "default";
  window.location.href = `./game/game.html?map=${map}`;
}

function openSettings() {
  alert("Настройки пока не доступны.");
}

function selectMap() {
  const selectedMap = prompt("Введите имя карты (например: map1, map2, test):", "map2");
  if (selectedMap) {
    saveLastMap(selectedMap);
    window.location.href = `./game/game.html?map=${encodeURIComponent(selectedMap)}`;
  }
}
