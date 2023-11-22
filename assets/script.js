const tableHtml = document.getElementById('box-game');
let gridGame = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ""];
let tempGrid = [...gridGame];
let startGame = false;
let numMoves = 0;

function movimentoValido(posicao) {
  const vazioIndex = gridGame.indexOf("");
  const linhaVazio = Math.floor(vazioIndex / 4);
  const colunaVazio = vazioIndex % 4;

  const linhaClicada = Math.floor(posicao / 4);
  const colunaClicada = posicao % 4;

  return (
    (linhaClicada === linhaVazio && Math.abs(colunaClicada - colunaVazio) === 1) ||
    (colunaClicada === colunaVazio && Math.abs(linhaClicada - linhaVazio) === 1)
  );
}

function realizarMovimento(posicao) {
  if (movimentoValido(posicao)) {
    const vazioIndex = gridGame.indexOf("");
    const temp = gridGame[vazioIndex];
    gridGame[vazioIndex] = gridGame[posicao];
    gridGame[posicao] = temp;

  }
}

function render() {
  tableHtml.innerHTML = "";
  for (let index = 0; index < gridGame.length; index += 4) {
    const tr = document.createElement('tr');
    for (let i = 0; i < 4; i++) {
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
    gridGame = newGrid;
  }

function testChange() {
  if (gridGame.toString() !== tempGrid.toString()) {
    render();
    tempGrid = [...gridGame];
  }else if(gridGame == [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ""]){
    alert("Congratulations, you win")
  }
  setTimeout(testChange, 1);
}

embaralhar();
render();
testChange();