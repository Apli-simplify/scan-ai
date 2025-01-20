import React, { useRef, useState, useEffect } from 'react';
import './App.css';

const CANVAS_SIZE = 280; // 28x28 grid scaled up for drawing
const GRID_SIZE = 28;

function App() {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null); // Ref for the file input
  const [prediction, setPrediction] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // Initialize the canvas with a white background
  const initializeCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  };

  // Handle mouse down (start drawing)
  const startDrawing = (event) => {
    setIsDrawing(true);
    draw(event); // Draw immediately when the mouse button is pressed
  };

  // Handle mouse up (stop drawing)
  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // Handle mouse move (draw if the mouse button is pressed)
  const draw = (event) => {
    if (!isDrawing) return; // Only draw if the mouse button is pressed

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ctx.fillStyle = 'black';
    ctx.fillRect(x, y, 10, 10); // Draw a small square
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white'; // Fill with white background
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    setPrediction(null);
    setImagePreview(null); // Clear the image preview
  };

  const getImageData = () => {
    const canvas = canvasRef.current;
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = GRID_SIZE;
    tempCanvas.height = GRID_SIZE;
    const tempCtx = tempCanvas.getContext('2d');

    // Fill the temporary canvas with a white background
    tempCtx.fillStyle = 'white';
    tempCtx.fillRect(0, 0, GRID_SIZE, GRID_SIZE);

    // Scale down the canvas to 28x28
    tempCtx.drawImage(canvas, 0, 0, GRID_SIZE, GRID_SIZE);

    // Convert the image to a base64-encoded string
    const imageData = tempCanvas.toDataURL();
    setImagePreview(imageData); // Update the image preview state
    return imageData;
  };

  const handlePredict = async () => {
    const imageData = getImageData();

    // Send the image data to the Flask backend
    const response = await fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: imageData }),
    });
    const result = await response.json();
    setPrediction(result.prediction);
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Clear the canvas and draw the uploaded image
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        // Calculate aspect ratio and draw the image centered on the canvas
        const scale = Math.min(CANVAS_SIZE / img.width, CANVAS_SIZE / img.height);
        const x = (CANVAS_SIZE - img.width * scale) / 2;
        const y = (CANVAS_SIZE - img.height * scale) / 2;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Trigger file input when the upload button is clicked
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Initialize the canvas with a white background on component mount
  useEffect(() => {
    initializeCanvas();
  }, []);

  return (
    <div className="App">
      <h1>Draw a Letter</h1>
      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
      />
      <br />
      <button onClick={triggerFileInput} className="upload-button">
        Upload Image
      </button>
      <button onClick={clearCanvas}>Clear</button>
      <button onClick={handlePredict}>Predict</button>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        ref={fileInputRef}
        style={{ display: 'none' }} // Hide the default file input
      />
      {prediction !== null && <h2>Predicted Character: {prediction}</h2>}

      {/* Display the image being sent to the backend */}
      {imagePreview && (
        <div className="image-preview">
          <h3>Image Sent to Backend:</h3>
          <img
            src={imagePreview}
            alt="Preview of the image sent to the backend"
          />
        </div>
      )}
    </div>
  );
}

export default App;