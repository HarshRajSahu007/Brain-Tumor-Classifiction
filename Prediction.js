import React, { useState } from "react";
import axios from "axios";

const Prediction = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please upload a valid image file.");
        setSelectedFile(null);
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5 MB limit
        setError("File size exceeds 5 MB.");
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError("Please select a file before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/predict/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setPrediction(response.data);
    } catch (error) {
      console.error("Error predicting:", error);
      setError("Failed to predict. Please try again.");
      setPrediction(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Brain Tumor Prediction</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit" disabled={!selectedFile || isLoading}>
          {isLoading ? "Processing..." : "Predict"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {prediction && (
        <div>
          <h2>Prediction</h2>
          <p>Predicted Class: {prediction.predicted_class}</p>
          <p>
            Confidence:{" "}
            {prediction.confidence
              ? prediction.confidence.toFixed(2)
              : "Not available"}
          </p>
        </div>
      )}
    </div>
  );
};

export default Prediction;
