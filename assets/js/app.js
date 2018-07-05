var movies = ["The Hangover", "Bridesmaids", "Superbad", "21 Jump Street", "The 40-Year-Old Virgin", "Tropic Thunder"];

function renderButtons() {

  // Deleting the movies prior to adding new movies
  // (this is necessary otherwise we will have repeat buttons)
  $("#movieTheater").empty();

  // Looping through the array of movies
  for (var i = 0; i < movies.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of movie to our button
    a.addClass("movie");
    // Adding a data-attribute
    a.attr("data-name", movies[i]);
    // Providing the initial button text
    a.text(movies[i]);
    // Adding the button to the HTML
    $("#movieTheater").append(a);
  }
}
renderButtons();

$("#add-movie").on("click", function(event) {
  // Preventing the buttons default behavior when clicked (which is submitting a form)
  event.preventDefault();
  // This line grabs the input from the textbox
  var movie = $("#movie-input").val().trim();

  // Adding the movie from the textbox to our array
  movies.push(movie);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();

});

$("button").on("click", function() {
      var movie = $(this).attr("data-name");

      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        movie + "&api_key=N5OKJJ5Kx7gKlaYEZha1x3zZvZli3Wwd&limit=10";

      // Performing an AJAX request with the queryURL
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        // After data comes back from the request
        .then(function(response) {

          console.log(queryURL);

          console.log(response);
          var results = response.data;

          for (var i = 0; i < results.length; i++) {

            var movieDiv = $("<div>");

            var p = $("<p>").text("Rating: " + results[i].rating);

            var movieGif = $("<img>");
            movieGif.attr("src", results[i].images.fixed_height_still.url);
            movieGif.attr("data-still", results[i].images.fixed_height_still.url);
            movieGif.attr("data-animate", results[i].images.fixed_height.url);
            movieGif.attr("data-state", "still");
            movieGif.addClass("gif");

            movieDiv.append(p);
            movieDiv.append(movieGif);

            $("#movies").prepend(movieDiv);


            $(".gif").on("click", function() {
              console.log("Gif click");
              var state = $(this).attr("data-state");
              console.log(state);
              if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
              } else {
                  $(this).attr("src", $(this).attr("data-still"));
                  $(this).attr("data-state", "still");
                  }
                  
            });
          }
        });
    });
