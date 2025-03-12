import { useState } from "react";

const UploadImage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Preview Image
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Convert Image to Base64 and Send to Backend
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);

    reader.onload = async () => {
      const base64String = reader.result.split(",")[1]; // Remove metadata

      // Create JSON payload
      const carData ={
        name: "Hyundai Creta",
        price: "10.20",
        makeYear: "2020",
        registrationYear: "2021",
        fuelType: "Petrol",
        kmDriven: "48,000 km",
        transmission: "Automatic",
        owner: "1st Owner",
        insuranceValidity: "January 2026",
        insuranceType: "Comprehensive",
        rto: "GJ03",
        location: "Jamnagar, Gujarat",
        img: base64String,
      };

      try {
        const response = await fetch("http://localhost:8080/car/addCar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(carData),
        });

        if (response.ok) {
          alert("Car added successfully!");
        } else {
          alert("Failed to upload car.");
        }
      } catch (error) {
        console.error("Error uploading car:", error);
      }
    };
  };

  return (
    <div>
      <h2>Upload Car Image</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && <img src={preview} alt="Preview" width="200px" />}
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadImage;
