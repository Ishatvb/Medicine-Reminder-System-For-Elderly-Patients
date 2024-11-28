import google.generativeai as genai
import os
import sys
import json

# # Replace 'your_api_key' with your actual Google API key
API_KEY = "AIzaSyDAu3ZtKtIablIbNP5RAXx_A54NMgeKzKw"
genai.configure(api_key=API_KEY)

def prep_image(image_path):
    # Upload the file
    sample_file = genai.upload_file(path=image_path, display_name="Uploaded Image")
    print(f"Uploaded file '{sample_file.display_name}' as: {sample_file.uri}")
    file = genai.get_file(name=sample_file.name)
    print(f"Retrieved file '{file.display_name}' as: {sample_file.uri}")
    return sample_file

def extract_text_from_image(image_path, prompt):
    # Choose a Gemini model
    model = genai.GenerativeModel(model_name="gemini-1.5-pro")
    # Prompt the model with text and the uploaded image
    response = model.generate_content([image_path, prompt])
    return response.text

def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No image path provided"}))
        sys.exit(1)

    image_path = sys.argv[1]
    # image_path = 'D:/Medicine-Reminder-System-For-Elderly-Patients/backend/Images/1732635965898.jpg'

    prompt = "Extract the medicine names with their dosage(normalize dosage into breakfast, lunch, dinner), duration and timing(before meals or after meals) from the image and return the output in the form of a json object."

    try:
        sample_file = prep_image(image_path)
        extracted_text = extract_text_from_image(sample_file, prompt)
        print(json.dumps({"extracted_text": extracted_text}))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)

if __name__ == "__main__":
    main()

import google.generativeai as genai
import os
import sys
import json

# Replace 'your_api_key' with your actual Google API key
genai.configure(api_key=API_KEY)

def prep_image(image_path):
    # Upload the file to Gemini
    sample_file = genai.upload_file(path=image_path, display_name="Uploaded Image")
    print(f"Uploaded file '{sample_file.display_name}' as: {sample_file.uri}")
    
    # Only return the relevant information to avoid cyclical structures
    sanitized_file_data = {
        'display_name': sample_file.display_name,
        'uri': sample_file.uri,
        'name': sample_file.name
    }
    
    # Retrieve the file details from Gemini (not necessary unless needed for debugging)
    file = genai.get_file(name=sample_file.name)
    print(f"Retrieved file '{file.display_name}' as: {file.uri}")
    
    return sanitized_file_data

def extract_text_from_image(image_data, prompt):
    # Choose a Gemini model for text extraction
    model = genai.GenerativeModel(model_name="gemini-1.5-pro")
    
    # Use the URI of the image (passed from prep_image)
    response = model.generate_content([image_data['uri'], prompt])
    return response.text

def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No image path provided"}))
        sys.exit(1)

    image_path = sys.argv[1]
    # image_path = r"D:\Medicine-Reminder-System-For-Elderly-Patients\backend\content\media\picker\0\com.android.providers.media.photopicker\media\1000000033"
    prompt = "Extract the medicine names with their dosage, duration, and timing from the image and return the output as a JSON object."

    try:
        # Get the sanitized file data (only relevant fields)
        sanitized_file_data = prep_image(image_path)
        
        # Extract text using the sanitized file data
        extracted_text = extract_text_from_image(sanitized_file_data, prompt)
        
        # Print the extracted text as JSON
        print(json.dumps({"extracted_text": extracted_text}))
        
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)

if __name__ == "__main__":
    main()

