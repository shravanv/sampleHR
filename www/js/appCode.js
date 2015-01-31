function diffbtwnDates( date1, date2 ) {
  var one_day=1000*60*60*24;
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();
  var difference_ms = date2_ms - date1_ms;
  return Math.round(difference_ms/one_day); 
}

function payQuerySuccess(tx, resultSet) {
	console.log("in payQuerySuccess");
	console.dir(resultSet.rows.item(0));
	if(resultSet.rows.length > 0){
		var resObj = resultSet.rows.item(0);
		console.log("before");
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
        
	}else{
		console.log("no results ") 
	}	
}

function payUpdateQuerySuccess(tx, resultSet) {
	console.log("in payUpdateQuerySuccess");
}

function payQueryFail(tx, err) {
	console.log("Pay query Fail");
}


var payMethods = {
	errorCB : function (tx, err) {
				    console.info("Error processing SQL: "+err);
			   },
	fetchDetails: function(){
					db.transaction(this.queryDB, this.errorCB);
				 },
	populateData: function(){
					console.log("in populate");
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
				console.log("in pay queryDB");
			    tx.executeSql('SELECT * FROM pay_dtls WHERE emp_id='+loggedInUser, [], payQuerySuccess, payQueryFail);
	},
	updateQueryDB: function(tx) {
				console.log("in pay updatequeryDB");
				var tmpSqlStmt = 'UPDATE pay_dtls SET marital_status ="'+payObj.marital_status+'",exemptions='+payObj.exemptions+',addnl_witholdings='+payObj.addnl_witholdings+', worked_state="'+payObj.worked_state+'", lived_state="'+payObj.lived_state+'", suisdi="'+payObj.suisdi+'", worked_loc="'+payObj.worked_loc+'", lived_loc="'+payObj.worked_loc+'" WHERE emp_id='+loggedInUser;
			    console.log("update query: "+tmpSqlStmt);
			    tx.executeSql(tmpSqlStmt, [], payUpdateQuerySuccess, payQueryFail);
	},
	updateDetails: function(){
					db.transaction(this.updateQueryDB, this.errorCB);
	}

};

function avlLaveQuerySuccess(tx, resultSet) {
	console.log("in avlLaveQuerySuccess");
	console.dir(resultSet.rows.item(0));
	if(resultSet.rows.length > 0){
		var resObj = resultSet.rows.item(0);
		console.log("before");
		leaveObj={
            privilege:resObj.privilege,
            sick: resObj.sick,
            casual: resObj.casual,
        };
        leaveMethods.populateAvailableLeaveData();
	}else{
		console.log("no results ") 
	}	
}
function apldLaveQuerySuccess(tx, resultSet) {
	console.log("in apldLaveQuerySuccess");
	var resLength = resultSet.rows.length; 
	if(resLength> 0){
		$("#noLeaves").hide();
		for(var i=0;i<resLength;i++){
			 var aDiv = document.createElement("div");
			 var bDiv = document.createElement("div");
			 var cDiv = document.createElement("div");
			 var aSpan = document.createElement("span");
			 var bSpan = document.createElement("span");
			 var cSpan = document.createElement("span");
			 $(aDiv).addClass("ui-block-a");
			 $(bDiv).addClass("ui-block-b");
			 $(cDiv).addClass("ui-block-c");
			 $(aSpan).html(resultSet.rows.item(i).fromdate);
			 $(bSpan).html(resultSet.rows.item(i).todate);
			 $(cSpan).html(resultSet.rows.item(i).leave_type);
			 $(aDiv).css("border","1px solid");
			 $(bDiv).css("border","1px solid");
			 $(cDiv).css("border","1px solid");
			 $(aDiv).append(aSpan);
			 $(bDiv).append(bSpan);
			 $(cDiv).append(cSpan);
			 $("#leaveTable").append(aDiv).append(bDiv).append(cDiv);
		}
        $("#leaveTable").show();
	}else{
		$("#leaveTable").hide();
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
	console.log("Pay query Fail");
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
					console.log("in populate");
					$("#hmPLeaves").html(leaveObj.privilege+" Privilege Leaves");
	                $("#hmCLeaves").html(leaveObj.casual+" Casual Leaves");
	                $("#hmSLeaves").html(leaveObj.sick+" Sick Leaves");
	                $("#prLeaves").html(leaveObj.privilege);
	                $("#caLeaves").html(leaveObj.casual);
	                $("#siLeaves").html(leaveObj.sick);
				},
	populateLeaveData: function(){
					console.log("in populate populateLeaveData");
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
				console.log("in leave queryDB");
			    tx.executeSql('SELECT * FROM leave_avl WHERE emp_id='+loggedInUser, [], avlLaveQuerySuccess, leaveQueryFail);
	},
	apldQueryDB: function(tx) {
				console.log("in leave queryDB");
			    tx.executeSql('SELECT * FROM leave_dtls WHERE emp_id='+loggedInUser, [], apldLaveQuerySuccess, leaveQueryFail);
	},
	updateQueryDB: function(tx) {
				console.log("in leave updatequeryDB");
				var tmpSqlStmt = 'UPDATE leave_avl SET privilege ='+leaveObj.privilege+',sick='+leaveObj.sick+',casual='+leaveObj.casual+' WHERE emp_id='+loggedInUser;
			    console.log("update query: "+tmpSqlStmt);
			    tx.executeSql(tmpSqlStmt, [], avlLeaveUpdateQuerySuccess, leaveQueryFail);
	},
	insertQueryDB: function(tx) {
				console.log("in leave insertQueryDB");
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