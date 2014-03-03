$('#view').on('pageinit', function() {
	var data = ''
	
	function setContactData(c_name) {
		var c_number = contacts.get(c_name).get('number');
		var c_email = contacts.get(c_name).get('email');
		var c_tel = 'tel:'+c_number;
		var c_mailto = 'mailto:'+c_mail;
		data = {contact: 
			{name: c_name, number: c_number, 
				email: c_email, tel: tel, mailto: c_mailto}};
	}
	
	var ContactView = Backbone.View.extend({
		initialize: function(){
			this.model.bind('change', this.render, this);
		},
		render: function(){
			var template = Handlebars.compile($('#view-template').html();
			this.el.html(template(data));
			return this;
		});
	}
		
	var contactView = new ContactView({model: models.get(c_name)});
	
	function deleteContact(c_name){
		contacts.remove(contacts.get(c_name));
		
		db.transaction(removeContact, errorCB, successCB);
		
		function removeContact(db) {
			stmt = 'DELETE FROM Contacts WHERE name=?';
			db.executeSql(stmt,c_name);
		}

		function errorCB(err) {
			alert("Error processing SQL: "+err);
		}

		function successCB() {
			alert('contact modified successfuly');
		}
});



