// Create movies array
let movies = [
  'The Fifth Element',
  'Jurassic Park',
  'The Shining',
  'Pulp Fiction',
  'Midsommar',
  'It'
]
console.log(movies) // console.log array

// Create function to display btns on page
function showBtn() {
  $("#button-container").empty()

  // For loop to crate btns for movies array
  for (let index = 0; index < movies.length; index++) {

    // Creat new variable, assign attributes, class, text
    let addMovie = $(`<button style="margin: 5px;">`);
    addMovie.addClass('newBtn btn text-light bg-dark')
    addMovie.attr("data-name", movies[index])
    addMovie.text(movies[index])
    $("#button-container").append(addMovie) // Append the button to html
  }
}

// Create function to add gif to html
function showGif() { 

  let apiKey = "Ad44EQ6P3tOqlByyTgrK2gohrEnHW0EA" // Giphy API Key
  let movieAdded = $(this).attr("data-name") // Assign data-name attribute to user input
  console.log(movieAdded)
  let queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q="${movieAdded}"&limit=10&offset=0&rating=R&lang=en`

  $('.gif-container').empty(); // use ajax to retrieve user input from Giphy api
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {
      console.log(JSON.stringify(response)) // console.log object

      let results = response.data // put object into variable

      for (index = 0; index < results.length; index++) { // for loop to set up index array for gifs

        let animateURL = response.data[index].images.downsized.url // variable for animated Gif
        let stillURL = response.data[index].images.downsized_still.url  // variable for still Gif

        let newGif = $(`<div class=shadow p-3 mb-5 bg-white rounded style="margin: 25px">`); // creat container to hold gifs
        newGif.append(`<b>Rating: ${results[index].rating}</b><br>`); // append rating to the newGifs container

        let gif = $('<img>').addClass('switch rounded img-fluid') // assign gifs and image and attributes
        gif.attr('src', animateURL)
        gif.attr('data-still', stillURL)
        gif.attr('data-animate', animateURL)
        gif.attr('data-state', 'animate')
        newGif.append(gif) 

        $('.gif-container').append(newGif) //append the newGiff to the container
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
