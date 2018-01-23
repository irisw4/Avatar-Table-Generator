# Icon-Table-Generator
Webapp that instantly generates HTML that you can copy and paste to display your graphics in a nice, neat, numbered table.

Uses HTML, CSS, and Javascript. Currently using Bootstrap for the sake of responsiveness.

### Why don't you just use the existing icon table generators?
http://scripts.accio.nu/icons.php:
- Doesn't include the img src tags anymore so it's just a bunch of links; doesn't work

http://icontable.morning-songs.com/:
- Can't rearrange icons in table easily
- No formatting for number cells
- Can't choose numbering to start at

silvinscorner.awardspace.com/icontable/:


http://lj.indisguise.org/icontablegenerator.php:
- Doesn't include the img src tags anymore so it's just a bunch of links; doesn't work

http://bamf.edgeofmars.net/scripts/icontable.php:
- Doesn't include the img src tags anymore so it's just a bunch of links; doesn't work

http://malionette.net/generator/icontable/:
- Website is just straight-up gone (probably due to age/domain expiring), page is down and probably not coming back up.

Also, this one can grab images directly from Imgur albums using their API, for ezpz bulk uploading. The GET request limit for the Imgur API is apparently 12,500 requests per day, which should be fine unless something like more than 125 people deciding to upload 100 icons or more via Imgur in a single day happens.

Let me know if there are any features you think I should include.

## Features
- Numbering
- Font size

## To-do
- use this album (https://imgur.com/a/UR9GJ) as a placeholder
- investigate border-collapse: separate; and border-spacing: 5px on the table head tags and see if the numbering cells can be brought inline somehow
