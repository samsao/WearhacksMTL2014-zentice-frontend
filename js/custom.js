 $('#selectExercice').hide();
    Parse.initialize("UL1HrX8pATNbmoEfREItjPf9ZVWT5hsc0cSw0Y1T", "UJzUOQasqq6yA2U5ekDEf2xb1r5tyPtikgff3HU6");

    var s = $('<select id="user" name="user" />');
    var l = $('<ul/>');

    var Users = Parse.Object.extend("User");
    var query = new Parse.Query(Users);
    var CreateDate = Parse.Object.extend("ExerciceDate");
    var createDate = new CreateDate();
    var queryDate = new Parse.Query(CreateDate);
    var Exercice = Parse.Object.extend("Exercice");
    var newExercice = new Exercice();
    
    query.find({
    success:function(results) {
            console.log("Total: "+results.length);

            $.each(results,function(i,item){
              console.log(item);
            $('<option />', {value: item.id, text: item.attributes.name}).appendTo(s);
            $('<li />', {value: item.id, text: item.attributes.name+' (last login: '+item.updatedAt+')'}).appendTo(l);
            });
        }, error:function(error) {
        alert("Error when getting objects!");
        }
    });

    s.appendTo('#people');
    l.appendTo('#peoplelist');


    queryDate.find({
    success:function(results) {
            console.log("Total: "+results.length);

            $.each(results,function(i,item){
              // console.log(item);
            // $('<option />', {value: item.id, text: item.attributes.name}).appendTo(s);
            });
        }, error:function(error) {
        alert("Error when getting objects!");
        }
    });

    var from_$input = $('#input_from').pickadate(),
    from_picker = from_$input.pickadate('picker')
  
 
 

   


// Check if there’s a “from” or “to” date to start with.
if ( from_picker.get('value') ) {
  to_picker.set('min', from_picker.get('select').obj)
}


// When something is selected, update the “from” and “to” limits.
from_picker.on('set', function(event) {
  if ( event.select ) {
   
   from_$input.val(from_picker.get('select').obj);
   console.log($('select#user').val());
  
  createDate.set("date", from_picker.get('select').obj);
  var user = new Parse.User();     
  user.id = $('select#user').val();
  console.log(user.id);
  createDate.set("user",  user);

 
createDate.save(null, {
  success: function(createDate) {
    console.log(createDate);
    // alert('New object created with objectId: ' + createDate.id);

    $('#createDate').hide();
    $('#selectExercice').show();
    $('#dateId').val(createDate);

  },
  error: function(createDate, error) {
    
    alert('Failed to create new object, with error code: ' + error.message);
  }
}); 

  }
  else if ( 'clear' in event ) {
    to_picker.set('min', false)
  }
})
 
$('#selectExercice').on('submit',function(e){
    e.preventDefault();
    newExercice.set("exerciceDate", createDate);
    newExercice.set("name", $('select#exercice').text());
    newExercice.set("exerciceDataID", $('select#exercice').val());
    newExercice.save();
    console.log(newExercice);
});

$('#patients').on('click',function(e){
    $('.program').slideUp();
    $('.patients').slideDown();
});

$('#program').on('click',function(e){
    $('.program').slideDown();
    $('.patients').slideUp();
});