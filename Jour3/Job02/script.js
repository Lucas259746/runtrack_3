$(function () {

    let dragged = null;

    $("#container").on("dragstart", "img", function () {
        dragged = this;
    });

    $("#container").on("dragover", function (e) {
        e.preventDefault();
    });

    $("#container").on("drop", "img", function () {
        if (dragged) {
            $(dragged).insertBefore(this);
            checkOrder();
        }
    });

    $("#shuffleBtn").on("click", function () {
        let images = $("#container img").toArray();

        for (let i = images.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [images[i], images[j]] = [images[j], images[i]];
        }

        $("#container").append(images);
        $("#message").text("");
    });

    function checkOrder() {
        let correct = true;

        $("#container img").each(function (index) {
            if (parseInt($(this).data("order")) !== index + 1) {
                correct = false;
            }
        });

        if (correct) {
            $("#message").text("Vous avez gagné").css("color", "green");
        } else {
            $("#message").text("Vous avez perdu").css("color", "red");
        }
    }

});

