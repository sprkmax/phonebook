//Launch DB
var db = window.openDatabase("Exdata", "1.0", "Exercise database", 100000);

//Model 'class'
var Contact = Backbone.Model.extend({
  		defaults:
  			{
  				idAttribute: 'name',
  				number: '',
  				email: ''
  			}
	});
			
//Model collection (Stores active models)
var Contacts = Backbone.Collection.extend({
	model: Contact,
	initialize: function(){
		this.sort_key = 'id';
	},
	comparator: function(a,b)){
		a = a.get(this.sort_key);
		b = b.get(this.sort_key);
		return a>b ? 1 : a<b ? -1 : 0;
	} 
});

var contacts = {};



