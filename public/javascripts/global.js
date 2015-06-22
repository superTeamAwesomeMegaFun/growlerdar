var GD = {};

GD.locationListData = [];

$(document).ready(function() {
  $(document).foundation();
  populateTable();
  populateRecentMenuList();

  $('#btnAddLocation').on('click', addLocation);
  $('#locationList table tbody').on('click', 'a.linkdeletelocation', deleteLocation);
});

function populateTable() {
  var tableContent = '';

  $.getJSON('/api/locations', function(data) {
    GD.locationListData = data;

    for (var i = 0, len = GD.locationListData.length; i < len; i++) {
      tableContent += '<tr>';
      tableContent += '<td>' + GD.locationListData[i].locationName + '</td>';
      tableContent += '<td>' + GD.locationListData[i].streetAddress + '</td>';
      tableContent += '<td>' + GD.locationListData[i].city + '</td>';
      tableContent += '<td>' + GD.locationListData[i].state + '</td>';
      tableContent += '<td>' + GD.locationListData[i].postal + '</td>';
      tableContent += '<td>' + GD.locationListData[i].website + '</td>';
      tableContent += '<td>' + GD.locationListData[i].phone + '</td>';
      tableContent += '<td>Edit / <a href="#" class="linkdeletelocation" rel="' + GD.locationListData[i]._id + '">Delete</a></td>';
      tableContent += '</tr>';
    }

    $('#locationList table tbody').html(tableContent);
  });
};

function populateRecentMenuList() {
  var menuContent = '';

  $.getJSON('/api/locations', function(data) {
    GD.locationListData = data;

    for (var i = 0, len = GD.locationListData.length; i < len; i++) {
      menuContent += '<li><a href="/locations/location/' + GD.locationListData[i]._id + '">' + GD.locationListData[i].locationname + '</a></li>';
    }

    $('#menuRecentList').html(menuContent);
  });
};

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

      populateTable();
      populateRecentMenuList();

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
      populateTable();
      populateRecentMenuList();
    });
  } else {
    return false;
  }

  event.preventDefault();
};