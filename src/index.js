import './styles.scss';
import ImageApiServise from './js/apiService.js';
import imageCardTpl from './templates/image-card.hbs';


const refs = {
    searchForm : document.querySelector(`.search-form`),
    galleryContainer : document.querySelector(`.gallery`),
    loadMoreBtn : document.querySelector(`[data-action="load-more"]`),
}

refs.searchForm.addEventListener(`submit`, onSearch);
refs.loadMoreBtn.addEventListener(`click`, onLoadMore);

const ImageApiService = new ImageApiServise();

function onSearch(e){
    e.preventDefault();
    
    ImageApiService.query = e.currentTarget.elements.query.value;

    if (ImageApiService.query === ''){
        return;
    }
    ImageApiService.resetPage();    
    ImageApiService.fetchImages().then(hits =>{
        clearImagesContainer();
        appendImagesMarkUp(hits);});
    
}

function onLoadMore(){    
    ImageApiService.fetchImages().then(hits =>{appendImagesMarkUp(hits)});
}
function appendImagesMarkUp(images){
    refs.galleryContainer.insertAdjacentHTML('beforeend', imageCardTpl(images));
}
function clearImagesContainer(){
    refs.galleryContainer.innerHTML = '';
}



