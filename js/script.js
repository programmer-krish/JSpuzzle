var puzzellevel;
var width;
var dragelment;

function format() {
    var table = document.getElementById("table");
    puzzellevel = document.getElementById("columns").value;
    width = Math.round(400 / parseInt(puzzellevel));
    var tableCell = document.getElementById("table");
    var count = 0;

    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }

    if (puzzellevel < 2) {
        alert("Above level 2");
        return;
    }

    for (var i = 1; i < parseInt(puzzellevel) + 1; i++) {
        var row = document.createElement("div");
        row.setAttribute("class", "row");
        tableCell.appendChild(row);

        for (var j = 1; j < parseInt(puzzellevel) + 1; j++) {
            var column = document.createElement("div");
            column.setAttribute("id", ++count);
            column.setAttribute("class", "column" + count + " column");

            if (i == parseInt(puzzellevel) && j == parseInt(puzzellevel)) {
                column.draggable = true;
                column.style.background = "grey";
                column.style.width = width + "px";
                column.style.height = width + "px";
            } else {
                column.draggable = true;
                column.style.width = width + "px";
                column.style.height = width + "px";
                column.style.background = "url('./images/amalfi.jpg')";
                column.style.backgroundPosition = ((width * parseInt(puzzellevel)) - (width * (j - 1))) + "px " + ((width * parseInt(puzzellevel)) - (width * (i - 1))) + "px"
            }
            row.appendChild(column)
        }
    }

    addElements()

}



function swapTile(column, targetcolumn) {
    if (targetcolumn == 0) {
        targetcolumn = 1;
    }

    for (i = 1; i < puzzellevel; i++) {
        if (column == (puzzellevel * i) && targetcolumn == (puzzellevel * i) + 1) {
            return;
        }
    }

    if (document.getElementById(column).style["background"] == "grey") {
        var temp = document.getElementById(column).style["background"];
        document.getElementById(column).style["background"] = document.getElementById(targetcolumn).style["background"];
        document.getElementById(targetcolumn).style["background"] = temp;
    } else if (document.getElementById(targetcolumn).style["background"] == "grey") {
        swapTile(targetcolumn, column)
    } else {
        var temp = document.getElementById(column).style["background-position"];
        document.getElementById(column).style["background-position"] = document.getElementById(targetcolumn).style["background-position"];
        document.getElementById(targetcolumn).style["background-position"] = temp;
    }
}

function shuffle() {
    for (var column = 1; column < (Math.pow(parseInt(puzzellevel), 2)) + 1; column++) {
        var targetcolumn = Math.floor(Math.random() * (Math.pow(parseInt(puzzellevel), 2)));
        swapTile(column, targetcolumn);
    }
}


function solve() {
    var a = puzzellevel;
    var b = puzzellevel;
    var allTiles = document.getElementsByClassName("column");

    for (var i = 1; i < (Math.pow(parseInt(puzzellevel), 2)) + 1; i++) {
        if (document.getElementById(i).style["background"] == "grey") {
            swapTile(i, (Math.pow(parseInt(puzzellevel), 2)));
        }
    }

    for (var column = 1; column < (Math.pow(parseInt(puzzellevel), 2)) + 1; column++) {
        if ((column - 1) % puzzellevel == 0 && column != 1) {
            b--;
            a--;
            a = puzzellevel;
        } else if (column != 1) {
            a--;
        }

        if (document.getElementById(column).style["background-position"] == (width * a) + "px " + (width * b) + "px") {
            continue;
        } else {
            for (var j = 0; j < allTiles.length - 1; j++) {
                if (allTiles[j].style["background-position"] == (width * a) + "px " + (width * b) + "px") {
                    swapTile(column, allTiles[j].getAttribute("id"));
                }
            }
        }
    }
}

function allowDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
}


function allowDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    var tileColumn = parseInt(dragelment);
    var solveCount = 0;
    var a = puzzellevel;
    var b = puzzellevel;

    for (var column = 1; column < (Math.pow(parseInt(puzzellevel), 2)) + 1; column++) {
        if ((column - 1) % puzzellevel == 0 && column != 1) {
            b--;
            a--;
            a = puzzellevel;
        } else if (column != 1) {
            a--;
        }

        if (document.getElementById(column).style["background-position"] == (width * a) + "px " + (width * b) + "px") {
            solveCount++
        }
    }
    if (solveCount == Math.pow(parseInt(puzzellevel), 2) - 1) {
        alert("Puzzle is solved")
        return;
    }

    if (document.getElementById(tileColumn).style["background"] != "grey") {

        if (tileColumn + 1 <= Math.pow(parseInt(puzzellevel), 2)) {
            if (document.getElementById(tileColumn + 1).style["background"] == "grey" && (tileColumn + 1 == e.target.id)) {
                swapTile(tileColumn, tileColumn + 1)
            }
        }

        if (tileColumn - 1 >= 1) {
            if (document.getElementById(tileColumn - 1).style["background"] == "grey" && (tileColumn - 1 == e.target.id)) {
                swapTile(tileColumn, tileColumn - 1)
            }
        }

        if (tileColumn + parseInt(puzzellevel) <= Math.pow(parseInt(puzzellevel), 2)) {
            if (document.getElementById(tileColumn + parseInt(puzzellevel)).style["background"] == "grey" && (tileColumn + parseInt(puzzellevel) == e.target.id)) {
                swapTile(tileColumn, tileColumn + parseInt(puzzellevel))
            }
        }

        if (tileColumn - parseInt(puzzellevel) >= 1) {
            if (document.getElementById(tileColumn - parseInt(puzzellevel)).style["background"] == "grey" && (tileColumn - parseInt(puzzellevel) == e.target.id)) {
                swapTile(tileColumn, tileColumn - parseInt(puzzellevel))
            }
        }
    }



}

function allowDragStart(e) {
    dragelment = e.target.id;
    addElements()
}

function addElements() {
    for (var i = 0; i < Math.pow(parseInt(puzzellevel), 2); i++) {
        var column = document.getElementById(i + 1);
        column.addEventListener('dragover', allowDragOver, false);
        column.addEventListener('drop', allowDrop, false)
        column.addEventListener('dragstart', allowDragStart, false);
    }
}


