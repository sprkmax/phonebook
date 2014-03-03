$('#add').on('pageinit', function() {
	
	var c_number = $('#number').val();
	var c_name = $('#name').val();
	var c_email = $('#email').val();
	
	function chooseAction(curr_name){
		if(curr_name =='')
			addFunc();
		else
			modFunc(curr_name);
	}
	
	function addFunc(){		
		addtxt = {m_temp: 
			{b_txt: 'Add new contact'}};
		var template = Handlebars.compile($('#view-template').html();
		$("#m_temp").html(template(addtxt));
		
		db.transaction(addContact, errorCB, successCB);
		
		function addContact(db) {
			stmt = 'INSERT INTO Contacts (number, name, email) VALUES (?,?,?)';
			db.executeSql(stmt,c_number,c_name,c_email);
		}

		function errorCB(err) {
			alert("Error processing SQL: "+err);
		}

		function successCB() {
			alert('contact added successfuly');
		}
	
		contacts.add({name:c_name, number:c_number, email:c_email});
	}
	
	function modFunc(curr_name){
		updatetxt ={m_temp: 
			{b_txt: 'Modify existing contact'}};
		var template = Handlebars.compile($('#view-template').html();
		$("#m_temp").html(template(addtxt));
		
		db.transaction(addContact, errorCB, successCB);
		
		function addContact(db) {
			stmt = 'UPDAE Contacts SET number=?, name=?, email=? WHERE name=?';
			db.executeSql(stmt,c_number,c_name,c_email,curr_name);
		}

		// Transaction error callback
		//
		function errorCB(err) {
			alert("Error processing SQL: "+err);
		}

		// Transaction success callback
		//
		function successCB() {
			alert('contact modified successfuly');
		}
		contact = contacts.get(curr_name);
		contact.set({name: c_name, number: c_number, email: c_email});
		contacts.set(contact);
	}
});

