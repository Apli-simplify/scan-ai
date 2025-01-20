from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import numpy as np
import tensorflow as tf
from PIL import Image, ImageOps
import io
import base64

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load pre-trained .keras model
model = tf.keras.models.load_model(
    '../ml_model/handwritten_recognition_model.keras')


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
    predicted_class = np.argmax(prediction) + 1

    # Map the predicted class index to the corresponding character
    if predicted_class < 10:
        predicted_char = str(predicted_class)  # Digits 0-9
    elif predicted_class < 36:
        predicted_char = chr(predicted_class + 55)  # Uppercase letters A-Z
    else:
        predicted_char = chr(predicted_class + 61)  # Lowercase letters a-z

    # Return the predicted character
    return jsonify({'prediction': predicted_char})


if __name__ == '__main__':
    app.run(debug=True)
