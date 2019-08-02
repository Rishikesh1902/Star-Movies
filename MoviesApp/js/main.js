if (document.querySelector('#searchForm')) {
    document.querySelector('#searchForm').addEventListener('submit', getMovies);
}

function getMovies(e) {
    e.preventDefault();
    //get user input
    let searchInput = document.querySelector('#searchTxt').value;
    // console.log(searchInput);

    // using fetch Api
    fetch(`https://www.omdbapi.com/?s=${searchInput}&apikey=d1e3a63a`)
        .then(res => res.json())
        .then(({ Search }) => renderMovies(Search))
        .catch(err => console.log(err))

}

function renderMovies(movies) {
    // console.log(json);
    //  let movies = json.Search;

    let output = '';
    for (var i = 0; i < movies.length; i++) {
        var Poster = movies[i].Poster;
        var Title = movies[i].Title;
        var ID = movies[i].imdbID;
        var Year = movies[i].Year;
        var Plot = movies[i].Plot;

        output += `
                <a onClick="moviesSelected('${ID}')" href="#">
                  <div class="card flip-card" style="width: 18rem; height:500px">
                    <div class="flip-card-inner"> 
                      <div class="flip-card-front">
                        <img class="card-img-top" src="${Poster}" alt="${Title}">
                        <div class="card-body">
                          <h5 class="card-text" style="color:white; text-align:center;">${Title}</h5>
                          <h6 class="card-text" style="color:white; text-align:center;">(${Year})</h6>
                        </div>
                      </div>
                      <div class="flip-card-back">
                        <p style="text-align:justify">${Plot}</p>
                      </div>
                    </div>
                  </div>
                </a>
                `;
    }
    document.querySelector('#movies').innerHTML = output;


}
//function for movie selected for movie.html
function moviesSelected(ID) {

    //to passed data from one page to another is through session storage
    sessionStorage.setItem('movieId', ID);
    window.location = 'movie.html';
    return false;

}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');


    fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=d1e3a63a`)
        .then(res => res.json())
        .then(movie => renderMovie(movie))
        .catch();

}

function renderMovie(movie) {

    let output = `
            <div class="row">
                <div class="col-md-4">
                    <img src="${movie.Poster}">
                </div>

                <div class="col-md-8">
                <h2>${movie.Title}</h2>
                <ul class="list-group">
                    <li class="list-group-item"><strong>Genre : </strong>${movie.Genre}</li>
                    <li class="list-group-item"><strong>Released : </strong>${movie.Released}</li>
                    <li class="list-group-item"><strong>Rated : </strong>${movie.Rated}</li>
                    <li class="list-group-item"><strong>IMDB Rating : </strong>${movie.imdbRating}</li>
                    <li class="list-group-item"><strong>Director : </strong>${movie.Director}</li>
                    <li class="list-group-item"><strong>Writer : </strong>${movie.Writer}</li>
                    <li class="list-group-item"><strong>Actors : </strong>${movie.Actors}</li>
                    <li class="list-group-item"><strong>BoxOffice : </strong>${movie.BoxOffice}</li>
                </ul>

                </div>
            </div>

            <div class="row">
                <div class="well">
                    <h3>Plot</h3>${movie.Plot}
                    <hr>
                    <a href="http://imdb.com/title/${movie.imdbID} "target="_blank " class="btn btn - primary">View IMDB</a> 
                    <a href = "index.html" class = "btn btn-default"> Go Back to Search </a> 
                </div> 
            </div>`;

    document.querySelector('#movie').innerHTML = output;
}
