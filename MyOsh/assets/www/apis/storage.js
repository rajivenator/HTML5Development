
function populateDB(tx) {
	var jsonObj=getJson();
    tx.executeSql('DROP TABLE IF EXISTS DEMO');
    tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, modified , vlues)');
    var id='';
    var modified='';
    var vlues='';
   
   // alert(jsonObj.length);
    for(var i=0;i<jsonObj.length;i++)
    	{  
    		if(jsonObj[i].uniqueKey==undefined)
    			{
    				id='';
    			}
    		else
    			id=jsonObj[i].uniqueKey.toString();
    		
    		if(jsonObj[i].modified==undefined)
			{
    			modified='';
			}
    		else 
    			modified=jsonObj[i].modified.toString();
    		
    		if(jsonObj[i].values==undefined)
			{
    			vlues='';
			}
    		else
    			{
    				//console.log(jsonObj[i].values);
    				vlues=jsonObj[i].values.join(",");
    			}
    			
    		
    		tx.executeSql('INSERT INTO DEMO (id, modified ,vlues) VALUES (?,?,?)',[id,modified,vlues]);
    	
    	}
 //   alert(ul);
   
   
    
}
function errorCB(err) {
   console.log("Error processing SQL: " + err.code);
   $('#sql-result').html("<strong>Error processing SQL: " + err.code + "</strong>");
}
function successCreateCB() {
   console.log("Success creating Database 1.0");
   $('#sql-result').html("<strong>Success creating Database 1.0</strong>");
}
var db = 0;
function createDB(){
    if (!db) {
        db = window.openDatabase("MyOshDb", "1.0", "PhoneGap Demo", 200000);

    }
    db.transaction(populateDB, errorCB, successCreateCB);
}

// api-storage  "Get SQL Result Set"
function querySuccess(tx, results) {
	 var ul='';
    // this will be empty since no rows were inserted.
    //console.log("Insert ID = " + results.insertId);
    // this will be 0 since it is a select statement
    console.log("Rows Affected = " + results.rowAffected);
    // the number of rows returned by the select statement
    console.log("Num. Rows Returned = " + results.rows.length);
	//ul=ul+'<li><a  href="javascript:clickUl("'+id+'")">'+id+'</a></li>';
    for(var i=0;i<results.rows.length;i++)
    	{
    		//ul=ul+'<li><a  href="javascript:clickUl(\''+results.rows.item(i).id+'\')" data-role="button" data-transition="flow" data-inline="true" >'+results.rows.item(i).id+'</a></li>';
    	ul=ul+'<li><a  href="javascript:clickUl(\''+results.rows.item(i).id+'\')">'+results.rows.item(i).id+'</a></li>';
    	}
	
	// document.getElementById("dataList").innerHTML=ul;
    $('#dataList').html(ul);
    $("#dataList").listview("refresh");
  //  $('#sql-result').html("<strong>Num. Rows Returned = " + results.rows.length + "</strong>");
}




function queryDB(tx) {
    tx.executeSql('SELECT id FROM DEMO', [], querySuccess, errorCB);
}


function getSqlResultSet() {
    if (!db) {
        db = window.openDatabase("MyOshDb", "1.0", "PhoneGap Demo", 200000);
    }
    db.transaction(queryDB, errorCB);    
}

// api-storage   Local Storage
function writeLocalStorage() {
    window.localStorage.setItem("myKey", "myValue");
    var keyname = window.localStorage.key(0); // 0 because first and only setItem!
    $('#local-storage-result').html("Wrote key: <strong>" + keyname + "</strong>");
}
function readLocalStorage() {
    var value = window.localStorage.getItem("myKey");
    if (!value) {
        $('#local-storage-result').html("<strong>Null</strong> - Try Write first");        
    } else {
        $('#local-storage-result').html("Got value: <strong>" + value + "</strong>");
    }
}
function removeItemLocalStorage() {
    window.localStorage.removeItem("myKey");
    $('#local-storage-result').html("Removed key/value: <strong>myKey/myValue</strong>");    
}
