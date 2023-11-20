const tableHtml = document.getElementById('box-game')
let gridGame = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
function embaralhar() {
    let newGrid = [];
    for (let i = 0; i < gridGame.length; i++) {
        let indiceAleatorio = Math.floor(Math.random() * (gridGame.length - 0));
        if (!newGrid.includes(gridGame[indiceAleatorio])) {
            newGrid.push(gridGame[indiceAleatorio]);
        }else{
            i--
        }
    }
    gridGame = ""
    gridGame = newGrid
}

function render(){
    for (let index = 0; index < gridGame.length; index += 4) {
        let tr = document.createElement('tr')
        tr.innerHTML = `
            <td class="${colors(gridGame[index])}">${gridGame[index]}</td>
            <td class="${colors(gridGame[index + 1])}">${gridGame[index + 1]}</td>
            <td class="${colors(gridGame[index + 2])}">${gridGame[index + 2]}</td>
            <td class="${colors(gridGame[index + 3])}">${gridGame[index + 3]}</td>
        `
        tableHtml.appendChild(tr)
    }
}

function colors(element){
    let red = [1, 3, 6, 8, 9, 11, 14]
    let yellow = [2, 4, 5, 7, 10, 12 ,13, 15]
    let classe = ""

    if(red.includes(element)){
        classe="red"
    }else if(yellow.includes(element)){
        classe="light-yellow"
    }

    return classe
}


render()






