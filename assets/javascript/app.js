$(document).ready(function(){

    var buttons = $("<div>");
    var topics = ["Lady Gaga", "Katy Perry"]
    var gifsView = $("<div>");
    gifsView.addClass("gifs");
    var input = $("<div>");
    input.addClass("input");

    function renderButtons(){
        buttons.empty();
        for(var i = 0; i < topics.length; i++){
            //create a button
            var btn = $("<button>");
            // Adds a class of artist
            btn.addClass("btn artist");
            // Added a data-attribute
            btn.attr("data-name", topics[i]);
            // Provided the initial button text
            btn.text(topics[i]);
            // Added the button to the buttons-view div
            $(buttons).append(btn);
        }
    }

    $("#content").on("click", ".btn", function(){
        var search = $(this).attr("data-name");
        var apiKey = "4t6UpTOwvpFYvorAD9ebMBKNHiGjeHGO";
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&limit=10&api_key=" + apiKey;

        $.ajax({
            url: queryURL,
            method: "GET"
          })
            .then(function(response) {
                console.log(response);
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div class='item'>");
        
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
        
                    var image = $("<img>");
                    image.attr("src", results[i].images.fixed_height_still.url);
                    image.attr("data-still", results[i].images.fixed_height_still.url);
                    image.attr("data-animate", results[i].images.fixed_height.url);
                    image.attr("data-state", "still");
                    image.addClass("gif");
        
                    gifDiv.append(p);
                    gifDiv.prepend(image);
        
                    $(".gifs").prepend(gifDiv);
                  }

            })

    })

    $("#content").on("click", ".gif", function(){
        var state = $(this).attr("data-state");

        if(state === "still"){
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        }
        else if(state === "animate"){
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
    })

    $("#content").append(buttons);
    $("#content").append(gifsView);
    $("#content").append(input);
    renderButtons();

})