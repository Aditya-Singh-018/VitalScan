const express = require('express');
const cors = require('cors');
const multer = require('multer');
const dotenv = require('dotenv');
const { unlink } = require('fs/promises');
const { parseFileWithLlamaParse } = require('./llama-parser.js');
const { processMedicalReport } = require('./groq-service.js');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Configure multer for temporary file storage
const upload = multer({ dest: 'uploads/' });

app.post('/api/upload', upload.single('file'), async (req, res) =>{
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const filepath = req.file.path;
  const filename = req.file.originalname;

  try{
    console.log('Parsing file with LlamaParse...', filename);

    // Parse the file using LlamaParse REST API directly
    const markdownText = await parseFileWithLlamaParse(filepath, filename);
    console.log('Extracted text (first 200 chars):', markdownText.slice(0, 200));

    // Delete the temp file after parsing
    await unlink(filepath);

    // Check for empty content
    if (!markdownText || markdownText.trim() === '' || markdownText.trim() === 'NO_CONTENT_HERE') {
      return res.status(400).json({ error: 'No content found in the document' });
    }

    // Wrap into document format expected by processMedicalReport
    const documents = [{ text: markdownText }];

    // Process with Groq AI
    const processedReport = await processMedicalReport(documents);

    return res.json({
      success: true,
      report: processedReport,
    });
  } catch (error) {
    console.error('Error processing file:', error);

    // Attempt cleanup
    try { await unlink(filepath); } catch (_) {}

    return res.status(500).json({ error: error.message || 'Error processing file' });
  }
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
