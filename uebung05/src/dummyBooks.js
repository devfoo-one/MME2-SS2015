_ = require("underscore");

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
     * check if an object got proper format
     * @param  Object   obj book object to check
     * @return Object   book if proper formatted, null if not
     */
    /*
    NOTE maybe check the object for small errors (like no status) and return a corrected one, but if heavy errors occur (like no title) return false.
     */

    /*
    NOTE: name(String, required)
    description(String, optinal)
    ISBN(String, required)
    state(int, optional default 0)
     */
    checkObject: function(obj) { //TODO update me
        if (obj === null || obj === undefined) {
            return null;
        }
        obj = _.pick(obj, 'name', 'description', 'ISBN', 'state');
        if(_.has(obj, 'state') && !_.isNumber(obj.state)) { //if state is no number, convert!
            obj.state = 0;
        }
        obj = _.defaults(obj, {state: 0}); //if no state is given, set default state of 0
        if(_.has(obj, 'description') && !_.isString(obj.description)) { //if description is no string, convert!
            obj.description = String(obj.description);
        }

        if(
            _.has(obj, 'name') &&
            typeof obj.name === "string" &&
            _.has(obj, 'ISBN') &&
            typeof obj.ISBN === "string")
            {
                return obj;
            }
            return null;
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
