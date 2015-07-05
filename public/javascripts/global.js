var GD = {};

GD.locationListData = [];

$(document).ready(function() {
  $(document).foundation();

  $('#btnAddLocation').on('click', addLocation);
  $('#locationTable table tbody').on('click', 'a.linkdeletelocation', deleteLocation);
});

function addLocation(event) {
  var errorCount = 0;
  $('#addLocation input').each(function(index, val) {
      if($(this).val() === '') { errorCount++; }
  });

  if(errorCount === 0) {
    var currentdate = new Date();
    var newLocation = {
      'locationName': $('#addLocation fieldset input#inputLocationName').val(),
      'streetAddress': $('#addLocation fieldset input#inputLocationStreetAddress').val(),
      'city': $('#addLocation fieldset input#inputLocationCity').val(),
      'state': $('#addLocation fieldset input#inputLocationState').val(),
      'postal': $('#addLocation fieldset input#inputLocationPostal').val(),
      'website': $('#addLocation fieldset input#inputLocationUrl').val(),
      'phone': $('#addLocation fieldset input#inputLocationPhone').val(),
      'lastupdated' : currentdate.toISOString()
    }

    $.ajax({
      type: 'POST',
      data: newLocation,
      url: '/api/locations',
      dataType: 'JSON'
    }).done(function(response) {
      $('#addLocation fieldset input').val('');
      $('#addLocation').foundation('reveal', 'close');
    });
  } else {
    alert('Please fill in all fields');

    return false;
  }

  event.preventDefault();
};

function deleteLocation(event) {
  var confirmation = confirm('Are you sure you want to delete this location?');

  if (confirmation === true) {
    $.ajax({
      type: 'DELETE',
      url: '/api/locations/' + $(this).attr('rel')
    }).done(function(response) {
    });
  } else {
    return false;
  }

  event.preventDefault();
};