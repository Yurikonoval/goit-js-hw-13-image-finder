const API_KEY = '19076620-7a0fb8f11fcad59e80e6da8cf';
const BASE_URL = `https://pixabay.com/api`;


export default class ImageApiService{
    constructor(){
        this.searchQuery = '';
        this.page = 1;
    }
        fetchImages(){                
        const url = `${BASE_URL}/?page=${this.page}&key=${API_KEY}&q=${this.searchQuery}&image_type=photo&pretty=true&per_page=12&orientation=horizontal`;
        
        return fetch(url)
        .then(response => response.json())
        .then(({hits}) => {
            this.incrementPage();            
            return hits;
        });
    }
        incrementPage(){
            this.page += 1;
        }
        resetPage(){
            this.psge = 1;
        }
        get query() {
            return this.searchQuery;
        }
        
        set query(newQuery) {
            this.searchQuery = newQuery;
        }
            
}



