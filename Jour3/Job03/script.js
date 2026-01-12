$(function () {

    const size = 3;
    let tiles = [];
    let emptyIndex = 8; // position de la case vide (9)
    let gameOver = false;

    function init() {
        gameOver = false;
        $("#message").text("");
        $("#restart").hide();

        tiles = [...Array(9).keys()]; // [0..8]
        shuffle(tiles);

        emptyIndex = tiles.indexOf(8);

        render();
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function render() {
        $("#game").empty();
        tiles.forEach((value, index) => {
            if (value === 8) {
                $("#game").append(`<div data-index="${index}"></div>`);
            } else {
                $("#game").append(`
                    <div class="tile" data-index="${index}" data-value="${value}">
                        <img src="image/${value + 1}.PNG" width="100" height="100">
                    </div>
                `);
            }
        });
    }

    $("#game").on("click", ".tile", function () {
        if (gameOver) return;

        const index = parseInt($(this).data("index"));
        const neighbors = getNeighbors(emptyIndex);

        if (neighbors.includes(index)) {
            swap(index, emptyIndex);
            emptyIndex = index;
            render();
            checkWin();
        }
    });

    function getNeighbors(i) {
        const neighbors = [];
        const row = Math.floor(i / size);
        const col = i % size;

        if (row > 0) neighbors.push(i - size);
        if (row < size - 1) neighbors.push(i + size);
        if (col > 0) neighbors.push(i - 1);
        if (col < size - 1) neighbors.push(i + 1);

        return neighbors;
    }

    function swap(i, j) {
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }

    function checkWin() {
        for (let i = 0; i < 9; i++) {
            if (tiles[i] !== i) return;
        }

        $("#message").text("Vous avez gagné").css("color", "green");
        $("#restart").show();
        gameOver = true;
    }

    $("#restart").on("click", function () {
        init();
    });

    init();
});
