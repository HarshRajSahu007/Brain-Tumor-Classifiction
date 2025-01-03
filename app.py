from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from PIL import Image
import numpy as np
import tensorflow as tf

# Load the model
model = tf.keras.models.load_model("my_model.h5")

# Define class names
CLASS_NAMES = {
    0: "Glioma Tumor",
    1: "Meningioma Tumor",
    2: "No Tumor",
    3: "Pituitary Tumour"
}

# Create the FastAPI app
app = FastAPI()

# Preprocessing function
def preprocess_image(image: Image.Image) -> np.ndarray:
    try:
        # Convert the image to RGB if it is not already
        if image.mode != "RGB":
            image = image.convert("RGB")
        
        # Resize to (224, 224)
        image = image.resize((224, 224))
        # Convert to NumPy array
        image_array = np.array(image)
        # Normalize pixel values
        image_array = image_array / 255.0
        # Add batch dimension
        image_array = np.expand_dims(image_array, axis=0)
        return image_array.astype("float32")
    except Exception as e:
        raise ValueError(f"Error in preprocessing image: {str(e)}")


@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    try:
        # Open and preprocess the uploaded image
        image = Image.open(file.file)
        processed_image = preprocess_image(image)

        # Predict the class
        predictions = model.predict(processed_image)
        predicted_class = np.argmax(predictions, axis=1)[0]
        confidence = float(np.max(predictions))

        # Get the class name
        predicted_class_name = CLASS_NAMES[predicted_class]

        return JSONResponse(content={
            "predicted_class": predicted_class_name,
            "confidence": confidence
        })
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
