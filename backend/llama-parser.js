const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();


async function parseFileWithLlamaParse(filepath, filename) {
  const LLAMA_CLOUD_API_KEY = process.env.LLAMA_CLOUD_API_KEY;
  if (!LLAMA_CLOUD_API_KEY) {
    throw new Error('LLAMA_CLOUD_API_KEY is not set in .env');
  }

  // Read file into a buffer and wrap in a native Blob
  const fileBuffer = fs.readFileSync(filepath);
  const blob = new Blob([fileBuffer]);

  // Use Node's native FormData
  const formData = new FormData();
  formData.append('file', blob, filename);
  formData.append('result_type', 'markdown');

  // Step 1: Upload the file and create a parse job
  console.log('Uploading file to LlamaParse...');
  const uploadResponse = await fetch('https://api.cloud.llamaindex.ai/api/parsing/upload', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${LLAMA_CLOUD_API_KEY}`,
    },
    body: formData,
  });

  if (!uploadResponse.ok) {
    const err = await uploadResponse.text();
    throw new Error(`LlamaParse upload failed: ${err}`);
  }

  const uploadData = await uploadResponse.json();
  const jobId = uploadData.id;
  console.log('LlamaParse job created, ID:', jobId);

  // Step 2: Poll until the job is done (SUCCESS or ERROR)
  let status = 'PENDING';
  while (status !== 'SUCCESS' && status !== 'ERROR') {
    await new Promise((r) => setTimeout(r, 3000)); // wait 3 seconds between polls

    const statusRes = await fetch(
      `https://api.cloud.llamaindex.ai/api/parsing/job/${jobId}`,
      { headers: { Authorization: `Bearer ${LLAMA_CLOUD_API_KEY}` } }
    );
    const statusData = await statusRes.json();
    status = statusData.status;
    console.log('LlamaParse job status:', status);
  }

  if (status === 'ERROR') {
    throw new Error('LlamaParse failed to process the document.');
  }

  // Step 3: Fetch the result as markdown
  const resultRes = await fetch(
    `https://api.cloud.llamaindex.ai/api/parsing/job/${jobId}/result/markdown`,
    { headers: { Authorization: `Bearer ${LLAMA_CLOUD_API_KEY}` } }
  );

  if (!resultRes.ok) {
    throw new Error(`Failed to fetch LlamaParse result: ${await resultRes.text()}`);
  }

  const { markdown } = await resultRes.json();
  return markdown;
}

module.exports = { parseFileWithLlamaParse };
