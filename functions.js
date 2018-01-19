var imageList = document.getElementById("currentImages");

function addSingleLink() {

  var newURL = document.getElementyById("singleImageURL").value;

  var newLink = new Option(newURL, newURL);

  imageList.appendChild(newLink);
}
