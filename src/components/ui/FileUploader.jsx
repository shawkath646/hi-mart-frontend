import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineFileZip } from "react-icons/ai";
import {
  FiUpload,
  FiImage,
  FiFile,
  FiFileText,
  FiX,
} from "react-icons/fi";

const getFileIcon = (type) => {
  if (type.startsWith("image/")) return <FiImage size={40} />;
  if (type === "application/pdf") return <FiFileText size={40} />;
  if (
    type === "application/zip" ||
    type === "application/x-zip-compressed"
  )
    return <AiOutlineFileZip size={40} />;
  return <FiFile size={40} />;
};

const FileUploader = ({ value, onChange, accept, label }) => {
  const [preview, setPreview] = useState(value || null);

  useEffect(() => {
    // Sync with parent value
    if (!value) setPreview(null);
  }, [value]);

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    if (fileRejections.length > 0) {
      alert("Invalid file. Only JPG/PNG/WEBP images under 5MB are allowed.");
      return;
    }

    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result;
      setPreview(base64);
      if (onChange) onChange(base64);
    };

    if (file) reader.readAsDataURL(file);
  }, [onChange]);


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false,
  });

  const handleRemove = () => {
    setPreview(null);
    onChange(null);
  };

  const renderPreview = () => {
    if (!preview) return null;

    const mimeMatch = preview.match(/^data:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : "";

    return (
      <div className="mt-4 flex items-center gap-4 bg-gray-100 p-4 rounded-md shadow-sm w-full max-w-md">
        {mime.startsWith("image/") ? (
          <img
            src={preview}
            alt="preview"
            className="w-16 h-16 object-cover rounded"
          />
        ) : (
          <div className="text-gray-600">{getFileIcon(mime)}</div>
        )}
        <div className="flex-1">
          <div className="text-sm font-medium break-all">
            {mime.split("/")[1]?.toUpperCase() || "Unknown"} File
          </div>
        </div>
        <button
          onClick={handleRemove}
          className="text-red-500 hover:text-red-700"
        >
          <FiX size={20} />
        </button>
      </div>
    );
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {!preview && (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-md p-6 text-center transition cursor-pointer ${isDragActive ? "bg-blue-50 border-blue-400" : "border-gray-300"
            }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center space-y-2">
            <FiUpload size={36} className="text-gray-500" />
            <p className="text-gray-600">
              {isDragActive
                ? "Drop the file here..."
                : "Click or drag a file to upload"}
            </p>
          </div>
        </div>
      )}

      {renderPreview()}
    </div>
  );
};

export default FileUploader;
