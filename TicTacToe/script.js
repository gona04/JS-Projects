const cells = {};
let clicked = 0;
namingAllCells();

Object.values(cells).forEach(cell => {
    cell.addEventListener('click', () => {
        if (!cell.innerHTML) { 
            cell.innerHTML = clicked % 2 === 0 ? 'X' : 'O';
            clicked++;
        }
    })
})
function namingAllCells() {
    for (let i = 1; i <= 9; i++) {
        cells[`cell${i}`] = document.getElementById(`cell${i}`);
    }
}