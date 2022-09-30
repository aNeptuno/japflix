
const japflix = "https://japceibal.github.io/japflix_api/movies-data.json";
let datos = [];

document.addEventListener("DOMContentLoaded", () => {
    fetch(japflix).then(r => r.json()).then(d => {
        datos = d;
    })
});



let searchBtn = document.getElementById("btnBuscar");
searchBtn.addEventListener('click', function(evento) {
    evento.preventDefault();
    let searchTerms = document.getElementById("inputBuscar").value.toUpperCase();
    filterWithSearchTerms(searchTerms);
});

function filterWithSearchTerms(searchTerms){

    let htmlContentToAppend = "";
    for(let film of datos){

        /* title o genres o tagline u overview. */
        let title = film.title.toUpperCase();
        let genre = film.genres; 
        let tagline = film.tagline.toUpperCase();
        let overview = film.overview.toUpperCase();

        let fecha = film.release_date.slice(0,4);
        let runtime = film.runtime;
        let budget = film.budget;
        let revenue = film.revenue;

        let isGenre = false;

        let htmlGeneros = "";
        for (let g of genre){
            if(g.name.toUpperCase().indexOf(searchTerms) > -1){
                isGenre = true;
            }
            htmlGeneros += `${g.name} - `;
        } 

        let score = Math.round(film.vote_average / 2);
        let htmlestrellas = `<span class="fa fa-star checked"></span>`

            /* The indexOf() method returns the first index at which a given element can be found in the array, or -1 if it is not present.*/
            if(title.indexOf(searchTerms) > -1 || isGenre || tagline.indexOf(searchTerms) > -1 || overview.indexOf(searchTerms) > -1 ) {
                    htmlContentToAppend += `
                    <div class="list-group-item list-group-item-action cursor-active">
                        <div class="col">
                                <div class="d-flex w-100 justify-content-between">
                                    <a class="" data-bs-toggle="offcanvas" href="#offcanvasTop${film.id}" role="button" aria-controls="offcanvasExample">
                                        <h4 class="mb-1">${film.title}</h4>
                                    </a>
                                    <small class="text-muted">${htmlestrellas.repeat(score)}</small>
                                </div>
                                <i class="mb-1">${film.tagline}</i>
                        </div>
                    </div>

                    <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop${film.id}" aria-labelledby="offcanvasTopLabel">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="offcanvasTopLabel">${film.title}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body">
                            <p>${film.overview}</p>
                            <hr>
                            <small class="text-muted" id="generos">${htmlGeneros}</small>
                            
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    More
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#">Year: ${fecha}</a></li>
                                    <li><a class="dropdown-item" href="#">Runtime: ${runtime} mins</a></li>
                                    <li><a class="dropdown-item" href="#">Bugdet: $${budget}</a></li>
                                    <li><a class="dropdown-item" href="#">Revenue: $${revenue}</a></li>
                                </ul>
                            </div>
                        
                        </div>
                    </div>
                    `


            document.getElementById("lista").innerHTML = htmlContentToAppend;     
        
    }
}
}
