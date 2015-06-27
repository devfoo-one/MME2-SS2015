/**
 * book dummy data
 */

var _books = [{
    name: 'Andy Weir - The Martian',
    description: '',
    ISBN: 'XXXXX4815',
    state: 0
}, {
    title: 'Edgar Allan Poe - Die Grube und das Pendel',
    description: '',
    ISBN: 'XXXXX1623',
    state: 0
}, {
    title: 'H.P. Lovecraft - Berge des Wahnsinns',
    description: '',
    ISBN: 'XXXXX4248',
    state: 0
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
     * populates the database with demo entries
     * @param  mongodb db database
     */
    populateDb: function(db) {
        db.books.insert(_books, function(err, res) {
            if(err) { console.log(err); }
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
        if (retObj) {
            retObj.id = _id;
            return retObj;
        } else {
            return false;
        }
    },
    /**
     * Adds a book to the collection
     * @param  Book             obj
     * @return Book   Book if inserted, false if error
     */
    push: function(obj) {
        if (checkObject(obj)) {
            _books.push(obj);
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
        var _id = Number.parseInt(id);
        if (checkObject(obj)) {
            _books[_id] = obj;
            return this.getById(_id);
            // return true;
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
