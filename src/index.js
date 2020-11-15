import './styles.scss';
import ImageApiServise from './js/apiService.js';
import imageCardTpl from './templates/image-card.hbs';
import getRefs from './js/refs.js';
const debounce = require('lodash.debounce');
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import LoadMoreBtn from './js/load-more-btn.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { notice, error, success } from '@pnotify/core';

const refs = getRefs();


const ImageApiService = new ImageApiServise();
const loadMoreBtn = new LoadMoreBtn({selector: '[data-action="load-more"]', 
hidden: true});

refs.searchForm.addEventListener(`input`, debounce(onSearch, 500));
loadMoreBtn.refs.button.addEventListener(`click`, onLoadMore);
refs.galleryContainer.addEventListener(`click`, openImage)

function onSearch(e){
    e.preventDefault();
    
    ImageApiService.query = e.target.value;

    clearImagesContainer();

    if (ImageApiService.query === ''){
        loadMoreBtn.hide();
        onSeachError();
        return;
    }
    loadMoreBtn.show();
    ImageApiService.resetPage();
    loadMoreBtn.disable();    
    ImageApiService.fetchImages().then(({hits, total}) =>{
        appendImagesMarkUp(hits);
        loadMoreBtn.enable();
        onNotification(total);
                              
    });  
    
}
function onLoadMore(){
    loadMoreBtn.disable();    
    ImageApiService.fetchImages().then(({hits}) =>{
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
function onSeachError(){
    error({
        title: 'Wrong search parameters',
    text: 'Change search parameters, please.',
delay: 2000});      
}
function onNotification(total){
if (total === 0){
    notice({
        title: 'There are no matches',
    text: 'Change search parameters, please.',
delay: 2000});
}
else{
    success({
        title: `There are ${total} results`,
    text: 'Enjoy watching',
delay: 2000}); 
}
}
function openImage(e){
    if (e.target.nodeName !== 'IMG'){
        return
    }
    const instance = basicLightbox.create(`
    <img src="${e.target.dataset.source}" width="800" height="600">
`)
instance.show();
}
