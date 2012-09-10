/**
 * 
 */
function makeConnection()
{
	var ajax = new XMLHttpRequest();
	ajax.open("GET","http://114.143.187.99/mobile/inspections.nsf/test4.xsp",false);		
	ajax.setRequestHeader("Authorization", "Basic " + base64_encode("admin:password")); 
	ajax.send(null);
	return ajax;
	}

function getJson() {
	var conn=makeConnection();
	var obj = eval ('([' + conn.responseText.replace(/\n/g, ',') + '])');
	return obj;

}

function setTable(tableId) {
	var jsonObj=getJson();
	var table = "<tr><th>UniqueId</th><th>Modified</th><th>Values</th></tr>";
	
	for(var i=0;i<jsonObj.length;i++)
	{
		table=table + '<tr><td>'+jsonObj[i].uniqueKey+'</td><td>'+jsonObj[i].modified+'</td><td>'+jsonObj[i].values+'</td></tr>';
		
	}
	document.getElementById(tableId).innerHTML=table;
	
}

function base64_encode (data) {
	// alert("I am called");
	// Encodes string using MIME base64 algorithm  
	// 
	// version: 1109.2015
	// discuss at: http://phpjs.org/functions/base64_encode
	// +   original by: Tyler Akins (http://rumkin.com)
	// +   improved by: Bayron Guevara
	// +   improved by: Thunder.m
	// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// +   bugfixed by: Pellentesque Malesuada
	// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// +   improved by: Rafał Kukawski (http://kukawski.pl)
	// -    depends on: utf8_encode
	// *     example 1: base64_encode('Kevin van Zonneveld');
	// *     returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
	// mozilla has this native
	// - but breaks in 2.0.0.12!
	//if (typeof this.window['atob'] == 'function') {
	//    return atob(data);
	//}
	var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
	ac = 0,
	enc = "",
	tmp_arr = [];

	if (!data) {
		return data;
	}

	data = this.utf8_encode(data + '');

	do { // pack three octets into four hexets
		o1 = data.charCodeAt(i++);
		o2 = data.charCodeAt(i++);
		o3 = data.charCodeAt(i++);

		bits = o1 << 16 | o2 << 8 | o3;

		h1 = bits >> 18 & 0x3f;
		h2 = bits >> 12 & 0x3f;
		h3 = bits >> 6 & 0x3f;
		h4 = bits & 0x3f;

		// use hexets to index into b64, and append result to encoded string
		tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
	} while (i < data.length);

	enc = tmp_arr.join('');

	var r = data.length % 3;

	return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
}
function utf8_encode (argString) {
	// Encodes an ISO-8859-1 string to UTF-8  
	// 
	// version: 1109.2015
	// discuss at: http://phpjs.org/functions/utf8_encode
	// +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
	// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// +   improved by: sowberry
	// +    tweaked by: Jack
	// +   bugfixed by: Onno Marsman
	// +   improved by: Yves Sucaet
	// +   bugfixed by: Onno Marsman
	// +   bugfixed by: Ulrich
	// +   bugfixed by: Rafal Kukawski
	// *     example 1: utf8_encode('Kevin van Zonneveld');
	// *     returns 1: 'Kevin van Zonneveld'
	if (argString === null || typeof argString === "undefined") {
		return "";
	}

	var string = (argString + ''); // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
	var utftext = "",
	start, end, stringl = 0;

	start = end = 0;
	stringl = string.length;
	for (var n = 0; n < stringl; n++) {
		var c1 = string.charCodeAt(n);
		var enc = null;

		if (c1 < 128) {
			end++;
		} else if (c1 > 127 && c1 < 2048) {
			enc = String.fromCharCode((c1 >> 6) | 192) + String.fromCharCode((c1 & 63) | 128);
		} else {
			enc = String.fromCharCode((c1 >> 12) | 224) + String.fromCharCode(((c1 >> 6) & 63) | 128) + String.fromCharCode((c1 & 63) | 128);
		}
		if (enc !== null) {
			if (end > start) {
				utftext += string.slice(start, end);
			}
			utftext += enc;
			start = end = n + 1;
		}
	}

	if (end > start) {
		utftext += string.slice(start, stringl);
	}

	return utftext;
}

function clickUl(idxs)
{
	var ids=idxs;
	getSqlResultSet1();
	
	function queryDB1(tx){
		tx.executeSql('SELECT * FROM DEMO WHERE id= ?', [ids], querySuccess1, errorCB1);
	}
	function querySuccess1(tx, results) {

		   $('#unid').val(results.rows.item(0).id);
		   $('#unid').textinput('disable');
		  // alert(results.rows.item(0).id);
		   $('#modified').val(results.rows.item(0).modified);
		   $('#modified').textinput('disable');
		  // alert(results.rows.item(0).modified);
		   $('#values').val(results.rows.item(0).vlues);
		   $('#values').textinput('disable');
		   //alert(results.rows.item(0).vlues);
		}
	function errorCB1(err) {
		   console.log("Error processing SQL: " + err.code);
		   $('#sql-result').html("<strong>Error processing SQL: " + err.code + "</strong>");
		}
	var db=0;
	function getSqlResultSet1() {		
	    if (!db) {
	        db = window.openDatabase("MyOshDb", "1.0", "PhoneGap Demo", 200000);
	    }
	    db.transaction(queryDB1, errorCB1);    
	}
	//document.location.href="#two";
	$.mobile.changePage( "#two", { transition: "flip"} );
	}


function editField(){
	//alert("Hi");
	$('#unid').textinput('enable');
	$('#modified').textinput('enable');
	$('#values').textinput('enable');
	
}
function saveSql(){
	//tx.executeSql("UPDATE DEMO SET data = " + submitval + " WHERE id = " + 8, [], updateCB, errorCB);
	
	//var ids=idxs;
	getSqlResultSet1();
	
	function queryDB1(tx){
		//tx.executeSql('SELECT * FROM DEMO WHERE id= ?', [ids], querySuccess1, errorCB1);
		alert($('#modified').val());
		tx.executeSql('UPDATE DEMO SET modified =?, vlues = ? WHERE id=?' ,[$('#modified').val(),$('#values').val(),$('#unid').val()], querySuccess1, errorCB1);
	}
	function querySuccess1(tx, results) {

		  // $('#unid').val(results.rows.item(0).id);
		   $('#unid').textinput('disable');
		  // alert(results.rows.item(0).id);
		  // $('#modified').val(results.rows.item(0).modified);
		   $('#modified').textinput('disable');
		  // alert(results.rows.item(0).modified);
		  // $('#values').val(results.rows.item(0).vlues);
		   $('#values').textinput('disable');
		   //alert(results.rows.item(0).vlues);
		}
	function errorCB1(err) {
		   console.log("Error processing SQL: " + err.code);
		   $('#sql-result').html("<strong>Error processing SQL: " + err.code + "</strong>");
		}
	var db=0;
	function getSqlResultSet1() {		
	    if (!db) {
	        db = window.openDatabase("MyOshDb", "1.0", "PhoneGap Demo", 200000);
	    }
	    db.transaction(queryDB1, errorCB1);    
	}
//	document.location.href="#two";
}