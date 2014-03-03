$('#main').on('pageinit', function() {
	
	if contacts == {}
		initContacts();
	
	{
		l_contacts: contacts.toJSON();
	}
	
	Handlebars.registerHelper('list', function(items, options) {
		var out = '<ul data-role="listview" data-filter="true" data-filter-placeholder="Search contacts..." data-inset="true">';

		for(var i=0, l=items.length; i<l; i++) {
			out = out + "<li>" + options.fn(items[i]) + "</li>";
		}

		return out + "</ul>";
	});
	
	function initContacts(){
		db.transaction(selectAll, errorCB, SuccessCB);
		
		function selectAll(db) {
			stmt = 'SELECT * FROM Contacts ORDER BY name ASC';
			db.executeSql(stmt);
		}
		
		function errorCB(err) {
			alert("Error processing SQL: "+err);
		}

		function successCB() {
			for (var i=0; i < result.rows.length; i++)
				contacts.add({name: rows.item(i).name, number: rows.item(i).number, email: rows.item(i).email});
		}
		
	}
