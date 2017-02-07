var pgp = require('pg-promise')({
   noWarnings: true
});

var config = {
  host: 'localhost',
  database: 'efrei',
  user: 'efrei',
  port: 5432,
  password: '1994'
};

//console.log(config);
const DB = pgp(config);

// export the class
module.exports = DB;


/*// Constructor
function DatabaseConnector() {
	this.connection = pgp(cn);
}

var db = new DatabaseConnector();*/


