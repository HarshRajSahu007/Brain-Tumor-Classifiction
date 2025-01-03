Brain Tumor Classification Platform
This project is a full-stack web application designed to classify brain tumor types using advanced machine learning models. It combines React for the frontend, FastAPI for the backend, and TensorFlow for the predictive model, offering an intuitive and user-friendly experience.

Key Features:

Frontend (React):
Clean and responsive UI for seamless user interaction.
File upload functionality with validation (e.g., file type and size).
Real-time display of prediction results, including class type and confidence level.
Backend (FastAPI):
Robust API endpoints for image preprocessing and model inference.
Efficient handling of image uploads and error management.
Machine Learning (TensorFlow):
Trained model to classify brain tumors into four categories:
Glioma Tumor
Meningioma Tumor
No Tumor
Pituitary Tumor
High accuracy ensured by preprocessing and normalization pipelines.
Integration:
Environment configuration using .env files for seamless API connectivity.
Localhost support for development and testing.
Technologies Used:

Frontend: React, Axios
Backend: FastAPI, Python
Machine Learning: TensorFlow, NumPy, PIL
Environment Management: .env files
How It Works:

Upload an MRI image via the React frontend.
The image is sent to the FastAPI backend, where it is preprocessed.
The TensorFlow model predicts the tumor type, and the result is sent back to the frontend for display.
This platform simplifies and accelerates the process of brain tumor classification, making it a potential tool for medical diagnostics and research.
