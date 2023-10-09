const express = require('express');
const multer = require('multer');
const path = require('path');

// const app = express();
// const port = 3000;

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/'); // Destination folder where uploaded files will be stored
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.img);
    cb(null, `"*"${ext}`); // Rename the file to include a timestamp
  },
});

const upload = multer({ storage });

// // Serve HTML form to upload a file
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// Handle file upload when the form is submitted
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  res.send('File uploaded successfully!');
});

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
