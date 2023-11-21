var rows = 3, 
    cols = 3


var dragTile, // touched by user
    otherTile // target tile to swap - the blank one

var moves = 0

var imagesOrder = []

for (let index = 1; index <= rows * cols; index++) {;
    imagesOrder.push("image" + index + ".jpg")    
}

// shuffle images on the array
let imagesShuffle = imagesOrder.sort(function(){
    return Math.random() - 0.5
})

console.log(imagesShuffle)

let board = document.getElementById("board")

window.onload = function() {

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
           
            // create ex. <img id='0-0' src='image1.jpg'>
            let tile = document.createElement('img')
            tile.id = r.toString() + "-" + c.toString() // 0-0 to 2-2
            tile.src = "img/" + imagesShuffle.shift()

            // drag functionality
            tile.addEventListener('dragstart', dragStart) // click image to drag
            tile.addEventListener('dragover', dragOver) // moving image 
            tile.addEventListener('dragenter', dragEnter) // entering an image while dragging
            tile.addEventListener('dragleave', dragLeave) //leaving an in+mage while dragging
            tile.addEventListener('drop', dragDrop) // drop image into another while dragging
            tile.addEventListener('dragend', dragEnd) // after drop 

            // append <img> to div board
            board.append(tile)
            
        }
    }
}

function dragStart () {
    dragTile = this
}

function dragOver(e) {
    e.preventDefault()
}

function dragEnter(e) {
    e.preventDefault()
}

function dragLeave(e) {
    e.preventDefault()
}

function dragDrop() {
    otherTile = this
}

function dragEnd() {
    console.log('dragEnd ...')

    if (validMove()) {
    // swap tiles
        let dragImage = dragTile.src,
            otherImage = otherTile.src
        
            dragTile.src = otherImage
            otherTile.src = dragImage

        moves++
        document.getElementById('moves').textContent = moves
    }
}

function validMove() {
    // check if t's swapping with blank tile
    if (!otherTile.src.includes('3.jpg')) {
        return false
    }
    let dragCoords = dragTile.id.split('-'), // ex. "0-0" --> ['0', '0']
        rd = parseInt( dragCoords[0] ), 
        cd = parseInt( dragCoords[1] ),

        otherCoords = otherTile.id.split('-')
        ro = parseInt( otherCoords[0] ), 
        co = parseInt( otherCoords[1] ),

        moveLeft = rd == ro && cd == co-1,
        moveRight = rd == ro && cd == co+1,
        moveUp = rd == ro-1 && cd == co,
        moveDown = rd == ro+1 && cd == co,

        adjacent = moveLeft || moveRight || moveUp || moveDown

    return adjacent

}