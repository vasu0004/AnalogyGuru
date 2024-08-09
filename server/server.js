const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define schema and model
const analogySchema = new mongoose.Schema({
  concept: String,
  analogy: String,
  description: String,
  image: String
});

const Analogy = mongoose.model('Analogy', analogySchema);

// Multer storage configuration
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'uploads'),  // Directory to save uploaded files
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB limit
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('image');

// Function to check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// Routes
app.get('/api/analogies', async (req, res) => {
  try {
    const analogies = await Analogy.find();
    res.json(analogies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch analogies' });
  }
});

app.post('/api/analogies', upload, async (req, res) => {
  console.log('Uploaded file:', req.file);  // Log file details
  try {
    const { concept, analogy, description } = req.body;
    
    // Check if file was uploaded and log filename
    if (req.file) {
      console.log('Filename:', req.file.filename);
    } else {
      console.log('No file uploaded');
    }
    
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    console.log('Image Path:', imagePath);  // Log constructed image path

    const newAnalogy = new Analogy({
      concept,
      analogy,
      description,
      image: imagePath
    });
    await newAnalogy.save();
    res.status(201).json(newAnalogy);
  } catch (error) {
    console.error('Error adding analogy:', error.message);
    res.status(400).json({ error: 'Failed to add analogy' });
  }
});

// Server start
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});