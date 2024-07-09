// Function to load JSON file
function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', 'charts.json', true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(JSON.parse(xobj.responseText));
    }
  };
  xobj.send(null);
}

// Function to create album elements
function createAlbumElement(albumInfo) {
  var container = document.getElementById("albumContainer");

  var albumDiv = document.createElement("div");
  albumDiv.className = "album";

  var imageContainer = document.createElement("div");
  imageContainer.className = "image-container";

  // Create anchor tag and set href to the image link URL
  var imageLink = document.createElement("a");
  if (albumInfo.imageLinkUrl) {
    imageLink.href = albumInfo.imageLinkUrl;
    imageLink.target = "_blank"; // Open link in new tab
  } else {
    // Set a default href or handle missing URL case
    imageLink.href = "#"; // Default to "#" if no URL provided
  }

  var image = document.createElement("img");
  if (albumInfo.imageUrl) {
    image.src = albumInfo.imageUrl;
    image.alt = "Album Art";
  } else {
    // Set a placeholder image or handle missing image case
    image.src = "placeholder_image.jpg"; // Or any other placeholder image
    image.alt = "Missing Image";
  }

  // Append image to the anchor tag
  imageLink.appendChild(image);
  // Append anchor tag to the image container
  imageContainer.appendChild(imageLink);

  var infoContainer = document.createElement("div");
  infoContainer.className = "info-container";

  // Song name
  var songNameLabel = document.createElement("p");
  songNameLabel.textContent = albumInfo.songName;
  songNameLabel.className = "song-name"; // Assign 'song-name' class
  var songNameWrapper = document.createElement("div");
  songNameWrapper.className = "img-info-wrapper";
  songNameWrapper.appendChild(songNameLabel);

  // Artist
  var artistLabel = document.createElement("p");
  artistLabel.textContent = albumInfo.artist;
  var artistWrapper = document.createElement("div");
  artistWrapper.className = "img-info-wrapper";
  artistWrapper.appendChild(artistLabel);

  // Album
  var albumLabel = document.createElement("p");
  albumLabel.textContent = albumInfo.album;
  var albumWrapper = document.createElement("div");
  albumWrapper.className = "img-info-wrapper";
  albumWrapper.appendChild(albumLabel);

  // Year
  var yearLabel = document.createElement("p");
  yearLabel.textContent = albumInfo.year;
  var yearWrapper = document.createElement("div");
  yearWrapper.className = "img-info-wrapper";
  yearWrapper.appendChild(yearLabel);

  infoContainer.appendChild(songNameWrapper);
  infoContainer.appendChild(artistWrapper);
  infoContainer.appendChild(albumWrapper);
  infoContainer.appendChild(yearWrapper);

  albumDiv.appendChild(imageContainer);
  albumDiv.appendChild(infoContainer);

  container.appendChild(albumDiv);
}

// Load JSON and create elements
loadJSON(function(data) {
  for (var i = 0; i < data.length; i++) {
    createAlbumElement(data[i]);
  }
});
