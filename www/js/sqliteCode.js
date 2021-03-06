
var dbSuccess="null";
//var dbDetails = db;
var msgString = "";
var ins_STATES = "INSERT INTO states VALUES (?,?)";
var ins_LOG = "INSERT INTO login_dtls VALUES (?,?,?)";
var ins_PD = "INSERT INTO personal_dtls VALUES (?,?,?,?,?,?,?,?,?,?)";
var ins_TC = "INSERT INTO timecard_dtls VALUES (?,?,?,?)";
var ins_SCHED = "INSERT INTO schedule_dtls VALUES (?,?,?,?,?)";
var ins_LEA = "INSERT INTO leave_dtls VALUES (?,?,?,?)";
var ins_AVLEA = "INSERT INTO leave_avl VALUES (?,?,?,?)";
var ins_FED = "INSERT INTO fed_tax_witholding VALUES (?,?,?,?)";
var ins_ST = "INSERT INTO st_tax_witholding VALUES (?,?,?,?)";
var ins_LOC = "INSERT INTO loc_tax_witholding VALUES (?,?,?)";
var ins_PAY = "INSERT INTO pay_dtls VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

var sel_log = "SELECT 1 FROM login_dtls WHERE emp_id = ?";
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
	//msgString+=" onLoad";
	//$("#logTime2").html(""+msgString);
     //document.addEventListener("deviceready", onDeviceReady, false);
     onDeviceReady();
     //checkIfDBExist();
}

function checkIfDataExist(){
	db.transaction(checkForTable, errorDBExist, successDBExist);
}


function checkForTable(tx){
	tx.executeSql('SELECT * FROM LOGIN',[], successCheckTable, errorCheckTable);
}
function successCheckTable(tx, resultSet) {
	if(resultSet.rows.length > 0){
	}else{
		insertDataInTables();
	}
}
function errorCheckTable(tx, err) {
	//console.log("in errorCheckTable: "+err);	
}

function errorDBExist(){
	//console.log("in errorDBExist");
	//onDeviceReady();
}

function successDBExist(){
	//console.log("in successDBExist");
} 

function onDeviceReady() {
    db.transaction(populateDB, errorCB, successCB);
}

function insertDataInTables() {	
    db.transaction(populateDataInTables, errorCB, successCB);
}

function populateDataInTables(tx){
	tx.executeSql('INSERT INTO LOGIN (emp_id, password, username) VALUES (301997, "adphyd", "Shravan")');
    tx.executeSql('INSERT INTO LOGIN (emp_id, password, username) VALUES (301998, "adpind", "Kshitij")');
	tx.executeSql(ins_STATES,[1,"TEXAS"],successCB,errorInsert);
	tx.executeSql(ins_STATES,[2,"CALIFORNIA"],successCB,errorInsert);
	tx.executeSql(ins_STATES,[3,"ARIZONA"],successCB,errorInsert);
	tx.executeSql(ins_PD,[301997,"Shravan Varala","New York",9000461056,"Member Technical","shravan.varala@adpi.com","Hyderabad",9848011224,"Narender",9640571915],successCB,errorInsert);
	tx.executeSql(ins_SCHED,[301997,"13012015",1000,1100,"Meeting"],successCB,errorInsert);
	/*tx.executeSql(ins_LEA,[301997,"01/29/2014","01/29/2014","Privilege"],successCB,errorInsert);*/
	tx.executeSql(ins_AVLEA,[301997, 8, 6, 4],successCB,errorInsert);
	tx.executeSql(ins_FED,[301997,"Married",1480,9876],successCB,errorInsert);
	tx.executeSql(ins_ST,[301997,1,2,1],successCB,errorInsert);
	tx.executeSql(ins_LOC,[301997,1,2],successCB,errorInsert);
	tx.executeSql(ins_PAY,[301997,"1214",54966,3412,2640,1749,517,54990,"Married",110,200,"Arizona","New York","New York","109F-Kansas City MO","2075-Vigo County IN"],successCB,errorInsert);
	tx.executeSql(ins_PD,[301998,"Kshitij Tyagi","Washington",9988778123,"Senior Member Technical","tyagi@adpi.com","New York",9988778866,"Narender",9878768765],successCB,errorInsert);
	tx.executeSql(ins_SCHED,[301998,"13012015",1000,1100,"Meeting"],successCB,errorInsert);
	/*tx.executeSql(ins_LEA,[301998,"01/29/2014","01/29/2014","Privilege"],successCB,errorInsert);*/
	tx.executeSql(ins_AVLEA,[301998, 8, 6, 4],successCB,errorInsert);
	tx.executeSql(ins_FED,[301998,"Married",1480,9876],successCB,errorInsert);
	tx.executeSql(ins_ST,[301998,1,2,1],successCB,errorInsert);
	tx.executeSql(ins_LOC,[301998,1,2],successCB,errorInsert);
	tx.executeSql(ins_PAY,[301998,"1214",5255,3601,2458,1479,667,4159,"Married",100,200,"Arizona","New York","New York","109F-Kansas City MO","2075-Vigo County IN"],successCB,errorInsert);
}

function populateDB(tx) {
    /*tx.executeSql('DROP TABLE IF EXISTS LOGIN');
    tx.executeSql('DROP TABLE IF EXISTS personal_dtls');*/
    tx.executeSql('CREATE TABLE IF NOT EXISTS LOGIN (emp_id unique, password, username TEXT)');
    tx.executeSql("CREATE TABLE IF NOT EXISTS personal_dtls (emp_id INTEGER, name TEXT, city TEXT, contact INTEGER, designation TEXT, email TEXT, work_location TEXT, office_contact INTEGER, emer_name TEXT, emer_contact INTEGER)");
	tx.executeSql("CREATE TABLE IF NOT EXISTS timecard_dtls (emp_id INTEGER, date TEXT, in_time INTEGER, out_time INTEGER)");
	tx.executeSql("CREATE TABLE IF NOT EXISTS schedule_dtls (emp_id INTEGER , date TEXT , start_time INTEGER , end_time INTEGER , description TEXT)");
	tx.executeSql("CREATE TABLE IF NOT EXISTS leave_dtls (emp_id INTEGER , fromdate TEXT , todate TEXT, leave_type TEXT)");
	tx.executeSql("CREATE TABLE IF NOT EXISTS leave_avl (emp_id INTEGER , privilege INTEGER , sick INTEGER, casual INTEGER)");
	tx.executeSql("CREATE TABLE IF NOT EXISTS fed_tax_witholding (emp_id INTEGER, marital_status TEXT, exemptions REAL, addln_witholdings REAL)");
	tx.executeSql("CREATE TABLE IF NOT EXISTS st_tax_witholding (emp_id INTEGER, worked_state INTEGER, lived_state INTEGER, SUISDI INTEGER)");
	tx.executeSql("CREATE TABLE IF NOT EXISTS loc_tax_witholding (emp_id INTEGER, worked_loc INTEGER, lived_loc INTEGER)");
	tx.executeSql("CREATE TABLE IF NOT EXISTS pay_dtls (emp_id INTEGER, month_year TEXT, gross_pay REAL, regular REAL, tax REAL, other REAL, garnishment REAL, take_home REAL, marital_status TEXT, exemptions REAL, addnl_witholdings REAL, worked_state TEXT, lived_state TEXT, suisdi TEXT, worked_loc TEXT, lived_loc TEXT)");
	tx.executeSql("CREATE TABLE IF NOT EXISTS states (state_id INTEGER, state TEXT)");
    /*tx.executeSql('INSERT INTO LOGIN (emp_id, password) VALUES (301997, "adphyd")');
	tx.executeSql(ins_PAY,[301997,"1214",5555,3333,2222,1111,667,4444,"Married",100,200,"Arizona","New York","New York","109F-Kansas City MO","2075-Vigo County IN"],successCB,errorInsert);*/
   	checkIfDataExist();
   }

// Transaction error callback
function errorCB(tx, err) {
    //console.info("Error processing SQL: "+err);
    $("#invalidLogin").html("Failed to Insert Data in Database");
	$("#invalidLogin").show();
}

// Transaction success callback
function successCB() {

}
function errorInsert(){
	//console.log("insert error");
}

function authenticate(){
	db.transaction(queryDB, errorCB);
}

function queryDB(tx) {
    tx.executeSql('SELECT * FROM LOGIN WHERE emp_id='+loggedInUser, [], onQuerySuccess, onQueryFail);
}

function onQuerySuccess(tx, resultSet) {
	var paswrdEntrd = $("#userPwd").val().trim();
	if(resultSet.rows.length > 0){
		if(resultSet.rows.item(0).password === paswrdEntrd){
			$("#userPwd").val("");
			$("#userName").html(""+resultSet.rows.item(0).username);
			populateLogTime();
			$.mobile.changePage("#home");
		}else{
			showLoginError();
		}
	}else{
		showLoginError(); 
	}
	
}

function profileQuerySuccess(tx, resultSet) {
	if(resultSet.rows.length > 0){
		var resObj = resultSet.rows.item(0);
		profileObj = {
            city: resObj.city,
            contact: resObj.contact,
            designation: resObj.designation,
            email: resObj.email,
            emer_contact: resObj.emer_contact,
            emer_name: resObj.emer_name,
            emp_id: resObj.emp_id,
            name: resObj.name,
            office_contact: resObj.office_contact,
            work_location: resObj.work_location
        };
        profile.populateData();
	}else{
		//console.log("no results ") 
	}
	
}
function prUpdateQuerySuccess(tx, resultSet) {
	$.mobile.changePage("#profile");	
}

function prUpdateQueryfail(err) {
	//console.log("in prUpdateQueryfail:");
		
}

function onQueryFail(tx, err) {
	loggedInUser="";
	$("#invalidLogin").html("Sql Error");
	$("#invalidLogin").show(); 
}

function showLoginError(){
	$("#invalidLogin").html("Invalid Credentials");
	$("#invalidLogin").show();
}

var profile = {
	onQuerySuccess: function(tx, resultSet) {
						if(resultSet.rows.length > 0){
							var resObj = resultSet.rows.item(0);
							profileObj = {
				                city: resObj.city,
				                contact: resObj.contact,
				                designation: resObj.designation,
				                email: resObj.email,
				                emer_contact: resObj.emer_contact,
				                emer_name: resObj.emer_name,
				                emp_id: resObj.emp_id,
				                name: resObj.name,
				                office_contact: resObj.office_contact,
				                work_location: resObj.work_location
					        };
					        this.populateData();
						}else{
							//console.log("no results ") 
						}
						
					},
	onQueryFail: function(tx, err) {
					//console.log("falied query to fetch personal_dtls");
				},
	errorCB : function (tx, err) {
				    //console.info("Error processing SQL: "+err);
			   },
	fetchDetails: function(){
					db.transaction(this.queryDB, this.errorCB);
				 },
	populateData: function(){
					$("#prName").html(""+profileObj.name);
	                $("#prCity").html(""+profileObj.city);
	                $("#prContact").html(""+profileObj.contact);
	                $("#prDesg").html(""+profileObj.designation);
	                $("#prEmail").html(""+profileObj.email);
	                $("#prWrkLcn").html(""+profileObj.work_location);
	                $("#prOffcCntct").html(""+profileObj.office_contact);
	                $("#prEmName").html(""+profileObj.emer_name);
	                $("#prEmContact").html(""+profileObj.emer_contact);
				},
	queryDB: function(tx) {
			    tx.executeSql('SELECT * FROM personal_dtls WHERE emp_id='+loggedInUser, [], profileQuerySuccess, prUpdateQueryfail);
	},
	updateQueryDB: function(tx) {
				var tmpSqlStmt = 'UPDATE personal_dtls SET name ="'+profileObj.name+'",city="'+profileObj.city+'",contact='+profileObj.contact+', emer_name="'+profileObj.emer_name+'", emer_contact='+profileObj.emer_contact+' WHERE emp_id='+loggedInUser;
			    tx.executeSql(tmpSqlStmt, [], prUpdateQuerySuccess, prUpdateQueryfail);
	},
	updateDetails: function(){
					db.transaction(this.updateQueryDB, this.errorCB);
	}

}