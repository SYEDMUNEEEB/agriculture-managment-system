const fs = require('fs');

// Read the content of the image file
fs.readFile('D:/fiver.jpg', (err, data) => {
  if (err) {
    console.error('Error reading image file:', err);
  } else {
    // Encode the content to Base64
    const base64Image = Buffer.from(data).toString('base64');
    console.log(base64Image);
  }
});