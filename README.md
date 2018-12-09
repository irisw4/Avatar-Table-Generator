# Avatar Table Generator
This web application allows users to generate an HTML table that they can simply copy and paste the code into any raw HTML field. This is primarily used for displaying small graphics (such as avatars, edited graphics) in a structured, numbered table.

The user first needs to type or paste in direct image links from an image hosting site (links that end in .jpg, .png, .gif, etc) into the “Add images” section. They can then arrange their images in whatever order they want by clicking the arrow buttons in the “Manage images” section, or delete them from their list entirely by clicking the delete button.

Uses HTML, CSS, and Javascript. Currently using Bootstrap for the sake of responsiveness.

### Features: 
- Image link adding
- Multiple image link adding
- Adding images from Imgur album thanks to integrating the Imgur API
- Table style customization

### Customization: 

Users can simply customize their HTML table’s style (and numbering, should they want it) to their liking by adjusting what they want in the “CUSTOMIZE” section, if they so wish. Users can adjust:
-	Images per row
-	Table background color
-	Spacing between cells
-	Header (optional)
-	Starting number
-	Number position, size, font color, cell background color, optional prefix

### Instructions:
-	Run it in any internet browser, since it’s a web application.
-	Copy and paste any direct image links into any of the options in the “Add images” section. If you want to add images directly from an Imgur album, here’s a quick sample album to test it with if you don’t feel like hunting down multiple images: https://imgur.com/a/ixKjZ 
-	The current images you have are on the right side, in the “Manage images” section. There, you can delete and move (by selecting an image link and pressing the up or down buttons to change the order) links as you’d like.
-	Customize the generated HTML table however you want. You can change the number of images per row, table spacing, table background color, and add a header.
-	The numbering can also be customized, in terms of position, size, font color, background cell color, and optional prefix.
-	Copy and paste the HTML code wherever you’d like.
