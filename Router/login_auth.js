const lib = require("./outlook_auth");
var express = require('express');
const router = express.Router();
var mysql = require('mysql')


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Welcome1",
  database : "automation_test"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected_2");
});

/*    
*     On pageload.
*/
router.get('/', function(req, res){
    // res.send("Hello")
    res.render('pages/login',{

    })
    // var result = await executeSqlQuery("SELECT * FROM emp_details"); 
    // res.render('pages/index',{
    //   lst_emp_details : result
    // })
});

router.get('/png01',async function(req, res){
  // res.send("Hello")
  var tbl01result = await executeSqlQuery("SELECT * FROM tbl_emp_details"); 
  var tbl02result = await executeSqlQuery("SELECT * FROM tbl_emp_detail02"); 
  res.render('pages/index',{
    lst_emp_details : tbl01result,
    lst_emp_details02 : tbl02result
  }) 

});
function executeSqlQuery(qry) {
  return new Promise((resolve, reject) => {
    con.query(qry, function (err, result) {
      if (err) {
          console.log(err);
          reject(err.sqlMessage);
      } else {
        resolve(result);
        return result
      }
    });
  });
}
//   

router.get('/get_emp_details', async (req, res) => {
 
})

router.post('/Outlook_auth',function(req, res){
  lib.authenticate(req.body.email,req.body.password,res);
});


module.exports = router