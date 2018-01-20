$( document ).ready( function() {
	
	// Clicking the + Add link button on the side of the "Add images 1-by-1" input field adds the link to the 'Currently added images' list (currentImages) on the right. 
	$( '#addLinkButton' ).on( 'click', function( e ) {
		var link = $( '#singleImageURL' ).val();
		$( '#currentImages' ).append( new Option( link, link, true, true ) );
	} );
	
	// Pressing the enter/return key after typing in the input field singleImageURL essentially does the same thing as clicking the + Add link button
	$( '#singleImageURL' ).keypress( function( e ) {
		var keycode = ( event.keyCode ? event.keyCode : event.which );
		if ( keycode == '13' ) { // keycode 13 is the enter key
			var link = $( '#singleImageURL' ).val();
			$( '#currentImages' ).append( new Option( link, link, true, true ) );
		}
	} );
	
	// Clicking the remove button in the Manage images section removes the select(ed) options
	$( '#removeButton' ).click( function( e ) {
		$( "#currentImages option:selected" ).remove();
	} );
	
	// Clicking the move up button (moveUpButton) moves the select(ed) option(s) upwards.
	$( '#moveUpButton' ).click( function() {
		$( '#currentImages option:selected:first-child' ).prop( "selected", false );
		var before = $( '#currentImages option:selected:first' ).prev();
		$( '#currentImages option:selected' ).detach().insertBefore( before );
	} );
	
	// Clicking the move down button (moveDownButton) moves the select(ed) option(s) downwards.
	$( '#moveDownButton' ).click( function() {
		$( '#currentImages option:selected:last-child' ).prop( "selected", false );
		var after = $( '#currentImages option:selected:last' ).next();
		$( '#currentImages option:selected' ).detach().insertAfter( after );
	} );
	
	// Clicking the + Add album button (addImgurButton) adds all the images in the album linked by the URL input to currentImages.
	$( '#addImgurButton' ).click( function() {
		var link = $( '#imgurAlbumURL' ).val();
		if ( link.includes( "imgur.com/a/" ) ) { // If the input field does not start with 'https://imgur.com/a/', then it's not an Imgur album...probably.
			requestAlbumImages( link );
		} else { // Else, it doesn't have "imgur.com/a/" in the URL and thus is probably not an album.
			alert( "Not a valid Imgur album! ...Probably." );
		}
	} );
	
	// Pressing the enter/return key after typing in the input field imgurAlbumURL essentially does the same thing as clicking the + Add album button
	$( '#imgurAlbumURL' ).keypress( function( e ) {
		var keycode = ( event.keyCode ? event.keyCode : event.which );
		if ( keycode == '13' ) { // keycode 13 is the enter key
			var link = $( '#imgurAlbumURL' ).val();
			if ( link.includes( "imgur.com/a/" ) ) { // If the input field does not start with 'https://imgur.com/a/', then it's not an Imgur album...probably.
				requestAlbumImages( link );
			} else { // Else, it doesn't have "imgur.com/a/" in the URL and thus is probably not an album.
				alert( "Not a valid Imgur album! ...Probably." );
			}
		}
	} );
} );

// Requests all images from an Imgur album by grabbing the link from the input field and then sending a XMLHttpRequest
// to the API's endpoint, using processRequest().
// Authorization: Client-ID YOUR_CLIENT_ID
function requestAlbumImages( albumURL ) {
	var albumID = albumURL.substring( 20 ); // Chops off the first 20 characters aka the 'https://imgur.com/a/' part.   
	var requestURL = "https://api.imgur.com/3/album/" + albumID + "/images";
	var clientID = "730dd7ce7561488";
	var request = new XMLHttpRequest();
	
	// If it successfully connected, the request is processed.
	request.onreadystatechange = function() {
		if ( request.readyState == 4 && request.status == 200 ) {
			processRequest( request.responseText );
		} else { // Else, print an error to the console.
			console.log( "Error with Imgur Request. Status = " + request.status + " Ready state = " + request.readyState );
		}
	}
	
	// Send request for authorization, attach client ID.
	request.open( "GET", requestURL, true ); // true for asynchronous     
	request.setRequestHeader( 'Authorization', 'Client-ID ' + clientID );
	request.send();
}

// Processes the XMLHttpRequest from requestAlbumImages() above, which receives a JSON response in return.
function processRequest( response_text ) {
	if ( response_text == "Not found" ) {
		alert( "Imgur album not found." );
	} else {
		var parsedJSON = JSON.parse( response_text ).data;
		// For each item in the 'data' array in the JSON response, grab the 'link' and add it as an option in the currentImages list.
		for ( var i in parsedJSON ) {
			var directLink = parsedJSON[ i ].link;
			$( '#currentImages' ).append( new Option( directLink, directLink, true, true ) );
		}
	}
}

// Debugging function
function sayHello() {
	alert( "hello!" );
}
