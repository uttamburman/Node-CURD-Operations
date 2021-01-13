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

router.post('/add/emp_details/tbl02/', async (req, res) => {
  qry_insert = ` INSERT INTO tbl_emp_detail02 (emp_name, emp_email, address, phone) VALUES ('${req.body.empName}','${req.body.empEmail}', '${req.body.empAddress}', '${req.body.empPhone}')`
    result = await executeSqlQuery(qry_insert);
    res.redirect("/png01#Modal_design");
})



router.get('/get_emp_data/edit/:id', async (req, res) => {
  var emp_id = req.params.id;
  qry_get_data =  "select * from tbl_emp_detail02 where id = " +emp_id+";"
  result = await executeSqlQuery(qry_get_data);
  res.send(result);
});

router.post('/emp_datatbl02/update/:id',async (req, res) =>{
  var qry_update =  `update tbl_emp_detail02 set emp_name ="${req.body.empName01}", emp_email = "${req.body.empEmail01}",address = "${req.body.empAddress01}",phone = "${req.body.empPhone01}" where id = "${req.params.id}"`
  result = await executeSqlQuery(qry_update);
  res.redirect("/png01#Modal_design");
})

router.get('/emp_datatbl02/detele/:id', async (req, res) => {
  var emp_id = req.params.id;
  qry_delete =  "delete from tbl_emp_detail02 where id =" +emp_id+";"         
  result = await executeSqlQuery(qry_delete);
  res.redirect("/png01#Modal_design");
});

module.exports = router