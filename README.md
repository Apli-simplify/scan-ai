# ScanAI 🔎

This project is an automated system for recognizing and transcribing handwritten characters (letters and digits) using Machine Learning. It consists of three main components:
1. **Machine Learning Model**: Trained using TensorFlow/Keras in a Jupyter Notebook.
2. **Backend**: Built with Flask to handle prediction requests.
3. **Frontend**: Built with React for user interaction.

The system allows users to upload images of handwritten characters or draw them directly in the interface, and it provides real-time predictions.

---

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [License](#license)

---

## Features
- **Handwritten Character Recognition**: Recognizes handwritten digits and letters.
- **Real-Time Prediction**: Users can draw characters or upload images for instant predictions.
- **User-Friendly Interface**: Simple and intuitive React-based frontend.
- **Scalable Backend**: Flask backend for handling prediction requests.

---

## Technologies Used
- **Machine Learning**:
  - TensorFlow/Keras
  - OpenCV (for image preprocessing)
- **Backend**:
  - Flask (Python)
- **Frontend**:
  - React (JavaScript)
- **Other Tools**:
  - Jupyter Notebook (for model training and experimentation)
  - NumPy, Pandas, Scikit-learn (for data processing)

---

## Installation

### Prerequisites
- Python 3.8 or higher
- Node.js (for React frontend)
- Git (for cloning the repository)

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Apli-simplify/scan-ai.git
   cd scan-ai
   ```
2. **Set Up the Backend**:
   - Navigate to the backend folder:
   ```bash
   cd backend
   ```
   - Create a virtual environment and install dependencies:
   ```bash
   python -m venv venv
   source venv/bin/activate # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```
3. **Set Up the Frontend**:
   - Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```
   - Install dependencies:
   ```bash
   npm install
   ```
4. **Download the Trained Model**:
   - Place the trained model (handwritten_char_model.h5) in the backend folder. If you don't have a trained model, follow the instructions in the ml_model/ folder to train one.

---

## Usage
### Running the Backend
   1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
   2. Start the Flask server:
   ```bash
   python app.py
   ```
   The backend will run on http://localhost:5000

### Running the Frontend
   1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```
   2. Start the React app:
   ```bash
   npm run dev
   ```
   The frontend will run on http://localhost:5173

### Using the System
   1. Open your browser and go to http://localhost:5173.
   2. Upload an image of a handwritten character or draw one directly in the interface.
   3. The system will display the predicted character in real time.
   
---

## Project Structure

```
scan-ai/
├── backend/ # Flask backend
│ ├── app.py # Flask application
│ ├── requirements.txt # Python dependencies
│ └── handwritten_char_model.h5 # Trained model
├── frontend/ # React frontend
│ ├── public/ # Static assets
│ ├── src/ # React components
│ │ ├── App.js # Main React component
│ │ └── index.js # Entry point
│ └── package.json # Node.js dependencies
├── ml_model/ # Machine Learning model
│ ├── train_model.ipynb # Jupyter Notebook for training
│ └── dataset/ # Dataset for training
└── README.md # Project documentation
```

---

## License

This project is licensed under the MIT License. See the [LICENSE](https://mit-license.org/) file for details.

---

## Acknowledgments

* Special thanks to our professors **Aissam Outchakoucht** and **Younes Oulad Sayad** for supporting this project.

* Dataset used: MNIST and EMNIST.

---

## Contact

For questions or feedback, feel free to reach out:

* Yahya Lazrek: lazrek.yahya@outlook.com
* Hamza Ouabiba: hamza.ouabiba@gmail.com
