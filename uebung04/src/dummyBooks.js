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
    getAll: function() {
        return _books.map(function(obj, index) {
            var rObj = obj;
            rObj.id = index;
            return rObj;
        });
    },
    getById: function(id) {
        return _books[id];
    },
    push: function(obj) {
        if (checkObject(obj)) {
            _books.push(obj);
            return true;
        }
        return false;
    },
    update: function(obj, id) {
        if (checkObject(obj)) {
            _books[id] = obj;
            return true;
        }
        return false;
    },
    delete: function(id) {
        if (_books[id] !== undefined) {
            _books.splice(id, 1);
            return true;
        }
        return false;
    }
};
