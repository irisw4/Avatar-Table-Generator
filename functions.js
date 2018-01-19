$(function() {

  // Clicking the + Add link button on the side of the "Add images 1-by-1" input field adds the link to the 'Currently added images' list (currentImages) on the right. 
  $('#addLinkButton').on('click', function(e) {
    var newURL = $('#singleImageURL').val();

    $('#currentImages').append(new Option(newURL, newURL, true, true));

  });

  // Clicking the remove button in the Manage images section removes the select(ed) options
  $('#removeButton').click(function(e) {
    $("#currentImages option:selected").remove();
  });

  // Clicking the move up button (moveUpButton) moves the select(ed) option(s) upwards.

  $('#moveUpButton').click(function(e) {

  });

});
