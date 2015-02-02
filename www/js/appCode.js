function diffbtwnDates( date1, date2 ) {
  var one_day=1000*60*60*24;
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();
  var difference_ms = date2_ms - date1_ms;
  return Math.round(difference_ms/one_day); 
}

function payQuerySuccess(tx, resultSet) {
	if(resultSet.rows.length > 0){
		var resObj = resultSet.rows.item(0);
		payObj = {
            month: resObj.month,
            gross_pay: resObj.gross_pay,
            regular: resObj.regular,
            tax: resObj.tax,
            other: resObj.other,
            garnishment: resObj.garnishment,
            take_home: resObj.take_home,
            marital_status: resObj.marital_status,
            exemptions: resObj.exemptions,
            addnl_witholdings : resObj.addnl_witholdings,
            worked_state : resObj.worked_state,
            lived_state : resObj.lived_state,
            suisdi : resObj.suisdi,
            worked_loc : resObj.worked_loc,
            lived_loc : resObj.lived_loc
        };
        $("#hmgrPay").html("Gross Pay : $ "+payObj.gross_pay);
        $("#hmTax").html("Tax&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: $ "+payObj.tax);
        $("#hmtkHome").html("Take Home : $"+payObj.take_home);
	}else{
		
	}	
}

function payUpdateQuerySuccess(tx, resultSet) {
	console.log("in payUpdateQuerySuccess");
	$( "#popupPaySave" ).popup( "open" );
}

function payQueryFail(tx, err) {
	console.log("in payQueryFail");
}


var payMethods = {
	errorCB : function (tx, err) {
				    console.info("Error processing SQL: "+err);
			   },
	fetchDetails: function(){
					db.transaction(this.queryDB, this.errorCB);
				 },
	populateData: function(){
					$("#pygross").html("$ "+payObj.gross_pay);
	                $("#pyregular").html("$ "+payObj.regular);
	                $("#pytax").html("$ "+payObj.tax);
	                $("#pyother").html("$ "+payObj.other);
	                $("#pygarnish").html("$ "+payObj.garnishment);
	                $("#pytakehome").html("$ "+payObj.take_home);
	                $("#marStatus").val(payObj.marital_status).selectmenu('refresh');
	                $("#exemAmt").val(payObj.exemptions);
	                $("#addWhAmt").val(payObj.addnl_witholdings);
	                $("#stWrkdIn").val(payObj.worked_state).selectmenu('refresh');
	                $("#stLvdIn").val(payObj.lived_state).selectmenu('refresh');
	                $("#suSDI").val(payObj.suisdi).selectmenu('refresh');
	                $("#lvdLocal").val(payObj.lived_loc).selectmenu('refresh');
	                $("#wrkLocal").val(payObj.worked_loc).selectmenu('refresh');
				},
	queryDB: function(tx) {
			    tx.executeSql('SELECT * FROM pay_dtls WHERE emp_id='+loggedInUser, [], payQuerySuccess, payQueryFail);
	},
	updateQueryDB: function(tx) {
				var tmpSqlStmt = 'UPDATE pay_dtls SET marital_status ="'+payObj.marital_status+'",exemptions='+payObj.exemptions+',addnl_witholdings='+payObj.addnl_witholdings+', worked_state="'+payObj.worked_state+'", lived_state="'+payObj.lived_state+'", suisdi="'+payObj.suisdi+'", worked_loc="'+payObj.worked_loc+'", lived_loc="'+payObj.lived_loc+'" WHERE emp_id='+loggedInUser;
			    console.log("pay update  : "+tmpSqlStmt);
			    tx.executeSql(tmpSqlStmt, [], payUpdateQuerySuccess, payQueryFail);
	},
	updateDetails: function(){
					db.transaction(this.updateQueryDB, this.errorCB);
	}

};

function avlLaveQuerySuccess(tx, resultSet) {
	if(resultSet.rows.length > 0){
		var resObj = resultSet.rows.item(0);
		leaveObj={
            privilege:resObj.privilege,
            sick: resObj.sick,
            casual: resObj.casual,
        };
        leaveMethods.populateAvailableLeaveData();
	}else{
		//console.log("no results ") 
	}	
}
function apldLaveQuerySuccess(tx, resultSet) {
	var resLength = resultSet.rows.length; 
	$("#tblApldLeaves").children("tbody").children("tr").remove();
	if(resLength> 0){
		$("#noLeaves").hide();
		for(var i=0;i<resLength;i++){
			 var lRow = document.createElement("tr");
			 var frTd = document.createElement("td");
			 var toTd = document.createElement("td");
			 var typeTd = document.createElement("td");
			 $(frTd).html(resultSet.rows.item(i).fromdate);
			 $(toTd).html(resultSet.rows.item(i).todate);
			 $(typeTd).html(resultSet.rows.item(i).leave_type);
			 $(lRow).append(frTd).append(toTd).append(typeTd);
			 $("#tblApldLeaves").append(lRow)
		}
        $("#tblApldLeaves").show();
	}else{
		$("#tblApldLeaves").hide();
		$("#noLeaves").show();
	}
}
function leaveInsertQuerySuccess(tx, resultSet) {
	$("#frmDate").val(""); 
    $("#toDate").val("");
	$("#leaveError").html("Applied Successfully");
    $( "#popupApplyError" ).popup( "open" );
}

function leaveQueryFail(tx, err) {
	//console.log("Pay query Fail");
}
function avlLeaveUpdateQuerySuccess(tx, resultSet){
	leaveMethods.populateAvailableLeaveData();
}


var leaveMethods = {
	errorCB : function (tx, err) {
				    console.info("Error processing SQL: "+err);
			   },
	fetchAvailableLeaves: function(){
					db.transaction(this.queryDB, this.errorCB);
				 },
	populateAvailableLeaveData:function(){
					$("#hmPLeaves").html(leaveObj.privilege+" Privilege Leaves");
	                $("#hmCLeaves").html(leaveObj.casual+" Casual Leaves");
	                $("#hmSLeaves").html(leaveObj.sick+" Sick Leaves");
	                $("#prLeaves").html(leaveObj.privilege);
	                $("#caLeaves").html(leaveObj.casual);
	                $("#siLeaves").html(leaveObj.sick);
				},
	populateLeaveData: function(){
					$("#pygross").html("$ "+payObj.gross_pay);
	                $("#pyregular").html("$ "+payObj.regular);
	                $("#pytax").html("$ "+payObj.tax);
	                $("#pyother").html("$ "+payObj.other);
	                $("#pygarnish").html("$ "+payObj.garnishment);
	                $("#pytakehome").html("$ "+payObj.take_home);
	                $("#marStatus").val(payObj.marital_status).selectmenu('refresh');
	                $("#exemAmt").val(payObj.exemptions);
	                $("#addWhAmt").val(payObj.addnl_witholdings);
	                $("#stWrkdIn").val(payObj.worked_state).selectmenu('refresh');
	                $("#stLvdIn").val(payObj.lived_state).selectmenu('refresh');
	                $("#suSDI").val(payObj.suisdi).selectmenu('refresh');
	                $("#lvdLocal").val(payObj.lived_loc).selectmenu('refresh');
	                $("#wrkLocal").val(payObj.worked_loc).selectmenu('refresh');
				},
	queryDB: function(tx) {
			    tx.executeSql('SELECT * FROM leave_avl WHERE emp_id='+loggedInUser, [], avlLaveQuerySuccess, leaveQueryFail);
	},
	apldQueryDB: function(tx) {
			    tx.executeSql('SELECT * FROM leave_dtls WHERE emp_id='+loggedInUser, [], apldLaveQuerySuccess, leaveQueryFail);
	},
	updateQueryDB: function(tx) {
				var tmpSqlStmt = 'UPDATE leave_avl SET privilege ='+leaveObj.privilege+',sick='+leaveObj.sick+',casual='+leaveObj.casual+' WHERE emp_id='+loggedInUser;
			    
			    tx.executeSql(tmpSqlStmt, [], avlLeaveUpdateQuerySuccess, leaveQueryFail);
	},
	insertQueryDB: function(tx) {
			    tx.executeSql(ins_LEA,[loggedInUser,newLeaveObj.fromDate,newLeaveObj.toDate,newLeaveObj.leaveType],leaveInsertQuerySuccess,leaveQueryFail);
	},
	updateAvailableLeaves: function(){
					db.transaction(this.updateQueryDB, this.errorCB);
	},
	insertNewLeave: function(){
					db.transaction(this.insertQueryDB, this.errorCB);
	},
	fetchAppliedLeaves: function(){
					db.transaction(this.apldQueryDB, this.errorCB);
	}

}

function populateLogTime(){
	logTimeMethods.fetchTodayLoginTime();
	logTimeMethods.fetchPrevDayLoginTime();	
}

function fetchTodayQuerySuccess(tx, resultSet){
	if(resultSet.rows.length > 0){
		$("#logTime1").html("Today logged in at "+resultSet.rows.item(0).in_time);
	}else{
		var tmpDate2 = new Date();
		var timenw = tmpDate2.toLocaleTimeString();
		$("#logTime1").html("Today logged in at "+timenw);
		logTimeMethods.insertTodayLoginTime();
	}

}
function fetchPredayQuerySuccess(tx, resultSet){
	if(resultSet.rows.length > 0){
        $("#logTime2").html("Yesterday logged out at: "+resultSet.rows.item(0).out_time);
	}else{
		$("#logTime2").html("Yesterday logged out at: --");
	}
}
function fetchLogTimesQuerySuccess(tx, resultSet){
	var resLen = resultSet.rows.length;
	$("#tblTimeCard").children("tbody").children("tr").remove();
	for(var j=0; j< resLen; j++){
		var timeRow = document.createElement("tr");
		var dateTD = document.createElement("td");		
		var inTime = document.createElement("td");		
		var outTime = document.createElement("td");
		$(dateTD).html(resultSet.rows.item(j).date).appendTo(timeRow);
		$(inTime).html(resultSet.rows.item(j).in_time).appendTo(timeRow);
		$(outTime).html(resultSet.rows.item(j).out_time).appendTo(timeRow);
		$("#tblTimeCard").append(timeRow);
	} 
}
function logTimeInsertQuerySuccess(tx, resultSet){
	//console.log("in logTimeInsertQuerySuccess");
}

function logTimeQueryFail(){
	//console.log("logTimeQueryFail");
}
function logTimeQueryFail2(){
}

var logTimeMethods = {
	errorCB : function (tx, err) {
				    //console.info("Error processing SQL: "+err);
			   },
	fetchTodayLoginQry: function(tx) {
				var todaydate = new Date();
        		var todaydateString = (todaydate.getMonth()+1).toString()+"/"+todaydate.getDate()+"/"+todaydate.getFullYear();
				var selectQuery1 = 'SELECT * FROM timecard_dtls WHERE emp_id='+loggedInUser+' and date="'+todaydateString+'"';
			    tx.executeSql(selectQuery1, [], fetchTodayQuerySuccess, logTimeQueryFail);
	},
	fetchPrevdayLoginQry: function(tx) {
				var todaydate2 = new Date();
				todaydate2.setDate(todaydate2.getDate() - 1);
        		var predaydateString = (todaydate2.getMonth()+1).toString()+"/"+todaydate2.getDate()+"/"+todaydate2.getFullYear();
				var selectQuery2 = 'SELECT * FROM timecard_dtls WHERE emp_id='+loggedInUser+' and date="'+predaydateString+'"';
				tx.executeSql(selectQuery2, [], fetchPredayQuerySuccess, logTimeQueryFail2);
	},
	fetchLogTimesQry:function(tx) {
			    tx.executeSql('SELECT * FROM timecard_dtls WHERE emp_id='+loggedInUser, [], fetchLogTimesQuerySuccess, logTimeQueryFail);
	},
	updateQueryDB: function(tx) {
				var tmpDate = new Date();
				var timeNow = tmpDate.toLocaleTimeString();
				var todayString = (tmpDate.getMonth()+1).toString()+"/"+tmpDate.getDate()+"/"+tmpDate.getFullYear();
				var tmpSqlStmt = 'UPDATE timecard_dtls SET out_time ="'+timeNow+'" WHERE emp_id='+loggedInUser+' and date="'+todayString+'"';
			    tx.executeSql(tmpSqlStmt, [], logTimeInsertQuerySuccess, logTimeQueryFail);
	},
	insertQueryDB: function(tx) {
				var tmpDate1 = new Date();
				var timeNow1 = tmpDate1.toLocaleTimeString();
				var todayString1 = (tmpDate1.getMonth()+1).toString()+"/"+tmpDate1.getDate()+"/"+tmpDate1.getFullYear();
			    tx.executeSql(ins_TC,[loggedInUser,todayString1,timeNow1,""],logTimeInsertQuerySuccess,logTimeQueryFail);
	},
	updateTodayLogoutTime: function(){
					db.transaction(this.updateQueryDB, this.errorCB);
	},
	insertTodayLoginTime: function(){
					db.transaction(this.insertQueryDB, this.errorCB);
	},
	fetchTodayLoginTime: function(){
					db.transaction(this.fetchTodayLoginQry, this.errorCB);
	},
	fetchPrevDayLoginTime: function(){
					db.transaction(this.fetchPrevdayLoginQry, this.errorCB);
	},
	fetchTotalLogTimes: function(){
					db.transaction(this.fetchLogTimesQry, this.errorCB);
	},

}
function backButtonCalBack(){
	navigator.app.exitApp();
}