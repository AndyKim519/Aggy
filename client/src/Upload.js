import React, { useState, useRef, useCallback } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import axios from "axios";
import { useDropzone } from "react-dropzone";

const OPENAI_API_KEY = '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';

function Upload() {
  const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({ audio: true });

  const [id, setId] = useState("");
  const [hasSavedRecording, setHasSavedRecording] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const audioRef = useRef(null);
  const serverport = "http://127.0.0.1:5000";

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
    // Check if there's recorded or uploaded audio, and prepare it for the request.
    let audioData;
    if (mediaBlobUrl) {
      // If the audio is recorded online, you need to fetch the actual blob data.
      const response = await fetch(mediaBlobUrl);
      audioData = await response.blob(); // This is your audio file blob data.
    } else if (uploadedFile) {
      audioData = uploadedFile; // If the file is uploaded, you directly have the file.
    } else {
      console.error("No audio to upload.");
      return;
    }
  
    // Prepare the data and headers for the request to OpenAI.
    const formData = new FormData();
    formData.append("file", audioData, "openai.mp3"); // Append the file to form data.
    formData.append("model", "whisper-1"); // Specify the model to use for transcription.
  
    try {

      const response = await axios.post("https://api.openai.com/v1/audio/transcriptions", formData, {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,

        }
      });
      console.log(response)

      if (response.data) {
        const transcription = response.data.text;
        console.log("Transcription: ", transcription);
        console.log("ID:", id)

        const finalData = {
          networkID: id,
          text: transcription,
        };
        console.log(finalData)
        console.log(serverport + "/postaudio");
        try {
          const response = await axios.post(serverport + "/postaudio", finalData);
          console.log("Server responded with:", response.data);
        } catch (error) {
          console.error("Error uploading:", error);
        }

      }
    } catch (error) {
      console.error("There was an error sending the request to OpenAI:", error);
    }
  
    clearBlobUrl();
    setUploadedFile(null);
    setHasSavedRecording(false);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Network ID"
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