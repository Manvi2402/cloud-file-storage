
import React from "react";
import "../css/filecard.css"; // Ensure this path is correct

const FileCard = ({ file, onDelete }) => {
  const { originalname, size, mimetype } = file;
  const s3Url = file.s3Url || file.url || file.location;
  const isImage = mimetype?.startsWith("image/");
  const isPDF = mimetype === "application/pdf";
  const isAudio = mimetype?.startsWith("audio/");
  const isVideo = mimetype?.startsWith("video/");

  let fileIcon = "📁";
  if (mimetype?.includes("zip")) fileIcon = "🗜️";
  else if (mimetype?.includes("msword") || mimetype?.includes("officedocument.wordprocessingml")) fileIcon = "📄";
  else if (mimetype?.includes("presentation")) fileIcon = "📊";
  else if (mimetype?.includes("spreadsheet")) fileIcon = "📈";
  else if (isAudio) fileIcon = "🎵";
  else if (isVideo) fileIcon = "🎬";
  else if (mimetype?.includes("json") || mimetype?.includes("text")) fileIcon = "📜";

  const copyToClipboard = () => {
    if (!s3Url) {
      alert("❌ No link available to copy!");
      return;
    }
    navigator.clipboard.writeText(s3Url);
    alert("🔗 Link copied to clipboard!");
  };

  return (
    <div className="file-card">
      <p className="file-title">
        <strong>
          {fileIcon} {originalname}
        </strong>
      </p>
      <p className="file-size">Size: {(size / 1024).toFixed(2)} KB</p>

      {isImage && s3Url ? (
        <>
          <img src={s3Url} alt={originalname} className="file-preview-img" />
          <a href={s3Url} download target="_blank" rel="noopener noreferrer" className="file-link">
            ⬇️ Download Image
          </a>
        </>
      ) : isPDF && s3Url ? (
        <>
          <iframe src={s3Url} title={originalname} className="file-preview-pdf"></iframe>
          <a href={s3Url} target="_blank" rel="noopener noreferrer" className="file-link">
            📄 View Full PDF
          </a>
        </>
      ) : isAudio ? (
        <>
          <audio controls className="file-audio">
            <source src={s3Url} type={mimetype} />
            Your browser does not support the audio tag.
          </audio>
          <a href={s3Url} download target="_blank" rel="noopener noreferrer" className="file-link">
            ⬇️ Download Audio
          </a>
        </>
      ) : isVideo ? (
        <>
          <video controls className="file-video">
            <source src={s3Url} type={mimetype} />
            Your browser does not support the video tag.
          </video>
          <a href={s3Url} download target="_blank" rel="noopener noreferrer" className="file-link">
            ⬇️ Download Video
          </a>
        </>
      ) : (
        <>
          <div className="file-no-preview">Preview not available</div>
          <a href={s3Url} download target="_blank" rel="noopener noreferrer" className="file-link">
            ⬇️ Download File
          </a>
        </>
      )}

      <button className="file-copy-btn" onClick={copyToClipboard}>
        📋 Copy Link
      </button>

      <button
        className="file-delete-btn"
        onClick={() => onDelete(file._id)}
        style={{
          cursor: "pointer",
          backgroundColor: "#e74c3c",
          color: "white",
          border: "none",
          padding: "6px 12px",
          borderRadius: "5px",
          marginLeft: "10px",
          marginTop: "8px",
        }}
      >
        🗑️ Delete
      </button>
    </div>
  );
};

export default FileCard;
