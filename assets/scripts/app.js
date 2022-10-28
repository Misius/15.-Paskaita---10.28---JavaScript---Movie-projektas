'use strict';
console.log('app.js');



// taikomes 
const els = {
    addMovieBtn: document.getElementById('add-movie-btn'),
    addMovieModal: document.getElementById('add-modal'),
    backdrop: document.getElementById('backdrop'),
    addMovieForm: document.getElementById('add-movie-form'),
    moviesContainer: document.getElementById('movie-list'),
    cancelBtn: document.getElementById('cancel'),
    noMoviesContainer: document.getElementById('entry-text'),
    // delete: document.getElementById('delete'),
    
};
// bendras globalus filmu kintamasis

let mainMoviesArr = [];

addNewMovieHandler({
    imageUrl: 'https://picsum.photos/id/1003/600/500',
    title: 'Bambi',
    rating: '5',
    id: generateId(),

});
addNewMovieHandler({
    imageUrl: 'https://picsum.photos/id/1003/600/500',
    title: 'Bambi2',
    rating: '4',
    id: generateId(),

});



// console.log(els);
//    EVENT LISTENERS ====================================================
// ========================================================================
// ========================================================================
// Paspaudimas and add movie btn =================================
els.addMovieBtn.addEventListener('click', () => {
    // parodyti modal
    console.log('click');
    els.addMovieModal.classList.add('visible');
    // parodyti backdrop
    els.backdrop.classList.add('visible');
});
//  uzdeti paspaudimo pasiklausyma and backdrop
els.backdrop.addEventListener('click', closeMovieModal);
//  uzdeti cancel mygtukui pasikalusyma ir atlikti ta pati ka ir darem su backdrop paspaudus
els.cancelBtn.addEventListener('click', closeMovieModal);
// klausomes formos issiuntimo ir dtabdom perkrovima
els.addMovieForm.addEventListener('submit', (event) => {
    // stabdom perkrovima
    event.preventDefault();
    console.log('add movie');
    // gauti input reiksmes
    const newMovieDetails = {
        title : els.addMovieForm.elements.title.value.trim(),
        rating : els.addMovieForm.elements.rating.value.trim(),
        imageUrl : els.addMovieForm.elements['image-url'].value.trim(),
    }
    console.log('newMovieDetails ===', newMovieDetails);
    // mini validacija
    // jei nors vienas laukas neivestas
    if (newMovieDetails.title === '' || newMovieDetails.imagerl === '' || newMovieDetails.rating === '') {
        // stabdom tolimesni filmo pridejimo vygdymą
        console.log('stop ne viskas ivesta');
        return;

    };
    
    addNewMovieHandler(newMovieDetails);



    // jei viskas gerai sukuriam html vieno movie

    const newMovieHtmlEl = makeOneMovieHtmlEl(newMovieDetails);

    // talpinam ta movie i dom
    console.log('talpinam movie');
    
});

//    MAIN FUNCTIONS ====================================================
// ========================================================================
// ========================================================================
function addNewMovieHandler(newMovieObj) {
    // jei viskas gerai pridedam ta filma i mainMoviesArr
    mainMoviesArr.push(newMovieObj);
    // paslepti elementa kuri rodomas jei neturim nei vieno filmo
    els.noMoviesContainer.style.display = 'none';

    // issivalyti saraso konteineri kad nebutu dubliuojami alementai su apend
    els.moviesContainer.innerHTML = '';
    // sukti cikla per visa mainMoviesArr sugeneruoti naujus movies hml elementus is masyvo
    mainMoviesArr.forEach((mObj) => {
        const newMovieHtmlEl = makeOneMovieHtmlEl(mObj);
        els.moviesContainer.append(newMovieHtmlEl);
    });
    closeMovieModal();
}

function closeMovieModal() {
    // Paslepti modal
    els.addMovieModal.classList.remove('visible');
    // Paslepti backdrop
    els.backdrop.classList.remove('visible');
}
/** 
*
* @param {Object} neMovieObj;
*/
const user = {
    'user name': 'JAmes',
    'user-name': 'JAmes',
};
console.log('user ===', user);
/*
<div class="movie-element__image">
img src="https://picsum.photos/id/1003/600/500" alt="element__image">
</div>
<div class="movie-element__info">
<h2>Title</h2>
<p>rating/5 stars</p>
</div>
*/
function makeOneMovieHtmlEl(newMovieObj) {
    console.log('newMovieObj ===', newMovieObj);
    // isorini el sukuriam su createElement
    const liEl = document.createElement('li');
    liEl.className = 'movie-element';
    // prisidedam movieID atributa 
    liEl.dataset.movieId = newMovieObj.id;
    // vidinius elementus su string (veliau reiktu perdaryti i createElement)
    const liInsideHtml = `
    <div class="movie-element__image">
      <img src="${newMovieObj.imageUrl}" alt="element__image">
    </div>
    <div class="movie-element__info">
      <h2>${newMovieObj.title}</h2>
      <p>${newMovieObj.rating}/5 stars</p>
      <i class="delete fa fa-trash"></i>
    </div>
    `;
    // dedam string elementu i li elementa
    liEl.insertAdjacentHTML('afterbegin', liInsideHtml);
    // console.log(liEl);
    
    const deleteBtn = liEl.querySelector('.delete');
    console.log('deleteBtn ===', deleteBtn);
    deleteBtn.addEventListener('click', movieDeleteHandler);
    return liEl;
  }


  function movieDeleteHandler(event) {
    
    console.log('Delete movie', event.target);
    const deleteIconEl = event.target;
    const movieElToDelete = deleteIconEl.closest('li');
    const idOfElToBeDeleted = movieElToDelete.dataset.movieId;

    mainMoviesArr = mainMoviesArr.filter((mObj) => mObj.id === idOfElToBeDeleted);
    console.log('idOfElToBeDeleted ===', idOfElToBeDeleted);
    // bet kada ivykus pokyciui mes kvieciam render
    
    renderMovies();
  }

  function renderMovies() {
    // issivalyti saraso konteineri kad nebutu dubliuojami elementai su apend
    els.moviesContainer.innerHTML = '';
    if (mainMoviesArr.length > 0) {
        els.noMoviesContainer.style.display = 'none';
    } else {
        els.noMoviesContainer.style.display = 'block';
        return;
    }
    // sukti cikla per visa mainMoviesArr. sugeneruoti naujus movies html elementus is masyvo
  mainMoviesArr.forEach((mObj) => {
    // jei viskas gerai sukuriam html vieno movie
    const newMovieHtmlEl = makeOneMovieHtmlEl(mObj);
    // talpinam ta movie i dom
    els.moviesContainer.append(newMovieHtmlEl);
    });
  }


  //    HELPER FUNCTIONS ====================================================
// ========================================================================
// ========================================================================


function generateId() {
    return Math.random().toFixed(8).slice(2);
};

