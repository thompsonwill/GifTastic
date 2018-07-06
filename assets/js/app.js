$(document).ready(function(){
var movies = ["The Hangover", "Bridesmaids", "Superbad", "21 Jump Street", "The 40-Year-Old Virgin", "Tropic Thunder"];

function renderButtons() {

  $("#movieTheater").empty();

  // Looping through the array of movies
  for (var i = 0; i < movies.length; i++) {

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

  var movie = $("#movie-input").val().trim();
  console.log("Your new movie choice is: " + movie);

  movies.push(movie);

  renderButtons();

});

  $("body").on("click", ".movie", function() {
  event.preventDefault();
      var movieChoice = $(this).attr("data-name");
      console.log("The button you clicked is: " + movieChoice);

      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        movieChoice + "&api_key=N5OKJJ5Kx7gKlaYEZha1x3zZvZli3Wwd&limit=10";

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
            movieGif.attr("data-state", "still");
            movieGif.attr("data-still", results[i].images.fixed_height_still.url);
            movieGif.attr("data-animate", results[i].images.fixed_height.url);
            
            movieGif.addClass("gif");

            movieDiv.append(p);
            movieDiv.append(movieGif);

            $("#movies").prepend(movieDiv);


            
            $(".gif").on("click", function() {
              var state = $(this).attr("data-state");
              console.log($(this).attr("data-state"));
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
  });