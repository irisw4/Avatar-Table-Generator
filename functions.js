$(document).ready(function() {

  imageCountUpdate();

  // Upon clicking one of the table alignment buttons, update the HTML preview and change the code.
  $('#tableAlignmentButtons').click(function(e) {
    updateTable();
  });

  // Clicking the + Add link button on the side of the "Add images 1-by-1" input field adds the link to the 'Currently added images' list (currentImages) on the right. 
  $('#addLinkButton').on('click', function(e) {
    var link = $('#singleImageURL').val();
    addSingleLink(link);
    $('#singleImageURL').val(''); // Resets the input field.
  });

  // Clicking the + Add multiple links button (addMultiLinksButtons) on the side of the "Add multiple images" input field adds the links to the 'Currently added images' list (currentImages) on the right. 
  $('#addMultiLinksButton').on('click', function(e) {
    addMultiLinks();
    $('#multipleImageURLs').val(''); // Resets the input field.
  });

  // Pressing the enter/return key after typing in the input field singleImageURL essentially does the same thing as clicking the + Add link button
  $('#singleImageURL').keypress(function(e) {
    var link = $('#singleImageURL').val();

    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') { // keycode 13 is the enter key
      addSingleLink(link);
      $('#singleImageURL').val(''); // Resets the input field.
    }
  });

  // Clicking the remove button in the Manage images section removes the select(ed) options
  $('#removeButton').click(function(e) {
    $("#currentImages option:selected").remove();
    imageCountUpdate();
  });

  // Clicking the move up button (moveUpButton) moves the select(ed) option(s) upwards.
  $('#moveUpButton').click(function() {

    $('#currentImages option:selected:first-child').prop("selected", false);
    var before = $('#currentImages option:selected:first').prev();
    $('#currentImages option:selected').detach().insertBefore(before);
  });

  // Clicking the move down button (moveDownButton) moves the select(ed) option(s) downwards.
  $('#moveDownButton').click(function() {

    $('#currentImages option:selected:last-child').prop("selected", false);
    var after = $('#currentImages option:selected:last').next();
    $('#currentImages option:selected').detach().insertAfter(after);
  });

  // Clicking the + Add album button (addImgurButton) adds all the images in the album linked by the URL input (imgurAlbumURL) to currentImages.
  $('#addImgurButton').click(function() {
    var link = $('#imgurAlbumURL').val();
    if (link.includes("imgur.com/a/")) { // If the input field does not start with 'https://imgur.com/a/', then it's not an Imgur album...probably.
      requestAlbumImages(link);
      imageCountUpdate();

      $('#imgurAlbumURL').val(''); // Resets the input field. Might take out later? Ask for feedback.

    } else { // Else, it doesn't have "imgur.com/a/" in the URL and thus is probably not an album.
      alert("Not a valid Imgur album! ...Probably.");
    }
  });

  // Pressing the enter/return key after typing in the input field imgurAlbumURL essentially does the same thing as clicking the + Add album button
  $('#imgurAlbumURL').keypress(function(e) {
    var link = $('#imgurAlbumURL').val();

    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') { // keycode 13 is the enter key

      if (link.includes("imgur.com/a/")) { // If the input field starts with 'https://imgur.com/a/', then it's an Imgur album...probably.
        requestAlbumImages(link);
        imageCountUpdate();

        $('#imgurAlbumURL').val(''); // Resets the input field. Might take out later? Ask for feedback.

      } else { // Else, it doesn't have "imgur.com/a/" in the URL and thus is probably not an album.
        alert("Not a valid Imgur album! ...Probably.");
      }
    }
  });

});

// Requests all images from an Imgur album by grabbing the link from the input field and then sending a XMLHttpRequest
// to the API's endpoint, using processRequest().
// Authorization: Client-ID YOUR_CLIENT_ID
function requestAlbumImages(albumURL) {
  var albumID = albumURL.substring(20); // Chops off the first 20 characters aka the 'https://imgur.com/a/' part.   
  var requestURL = "https://api.imgur.com/3/album/" + albumID + "/images";
  var clientID = "730dd7ce7561488";
  var request = new XMLHttpRequest();

  // If it successfully connected, the request is processed.
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      processRequest(request.responseText);
    } else { // Else, print an error to the console.
      console.log("Error with Imgur Request. Status = " + request.status + " Ready state = " + request.readyState);
    }
  }

  // Send request for authorization, attach client ID.
  request.open("GET", requestURL, true); // true for asynchronous     
  request.setRequestHeader('Authorization', 'Client-ID ' + clientID);
  request.send();
}

// Processes the XMLHttpRequest from requestAlbumImages() above, which receives a JSON response in return.
function processRequest(response_text) {
  if (response_text == "Not found") {
    alert("Imgur album not found.");
  } else {
    var parsedJSON = JSON.parse(response_text).data;

    // For each item in the 'data' array in the JSON response, grab the 'link' and add it as an option in the currentImages list.
    for (var i in parsedJSON) {
      var directLink = parsedJSON[i].link;
      addSingleLink(directLink); // Adds the link to currentImages
    }
  }
}

// Adds multiple links from the multipleImageURLs input field to currentImages. Split up by semicolons (;) for the time being.
function addMultiLinks() {
  var input = $('#multipleImageURLs').val();
  var splitInput = input.split(";");

  for (var i in splitInput) { // For every item in the splitInput array, add the link to currentImages.
    var link = splitInput[i];
    addSingleLink(link);
    imageCountUpdate();
  }
}

// Adds 1 link (passed on from another function) to currentImages
function addSingleLink(link) {
  $('#currentImages').append(new Option(link, link, false, true));
  imageCountUpdate();
}

// Debugging function
function sayHello() {
  alert("hello!");
  //alert($( '#currentImages' ).children('option').length); THIS GETS HOW MANY OPTIONS THERE ARE IN THE LIST
}

// Updates the imageCount whenever it's called. It updates by basically checking the amount of things/options in currentImages and then setting count to that.
function imageCountUpdate() {
  var count = $('#currentImages').children('option').length;
  document.getElementById("imageCounter").innerHTML = count;
}

function updateTable() {
  var numSize = $('#numberSizeField').val();
  var numColor = $('#numberColorField').val();

  //var numStart = $( '#startNumberField' ).val();
  var numStart = 1;

  var numPosition = "above";
  var tableColor = $('#tableBGColorField').val();

  // Which nth icon in the list the link is, starts from 0 (first icon). This is for users making multiple tables, who choose different starting numbers.
  // E.g. Table 1 is 1-15, table 2 is 16 - 20, table 3 is 21 - 30. 
  var nthIcon = 0;

  var numIcons = $('#currentImages').children('option').length;

  var output = "";

  // Calculates how many rows are needed for the table.
  var numColumns = $('#imagesPerRow').val();
  var numRows = Math.ceil(numIcons / numColumns);
  //alert("numrows = " + numRows + " and numcols = " + numColumns);

  var link = "";

  // For every row needed in the table, creates a row.
  // Includes handling the numbering row (whether it's above (before) or below (after)).
  for (var i = 0; i < numRows; i++) {

    var iconsInRow = numColumns;

    // If the numbers are supposed to be above the row, create a row of numbers at this point, before the icon cells have been made.
    var numOutput = "\n<tr>"; // Starts the row.

    for (var j = 0; j < iconsInRow; j++) {
		if ( i* numColumns + j < numIcons) {
            numOutput += createNumberCell( numSize, numColor, numStart );
      }
		
      numStart++; // Increment the numbering
    }
    numOutput += "\n</tr>"; // Ends the row.

    // If the numbers are not above, create the icon cell(s) like normal.
    output += "\n<tr>"; // Starts the row.

    if (numPosition == "above") {
		output += numOutput;
	}
	
	// For each icon in the row, creates an icon cell.
    for (j = 0; j < iconsInRow; j++) {
      // The image URL is the nth (nthIcon) icon in the list of image links in currentImages.
      link = $('#currentImages option').eq(nthIcon).text();
		
      var itemOutput = "";
      if (nthIcon < numIcons) {
        itemOutput = createIconCell(link);
      }
      output += itemOutput;
      nthIcon++; // Increment the icon numbering
    }

    output += "\n</tr>"; // Ends the row.
	
	// If the numbers are under, append the row of numbers to "output" at this point, after the icon cells have been made.
    if (numPosition == "below") {
		output += numOutput;
	}
  }

  // Take care of the straggling, last incomplete row.
  // If it is an incomplete row, stop the numbering and cell-making at that point.

  // This is the end output. The two fields below are basically the same thing, just that one is the raw code and the other is the HTML code put into action.	

  // If tableColor exists and is not undefined, insert this piece of code into the table start code.
  if (tableColor) {
    tableColor = " style=\"background-color: " + tableColor + "\"";
  }

  var tableStart = "<table" + tableColor + ">"; // Table start code.
  var tableEnd = "\n</table>"; // Table end code.

  var fullOutput = tableStart + output + tableEnd; // Puts everything together.

  document.getElementById("previewOutput").innerHTML = fullOutput; // This is what's outputted in the live preview section.
  document.getElementById("outputTextarea").value = fullOutput; // This is the code that's going to be copy and pasted from the textarea.
}


// Creates a cell for the numbering. This is called every time you need to make a numbered cell.
function createNumberCell(numSize, numColor, number) {

  var prefix = $('#optionalPrefix').val();

  // Inserts or changes the size tags for the numbering.
  var sizeStart = "";
  var sizeEnd = "";

  switch (numSize) {
    case "small":
      sizeStart = "<small>";
      sizeEnd = "</small>";
      break;
    case "big":
      sizeStart = "<big>";
      sizeEnd = "</big>";
      break;
    default: // Normal size, do nothing and don't put any formatting.
      break;
  }

  // If numColor (aka the color of the number) is not empty/undefined/etc and actually exists, insert the code for table style.
  if (numColor) {
    numColor = "color: " + numColor + "; ";
  }

  // Total output.
  return ("\n<td style=\"" + numColor + "text-align: center\">" + sizeStart + prefix + number + sizeEnd + "</td>");

}

// Creates the HTML code for the icon cell when receiving the icon/image link.
function createIconCell(imageLink) {
  return "\n<td><img src=\"" + imageLink + "\"/></td>";
}
