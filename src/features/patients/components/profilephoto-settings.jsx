import { useState } from 'react';

export const ProfilePhotoSettings = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileSize, setFileSize] = useState('0 KB');
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileSize((file.size / 1024).toFixed(2) + ' KB');

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-300 p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Profile Photo</h2>
      <div className="flex flex-col items-center">
        <label className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center w-full max-w-md mb-4 cursor-pointer hover:bg-gray-50">
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept="image/*"
          />
          <p className="mb-2 font-medium">SELECT FILE</p>
          <p className="text-sm text-gray-500">click to upload</p>
        </label>

        {selectedFile && (
          <div className="text-sm text-gray-500 mb-4 text-center">
            <p>Selected file: {selectedFile.name}</p>
            <p>File size: {fileSize}</p>
          </div>
        )}

        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            className=" h-64 object-cover rounded-md border border-gray-300"
          />
        )}
      </div>
    </div>
  );
};
