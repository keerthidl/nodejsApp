/**
 * importing the express router and mysql module 
 */
var express = require('express');  
var router = express.Router();
var mysql = require('mysql');

/**
 * connecting to mysql database 
 */
var db = mysql.createPool({
  host: 'localhost',//db hostname 
  user: 'root',//db username 
  password:'password',//db password
  database:'socka',//database 
  debug: 'false'
})


/**
* get data 
*/


/**
 * get list of all students from the data base and display 
 * it in the table 
 */
router.get('/student', function(req, res, next){
  db.query('SELECT * FROM students', function(err, result){
    res.render('editPlayer',{ students: result});

  });
});


/**
 * get the student detail form 
 */
router.get('/form', function(req,res, next){
  res.render('form', {students: {} });
});

/**
 * posting the student details into the database 
 * and should be return successfull message upon saving.
 */
router.post('/form', function(req, res, next){
  db.query('INSERT INTO students SET ?', req.body, function(err, result){
    res.send('inserted ');
  })
})


/**
 * deletes a particular student considering the firstName 
 * and returns to student list upon successfull deletion.
 */
router.get('/delete', function(req,res,next){
  db.query('DELETE FROM students WHERE first_name = ?', req.query.first_name, function(err, result){
    res.redirect('/student');
  })
});

/**
 *editing particular data , this will populate data in
 the form which has to be edited.
 */
router.get('/edit', function(req,res,next){
  db.query('SELECT * FROM students WHERE first_name = ?',req.query.first_name, function(err, result){
    res.render('form', {students: result[0]});
  })
});

/**
 * saving the edited data. returns to student list 
 * with updated data and save the updated data in
 * the database. 
 */
router.post('/edit',function(req, res, next){
  var param = [
    req.body.last_name, //data for update
    req.query.first_name //condition for update
  ]
  db.query('UPDATE students SET  last_name = ? WHERE first_name = ?', param, function(err, result){
    res.redirect('/student');
  })
})

module.exports = router;
