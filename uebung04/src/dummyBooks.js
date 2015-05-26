/**
 * book dummy data
 */

var books = [{
    title: 'The Martian',
    author: 'Andy Weir',
    year: '2011'
}, {
    title: 'Die Grube und das Pendel',
    author: 'Edgar Allan Poe',
    year: '1842'
}, {
    title: 'Berge des Wahnsinns',
    author: 'H.P. Lovecraft',
    year: '1936'
}];

module.exports = {
    books: books.map(function(obj, index){
        var rObj = obj;
        rObj.id = index;
        return rObj;
    })
};
