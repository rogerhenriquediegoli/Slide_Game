const tableHtml = document.getElementById('box-game');
let gridGame = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ""];
let tempGrid = [...gridGame];
let gridInGame = 0;
let startGame = false;
let numMoves = 0;
let numGrid = 4;
let win = false;

function alterarGrid() {
  const select = document.getElementById('gridSelect');
  if (select.value === '3x3') {
    gridGame = [1, 2, 3, 4, 5, 6, 7, 8, ""];
    numGrid = 3;
  } else if (select.value === '4x4') {
    gridGame = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, "", 13, 14, 15];
    numGrid = 4;
  }
  embaralhar();
  render();
}


function movimentoValido(posicao, grid) {
  const vazioIndex = gridGame.indexOf("");
  const linhaVazio = Math.floor(vazioIndex / grid);
  const colunaVazio = vazioIndex % grid;
  const linhaClicada = Math.floor(posicao / grid);
  const colunaClicada = posicao % grid;
  return (
    (linhaClicada === linhaVazio && Math.abs(colunaClicada - colunaVazio) === 1) ||
    (colunaClicada === colunaVazio && Math.abs(linhaClicada - linhaVazio) === 1)
  );
}

function realizarMovimento(posicao) {
  if (movimentoValido(posicao, numGrid)) {
    numMoves++;
    if(numMoves == 1){
      startGame = true;
    }
    const vazioIndex = gridGame.indexOf("");
    const temp = gridGame[vazioIndex];
    gridGame[vazioIndex] = gridGame[posicao];
    gridGame[posicao] = temp;
  }
}

function render() {
  tableHtml.innerHTML = "";
  const numColumns = gridGame.length === 9 ? 3 : 4;
  for (let index = 0; index < gridGame.length; index += numColumns) {
    const tr = document.createElement('tr');
    for (let i = 0; i < numColumns; i++) {
      const position = index + i;
      const td = document.createElement('td');
      td.textContent = gridGame[position];
      td.className = colors(gridGame[position]);
      td.addEventListener('click', function () {
        realizarMovimento(position);
      });
      tr.appendChild(td);
    }
    tableHtml.appendChild(tr);
  }
}

function colors(element) {
  const red = [1, 3, 6, 8, 9, 11, 14];
  const yellow = [2, 4, 5, 7, 10, 12, 13, 15];
  let classe = "";

  if (red.includes(element)) {
    classe = "red";
  } else if (yellow.includes(element)) {
    classe = "light-yellow";
  }
  return classe;
}

function embaralhar() {
  startGame = false
    let newGrid = [];
    for (let i = 0; i < gridGame.length; i++) {
      let indiceAleatorio = Math.floor(Math.random() * (gridGame.length - 0));
      if (!newGrid.includes(gridGame[indiceAleatorio])) {
        newGrid.push(gridGame[indiceAleatorio]);
      } else {
        i--;
      }
    }
    gridGame = [...newGrid];
    gridInGame = [...gridGame];
  }

function testChange() {
  if (gridGame.toString() !== tempGrid.toString()) {
    render();
    tempGrid = [...gridGame];
  }else if(JSON.stringify(gridGame) == JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ""]) ||  JSON.stringify(gridGame) == JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, ""]) && win == false){
    win = true
    setTimeout(alert("Congratulations, you win"), 1000)
  }
  setTimeout(testChange, 10)
}

function restart(){
  gridGame = [...gridInGame]
}

embaralhar();
testChange(); //Está sempre em execução (Listener ao array GridGame)