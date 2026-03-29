import { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setError('');
    setMsg('');

    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // 1️⃣ File size check (5 MB)
    const maxSize = 5 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      setError('❌ File size should be less than 5 MB');
      e.target.value = null;
      return;
    }

    // 2️⃣ File type check (JPEG, PNG, PDF, DOC, DOCX)
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'application/pdf',
      'application/msword', // .doc
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // .docx
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      setError('❌ Only JPEG, PNG, PDF, DOC, and DOCX files are allowed');
      e.target.value = null;
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setError('Please select a file first.');
      return;
    }

    setLoading(true);
    setError('');
    setMsg('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMsg(`✅ File uploaded successfully: ${res.data.file?.originalName || ''}`);
    } catch (err) {
      console.error('Upload error:', err.response?.data || err.message);
      setError(err.response?.data?.details || '❌ Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="file" onChange={handleChange} />
      <button type="submit" disabled={loading}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>

      {msg && <p style={{ color: 'green' }}>{msg}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default UploadForm;
