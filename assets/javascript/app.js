$(document).ready(function(){

    var buttons = $("<div>");
    var topics = ["Lady Gaga", "Katy Perry", "Emma Stone", "Bill Murray", "Jennifer Lawrence", "Paul Rudd", "Rebel Wilson", 
                "Jason Bateman", "Aubrey Plaza", "Bradley Cooper", "Robert Downey Jr", "Jim Carrey", "Tina Fey", "Weird Al", 
                "Kristen Wiig", "Will Ferrell", "Melissa McCarthy", "Donald Glover", "Elijah Wood"];
    var gifsView = $("<div>");
    gifsView.addClass("gifs");
    var input = $("<div>");
    input.addClass("input");
    var form = $("<form>").attr("id", "celebrity-form");
    form.append("<label for='celeb-input'>Add a Celebrity!</label><br>"+
                "<input type='text' id='celeb-input' width='100%'><br>"+
                "<input id='add-celeb' type='submit' class='btn-primary' value='Add Celebrity'>");
    input.append(form);


    function renderButtons(){
        buttons.empty();
        for(var i = 0; i < topics.length; i++){
            //create a button
            var btn = $("<button>");
            // Adds a class of artist
            btn.addClass("btn");
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
                var results = response.data;
                $(".gifs").empty();

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

    $("#content").on("click", "#add-celeb", function(event){
        event.preventDefault();

        var celeb = $("#celeb-input").val().trim();
        $("#celeb-input").val("");
        if(topics.indexOf(celeb) === -1 && celeb.length > 0){
            topics.push(celeb);
            renderButtons();
        }

    })

    $("#content").append(buttons);
    $("#content").append(gifsView);
    $("#content").append(input);
    renderButtons();

})