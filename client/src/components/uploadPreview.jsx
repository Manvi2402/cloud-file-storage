// UploadPreview.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const UploadPreview = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/upload");
        setFiles(res.data);
      } catch (err) {
        console.error("Failed to fetch files", err);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div>
      <h2>Uploaded Files</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {files.map((file) => (
          <div key={file._id} style={{ border: "1px solid #ccc", padding: "10px", width: "200px" }}>
            {/* 👇 Show image preview if it's an image */}
            {file.mimetype.startsWith("image/") && (
              <img src={file.s3Url} alt={file.originalName} style={{ width: "100%", height: "auto" }} />
            )}

            <p><strong>{file.originalName}</strong></p>
            <p>Type: {file.mimetype}</p>
            <a href={file.s3Url} target="_blank" rel="noopener noreferrer">
              View / Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadPreview;
