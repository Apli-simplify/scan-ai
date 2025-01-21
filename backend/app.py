from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import tensorflow as tf
from PIL import Image, ImageOps
import pytesseract
import io
import base64
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load pre-trained .keras model
model = tf.keras.models.load_model(
    '../ml_model/model.h5')

# Configure Tesseract path
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'


@app.route('/predict', methods=['POST'])
def predict():
    # Get the base64-encoded image data from the frontend
    data = request.json['image']
    image_data = base64.b64decode(
        data.split(',')[1])  # Decode the base64 string
    img = Image.open(io.BytesIO(image_data)).convert(
        'L')  # Convert to grayscale

    # Invert the colors to match EMNIST format
    img = ImageOps.invert(img)

    # Preprocess the image
    img = img.resize((28, 28))  # Resize to 28x28
    img_array = np.array(img)  # Convert to numpy array
    img_array = img_array.reshape((28, 28))  # Reshape to (28, 28)
    img_array = img_array / 255.0  # Normalize pixel values to [0, 1]
    img_array = img_array.reshape((1, 28, 28, 1))  # Reshape to (1, 28, 28, 1)

    # Make a prediction
    prediction = model.predict(img_array)
    # Get the predicted class index
    predicted_class = np.argmax(prediction)

    # Map the predicted class index to the corresponding character
    if predicted_class < 10:
        predicted_char = str(predicted_class)  # Digits 0-9
    elif predicted_class < 36:
        predicted_char = chr(predicted_class + 55)  # Uppercase letters A-Z
    else:
        predicted_char = chr(predicted_class + 61)  # Lowercase letters a-z

    # Return the predicted character
    return jsonify({'prediction': predicted_char})


@app.route('/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    # Save the uploaded image temporarily
    image_path = 'uploaded_image.png'
    file.save(image_path)

    # Extract text using Tesseract
    try:
        text = pytesseract.image_to_string(Image.open(image_path))
        os.remove(image_path)  # Clean up the uploaded file
        return jsonify({'text': text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
