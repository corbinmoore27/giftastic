var cars = ["Shelby GT500", "Corvette Stingray", "Ford Focus Rs", "Lamborghini Gallardo", "Nissan GTR", "Toyota Tacoma", "Porsche GT3"];

function renderButtons() {

    $("#searchResults").empty();
    for (let i = 0; i < cars.length; i++) {
        var btn = $("<button>" + cars[i] + "</button>");
        btn.attr("value", cars[i])
        $("#searchResults").append(btn);
    }
}

$("#btnAdd").on("click", function (event) {
    event.preventDefault();
    cars.push($("#searchText").val().trim());
    $("#searchText").val("");
    renderButtons();
    console.log(cars);
    
});

renderButtons();

$("#searchResults").on("click", 'button', function () {
    var car = $(this).val();
    console.log(this);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        car + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $("#gifSpace").empty();
        var results = response.data
        console.log(results);
        

        for (var i = 0; i < results.length; i++) {
            var carDiv = $("<div>");
            var p = $("<p>");
            p.html("Rating: " + results[i].rating);
            var carImage = $("<img>");
            carImage.attr("src", results[i].images.fixed_height_still.url);
            carImage.attr("data-state", "still");
            carImage.attr("animate", results[i].images.fixed_height.url);
            carImage.attr("still", results[i].images.fixed_height_still.url);
            carDiv.append(p);
            carDiv.append(carImage);
            $("#gifSpace").prepend(carDiv)

        }

    });
});

$("#gifSpace").on("click", 'img', function() {
    if ($(this).attr("data-state") === "still"){
        $(this).attr("src", $(this).attr("animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("still"));
        $(this).attr("data-state", "still");
    }
});

