$(document).ready(function() {
    
  // Clicking the + Add link button on the side of the "Add images 1-by-1" input field adds the link to the 'Currently added images' list (currentImages) on the right. 
  $('#addLinkButton').on('click', function(e) {
    var newURL = $('#singleImageURL').val();

    $('#currentImages').append(new Option(newURL, newURL, true, true));

  });
    
    // Pressing the enter/return key after typing in the input field singleImageURL essentially does the same thing as clicking the + Add link button
    $('#singleImageURL').keypress(function(e){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        
        if(keycode == '13'){ // keycode 13 is the enter key
            var newURL = $('#singleImageURL').val();

            $('#currentImages').append(new Option(newURL, newURL, true, true));
        }
    });
    
  // Clicking the remove button in the Manage images section removes the select(ed) options
  $('#removeButton').click(function(e) {
    $("#currentImages option:selected").remove();
  });

    // Clicking the move up button (moveUpButton) moves the select(ed) option(s) upwards.

    $('#moveUpButton').click(function() {
      var opt = $('#currentImages option:selected');

      if(opt.is(':first-child')) {
        opt.insertAfter($('#currentImages option:last-child'));
      }
      else {
        opt.insertBefore(opt.prev());
      }
    });
    
    // Clicking the move down button (moveDownButton) moves the select(ed) option(s) downwards.

    $('#moveDownButton').click(function() {
      var opt = $('#currentImages option:selected');

      if(opt.is(':last-child')) {
        opt.insertBefore($('#currentImages option:first-child'));
      }
      else {
        opt.insertAfter(opt.next());
      }
    });
    
    
    $('addImgurButton').click(function() {
       requestAlbumImages(); 
    });

});


// Authorization: Client-ID YOUR_CLIENT_ID
// Client ID: 730dd7ce7561488
// Client secret: c62ba636cd9eeb98752306ea3e5fb97a6f1c76e6
// https://imgur.com/a/7AFUu as the testing album

function requestAlbumImages() {
    
  var album_id = '7AFUu';
    var image_id = 'XssLLRh';
    var request_url = 'https://api.imgur.com/3/image/' + image_id;
  //var request_url = 'https://api.imgur.com/3/album/' + album_id + '/images';
  var clientID = "730dd7ce7561488";   
    
  var request = new XMLHttpRequest();
  
  request.onreadystatechange = function() { 
     if (request.readyState == 4 && request.status == 200) {
       processRequest(request.responseText);
     } else {
       alert("Error with Imgur Request.");
     }
  }
  request.open("GET", request_url, true); // true for asynchronous     
  request.setRequestHeader('Authorization', 'Client-ID ' + clientID);
  request.send(null);
}

function processRequest(response_text) {
  if (response_text == "Not found") {
    alert("Imgur album not found.");
  } else {
    var json = JSON.parse(response_text);
      
    // You got your response back!
    // Do your thing here.
      
      alert(json.id);
  }
}

requestAlbumImages();
