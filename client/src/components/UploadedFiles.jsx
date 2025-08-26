
import { useEffect, useState } from "react";
import axios from "axios";
import FileCard from "./FileCard";

const UploadedFiles = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/upload");
        setFiles(res.data);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/upload/${id}`);
      setFiles(files.filter((file) => file._id !== id));
      alert("File deleted successfully");
    } catch (error) {
      console.error("Failed to delete file:", error);
      alert("Failed to delete file");
    }
  };

  return (
    <div className="uploaded-files-section">
      <h2 className="uploaded-title">Uploaded Files</h2>

      <div className="files-container">
        {files.map((file) => (
          <FileCard key={file._id} file={file} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default UploadedFiles;
