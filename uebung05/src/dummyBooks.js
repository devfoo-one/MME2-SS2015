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
    name: 'Edgar Allan Poe - Die Grube und das Pendel',
    description: '',
    ISBN: 'XXXXX1623',
    state: 0
}, {
    name: 'H.P. Lovecraft - Berge des Wahnsinns',
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
    checkObject: function(obj) {
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
        if (_.has(obj, 'name') && _.isString(obj.name) && _.has(obj, 'ISBN') && _.isString(obj.ISBN)) {
            return obj;
        }
        return null;
    }
};
