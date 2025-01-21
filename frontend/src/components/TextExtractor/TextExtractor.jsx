import React, { useState } from 'react';
import axios from 'axios';
import styles from './TextExtractor.module.css';

const TextExtractor = () => {
    const [file, setFile] = useState(null);
    const [text, setText] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert('Please upload an image first.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            if (response.data.text === "") {
                alert("No text found!");
            }
            setText(response.data.text);
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Failed to extract text.');
        }
    };

    return (
        <div className={styles.TextExtractor}>
            <h1>Handwritten Text Extraction</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button type="submit">Extract Text</button>
            </form>
            {text && (
                <div>
                    <h2>Extracted Text:</h2>
                    <textarea rows="10" cols="50" value={text} readOnly />
                </div>
            )}
        </div>
    );
};

export default TextExtractor;