// src/pages/UploadPage.jsx
import Upload from "../components/uploadForm";
import UploadPreview from "../components/uploadPreview";

const UploadPage = () => {
  return (
    <div>
      <h2>Upload Files</h2>
      <Upload />
      <hr />
      <h3>Uploaded Files Preview</h3>
      <UploadPreview />
    </div>
  );
};

export default UploadPage;
