var searchInput = document.querySelector('#topbar-search-input');
var PrevSearchValue = undefined;

searchInput.addEventListener('keyup', function() {
var alg_client = algoliasearch('XJJ21H0FWD', '3c7a39e3e013bc33144abf9ade33ba3e');
var alg_index = alg_client.initIndex('prod_person_tiles');
const searchValue = searchInput.value;

if(PrevSearchValue !== searchValue) {
    alg_index.search(searchValue, function searchDone(err, content) {
        console.log(err, content)
    });

    PrevSearchValue = searchValue
        /*if(searchValue.length === 0) {
            this.searchCloseButton.classList.add('hide')
        } else {
            this.searchCloseButton.classList.remove('hide')
        }*/
    }
});