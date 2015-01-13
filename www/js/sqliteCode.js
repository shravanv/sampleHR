var db = window.openDatabase("myDB","1.0","myDB",1000000);
var dbSuccess="null";
var dbDetails = db;
var msgString = "";
var ins_STATES = "INSERT INTO states VALUES (?,?)";
var ins_LOG = "INSERT INTO login_dtls VALUES (?,?)";
var ins_PD = "INSERT INTO personal_dtls VALUES (?,?,?,?,?,?,?,?,?,?)";
var ins_TC = "INSERT INTO timecard_dtls VALUES (?,?,?,?)";
var ins_SCHED = "INSERT INTO schedule_dtls VALUES (?,?,?,?,?)";
var ins_LEA = "INSERT INTO leave_dtls VALUES (?,?,?)";
var ins_FED = "INSERT INTO fed_tax_witholding VALUES (?,?,?,?)";
var ins_ST = "INSERT INTO st_tax_witholding VALUES (?,?,?,?)";
var ins_LOC = "INSERT INTO loc_tax_witholding VALUES (?,?,?)";
var ins_PAY = "INSERT INTO pay_dtls VALUES (?,?,?,?,?,?,?,?)";

var sel_log = "SELECT 1 FROM login_dtls WHERE emp_id = ? AND password = ?";
var sel_pd = "SELECT * FROM personal_dtls WHERE emp_id = ?";
var sel_STATES = "SELECT state from states WHERE state_id = ?";
var sel_tc = "SELECT * FROM timecard_dtls WHERE emp_id = ? AND date = ?";
var sel_sched = "SELECT * FROM schedule_dtls WHERE emp_id = ? AND date = ?";
var sel_leaveCt = "SELECT count(1) FROM leave_dtls WHERE emp_id = ? AND leave_type = ?";
var sel_fed = "SELECT * FROM fed_tax_witholding WHERE emp_id = ?";
var sel_st = "SELECT * FROM st_tax_witholding WHERE emp_id = ?";
var sel_loc = "SELECT * FROM loc_tax_witholding WHERE emp_id = ?";
var sel_pay = "SELECT * FROM pay_dtls WHERE emp_id = ?";

function onLoad() {
	msgString=+" in onLoad";
     document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady(){
	msgString=+" in onDeviceReady";
	db.transaction(initDB, error, success);
	db.transaction(dummyData, error, success);
}
function initDB(txn){
	msgString=+" in initDB";
	txn.executeSql("CREATE TABLE IF NOT EXISTS login_dtls (emp_id INTEGER, password TEXT)");
	/*txn.executeSql("CREATE TABLE IF NOT EXISTS personal_dtls (emp_id INTEGER, name TEXT, city TEXT, contact INTEGER, designation TEXT, email TEXT, work_location TEXT, office_contact INTEGER, emer_name TEXT, emer_contact INTEGER)");
	txn.executeSql("CREATE TABLE IF NOT EXISTS timecard_dtls (emp_id INTEGER, date TEXT, in_time INTEGER, out_time INTEGER)");
	txn.executeSql("CREATE TABLE IF NOT EXISTS schedule_dtls (emp_id INTEGER , date TEXT , start_time INTEGER , end_time INTEGER , description TEXT)");
	txn.executeSql("CREATE TABLE IF NOT EXISTS leave_dtls (emp_id INTEGER , date TEXT , leave_type INTEGER)");
	txn.executeSql("CREATE TABLE IF NOT EXISTS fed_tax_witholding (emp_id INTEGER, marital_status TEXT, exemptions REAL, addln_witholdings REAL)");
	txn.executeSql("CREATE TABLE IF NOT EXISTS st_tax_witholding (emp_id INTEGER, worked_state INTEGER, lived_state INTEGER, SUISDI INTEGER)");
	txn.executeSql("CREATE TABLE IF NOT EXISTS loc_tax_witholding (emp_id INTEGER, worked_loc INTEGER, lived_loc INTEGER)");
	txn.executeSql("CREATE TABLE IF NOT EXISTS pay_dtls (emp_id INTEGER, month_year TEXT, gross_pay REAL, regular REAL, tax REAL, other REAL, garnishment REAL, take_home REAL)");
	txn.executeSql("CREATE TABLE IF NOT EXISTS states (state_id INTEGER, state TEXT)");*/
}

function dummyData(txn){
	msgString=+" in dummyData";
	txn.executeSql(ins_LOG,[12345,"12345"],success,error);
	/*txn.executeSql(ins_STATES,[1,"TEXAS"],success,error);
	txn.executeSql(ins_STATES,[2,"CALIFORNIA"],success,error);
	txn.executeSql(ins_STATES,[3,"ARIZONA"],success,error);
	txn.executeSql(ins_PD,[12345,"Tom","New York",9988778866,"Sr.Exec.","tom@adpi.com","New York",9988778866,"Alex",9878768765],success,error);
	txn.executeSql(ins_TC,[12345,"13012015",900,1800],success,error);
	txn.executeSql(ins_SCHED,[12345,"13012015",1000,1100,"Meeting"],success,error);
	txn.executeSql(ins_LEA,[12345,"14012015",2],success,error);
	txn.executeSql(ins_FED,[12345,"Married",1480,9876],success,error);
	txn.executeSql(ins_ST,[12345,1,2,1],success,error);
	txn.executeSql(ins_LOC,[12345,1,2],success,error);
	txn.executeSql(ins_PAY,[12345,"1214",5555,3333,2222,1111,667,4444],success,error);*/
}

function fetchLoginDetails(empId, pwd){
	db.transaction(function(tx) {
		tx.executeSql(loginSel,[empId, pwd], onQuerySuccess, error);
	}, error, success);
}
//function onQuerySuccess(tx, resultSet) {
//	var len = resultSet.rows.length;
//}

function error(err){
	msgString=+" in error";
	dbSuccess = err;
}
function success(){
	msgString=+" in success";
	dbSuccess = "Success";
}