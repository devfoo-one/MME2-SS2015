/**
 * book dummy data
 */

var _books = [{
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

/**
 * check if an object got proper format
 * @param  Object   obj book object to check
 * @return boolean      true if proper format
 */
var checkObject = function(obj) {
    if (obj === null || obj === undefined) {
        return false;
    }
    return obj.hasOwnProperty('title') && obj.hasOwnProperty('author') && obj.hasOwnProperty('year');
};

module.exports = {
    /**
     * returns all books out of the collection
     * @return [Books]  Array of Books
     */
    getAll: function() {
        return _books.map(function(obj, index) {
            var rObj = obj;
            rObj.id = index;
            return rObj;
        });
    },
    /**
     * Gets one specific book
     * @param  Number id
     * @return Book
     */
    getById: function(id) {
        var _id = Number.parseInt(id);
        var retObj = _books[_id];
        retObj.id = _id;
        return retObj;
    },
    /**
     * Adds a book to the collection
     * @param  Book             obj
     * @return Book   Book if inserted, false if error
     */
    push: function(obj) {
        if (checkObject(obj)) {
            _books.push(obj);
            // return _books.length - 1; //simulate return of ID of inserted Object
            return this.getById(_books.length - 1);
        }
        return false;
    },
    /**
     * Updates one specific book
     * @param  Book obj
     * @param  Number id
     * @return BookBoolean  success?
     */
    update: function(obj, id) {
        if (checkObject(obj)) {
            _books[id] = obj;
            return true;
        }
        return false;
    },
    /**
     * Deletes one specific book
     * @param  Number id
     * @return Boolean  success?
     */
    delete: function(id) {
        if (_books[id] !== undefined) {
            _books.splice(id, 1);
            return true;
        }
        return false;
    }
};
