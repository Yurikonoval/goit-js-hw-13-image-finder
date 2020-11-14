import './styles.scss';
import ImageApiServise from './js/apiService.js';
import imageCardTpl from './templates/image-card.hbs';
import getRefs from './js/refs.js';
const debounce = require('lodash.debounce');
import * as basicLightbox from 'basiclightbox';
import LoadMoreBtn from './js/load-more-btn.js';

const refs = getRefs();


const ImageApiService = new ImageApiServise();
const loadMoreBtn = new LoadMoreBtn({selector: '[data-action="load-more"]', 
hidden: true});

refs.searchForm.addEventListener(`input`, debounce(onSearch, 500));
loadMoreBtn.refs.button.addEventListener(`click`, onLoadMore);

function onSearch(e){
    e.preventDefault();
    
    ImageApiService.query = e.target.value;

    clearImagesContainer();

    if (ImageApiService.query === ''){
        loadMoreBtn.hide();
        return;
    }
    loadMoreBtn.show();
    ImageApiService.resetPage();
    loadMoreBtn.disable();    
    ImageApiService.fetchImages().then(hits =>{
        appendImagesMarkUp(hits);
        loadMoreBtn.enable();            
    });  
    
}
function onLoadMore(){
    loadMoreBtn.disable();    
    ImageApiService.fetchImages().then(hits =>{
        appendImagesMarkUp(hits);
        loadMoreBtn.enable();
        scrollGallery();            
    });
}
function appendImagesMarkUp(images){
    refs.galleryContainer.insertAdjacentHTML('beforeend', imageCardTpl(images));
}
function clearImagesContainer(){
    refs.galleryContainer.innerHTML = '';
}

function scrollGallery(){
    window.scrollBy({
        top: document.documentElement.clientHeight - refs.searchForm.clientHeight ,
        behavior: 'smooth'
    })
}

