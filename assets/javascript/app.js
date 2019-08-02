let movies = [
  'The Fifth Element',
  'Jurassic Park',
  'The Shining',
  'Pulp Fiction',
  'Midsommar',
  'It'
]
console.log(movies)

function showBtn() {
  $("#button-container").empty()

  for (let index = 0; index < movies.length; index++) {

    let addMovie = $(`<button style="margin: 5px;">`);
    addMovie.addClass('newBtn btn text-light bg-dark')
    addMovie.attr("data-name", movies[index])
    addMovie.text(movies[index])
    $("#button-container").append(addMovie)
  }
}

function showGif() {

  let apiKey = "Ad44EQ6P3tOqlByyTgrK2gohrEnHW0EA"
  let movieAdded = $(this).attr("data-name")
  console.log(movieAdded)
  let queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q="${movieAdded}"&limit=10&offset=0&rating=R&lang=en`

  $('.gif-container').empty();
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {
      console.log(JSON.stringify(response))

      let results = response.data

      for (index = 0; index < results.length; index++) {

        let animateURL = response.data[index].images.downsized.url
        let stillURL = response.data[index].images.downsized_still.url

        let newGif = $(`<div class=shadow p-3 mb-5 bg-white rounded style="margin: 25px">`);
        newGif.append(`<b>Rating: ${results[index].rating}</b><br>`);

        let gif = $('<img>').addClass('switch rounded img-fluid')
        gif.attr('src', animateURL)
        gif.attr('data-still', stillURL)
        gif.attr('data-animate', animateURL)
        gif.attr('data-state', 'animate')
        newGif.append(gif)

        $('.gif-container').append(newGif)
      }
    })
}

function gifState() {

  // Storing "this" attributes into variables
  let state = $(this).attr('data-state');
  let animate = $(this).attr('data-animate');
  let still = $(this).attr('data-still');

  // Will set the gif to the still url
  if (state == 'animate') {

    $(this).attr('src', still)
    $(this).attr('data-state', 'still')
  }
  // Will set the gif to the animated url

  else {
    $(this).attr('src', animate)
    $(this).attr('data-state', 'animate')
  }
}

$("#add-movie").on("click", function (event) {

  event.preventDefault();

  let newMovie = $("#movie-input").val().trim()

  if (newMovie.length < 1) {
    alert("Submit a movie name")
    return;
  }

  else {

    let apiKey = "Ad44EQ6P3tOqlByyTgrK2gohrEnHW0EA"
    let queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q="${newMovie}"&limit=10&offset=0&rating=R&lang=en`

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {
        if (response.data.length == 0) {
          alert("Enter a valid movie title")
          $("#movie-input").val("")
          return;

        }
        else {
          movies.push(newMovie)
          showBtn()
          $("#movie-input").val("")
        }
      })
  }
})

showBtn();
$(document).on("click", ".newBtn", showGif)
$(document).on("click", ".switch", gifState)