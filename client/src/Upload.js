import React, { useState, useRef, useCallback } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import axios from "axios";
import { useDropzone } from "react-dropzone";

function Upload() {
  const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({ audio: true });

  const [id, setId] = useState("");
  const [hasSavedRecording, setHasSavedRecording] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const audioRef = useRef(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setUploadedFile(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "audio/*",
  });

  const handleSaveRecording = () => {
    if (status === "stopped" && mediaBlobUrl) {
      setHasSavedRecording(true);
    }
  };

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("id", id);

    if (mediaBlobUrl) {
      const audioBlob = await fetch(mediaBlobUrl).then((r) => r.blob());
      formData.append("audio", audioBlob, "myRecording.webm");
    } else if (uploadedFile) {
      formData.append("audio", uploadedFile);
    } else {
      console.error("No audio to upload.");
      return;
    }

    try {
      const response = await axios.post("YOUR_API_ENDPOINT", formData);
      console.log("Server responded with:", response.data);
    } catch (error) {
      console.error("Error uploading:", error);
    }

    clearBlobUrl();
    setUploadedFile(null);
    setHasSavedRecording(false);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <div
        {...getRootProps()}
        style={{
          border: "2px dashed gray",
          padding: "20px",
          marginTop: "20px",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        <p>Drag & drop an audio file here, or click to select one</p>
      </div>

      {uploadedFile && <p>Selected file: {uploadedFile.name}</p>}

      {status !== "recording" ? (
        <button onClick={startRecording}>Start Recording</button>
      ) : (
        <button onClick={stopRecording}>Stop Recording</button>
      )}

      <br />

      {status === "stopped" && !hasSavedRecording && (
        <button onClick={handleSaveRecording}>Save Recording</button>
      )}

      {hasSavedRecording && (
        <div>
          <audio ref={audioRef} controls={false} src={mediaBlobUrl}></audio>
          <button onClick={handlePlay}>Play Recording</button>
        </div>
      )}

      <br />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Upload;
