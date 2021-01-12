var express = require('express');
const router = express.Router();
var mysql = require('mysql')


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Welcome1",
    database : "automation_test"
  });


function executeSqlQuery(qry) {
    return new Promise((resolve, reject) => {
      con.query(qry, function (err, result) {
        if (err) {
            alert_msg = '';
            console.log(err);
            reject(err.sqlMessage);
        } else {
          resolve(result);
          return result
        }
      });
    });
  }
//   SELECT * FROM automation_test.emp_details;

router.post('/add/emp_details', async (req, res) => {
  var data = req.body.field_data;
  qry_insert = ` INSERT INTO tbl_emp_details (emp_name, department, phone) VALUES ('${data[0]}','${data[1]}', '${data[2]}')`
    result = await executeSqlQuery(qry_insert);
    res.redirect("/png01?#tabInline");
})

router.get('/detele/emp_data/:id', async (req, res) => {
  var emp_id = req.params.id;
  qry_delete =  "delete from tbl_emp_details where emp_Id =" +emp_id+";"
  result = await executeSqlQuery(qry_delete);
  res.redirect("/png01?#tabInline");
});

router.post('/emp_data/update/:id',async (req, res) =>{
  var data = req.body.field_data;
  var qry_update =  `update tbl_emp_details set emp_name ="${data[1]}", department = "${data[2]}'",phone = "${data[3]}" where emp_Id = "${req.params.id}"`
  result = await executeSqlQuery(qry_update);
  res.redirect("/png01?#tabInline");
})

module.exports = router