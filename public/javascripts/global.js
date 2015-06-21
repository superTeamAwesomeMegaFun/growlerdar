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
      tableContent += '<td>' + GD.locationListData[i].locationname + '</td>';
      tableContent += '<td>' + GD.locationListData[i].fullname + '</td>';
      tableContent += '<td>' + GD.locationListData[i].birthdate + '</td>';
      tableContent += '<td>' + GD.locationListData[i].gender + '</td>';
      tableContent += '<td>' + GD.locationListData[i].location + '</td>';
      tableContent += '<td>' + GD.locationListData[i].location + '</td>';
      tableContent += '<td>' + GD.locationListData[i].location + '</td>';
      tableContent += '<td>' + GD.locationListData[i].location + '</td>';
      tableContent += '<td>' + GD.locationListData[i].location + '</td>';
      tableContent += '<td>' + GD.locationListData[i].location + '</td>';
      tableContent += '<td>' + GD.locationListData[i].location + '</td>';
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
      'locationname': $('#addLocation fieldset input#inputLocationName').val(),
      'email': $('#addLocation fieldset input#inputLocationEmail').val(),
      'fullname': $('#addLocation fieldset input#inputLocationFullname').val(),
      'birthdate': $('#addLocation fieldset input#inputLocationBirthdate').val(),
      'location': $('#addLocation fieldset input#inputLocationLocation').val(),
      'gender': $('#addLocation fieldset input#inputLocationGender').val(),
      'lastupdated' : currentdate.toISOString()
    }

    $.ajax({
      type: 'POST',
      data: newLocation,
      url: '/locations/addlocation',
      dataType: 'JSON'
    }).done(function(response) {
      if (response.msg === '') {
          $('#addLocation fieldset input').val('');

          populateTable();
          populateRecentMenuList();
          $('#addLocation').foundation('reveal', 'close');
      } else {
        alert('Error: ' + response.msg);
      }
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
      url: '/locations/deletelocation/' + $(this).attr('rel')
    }).done(function(response) {
      if (response.msg === '') {

      } else {
        alert('Error: ' + response.msg);
      }
          
      populateTable();
      populateRecentMenuList();
    });
  } else {
    return false;
  }

  event.preventDefault();
};