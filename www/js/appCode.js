
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

}