import { useState } from "react";
import { isImageValid } from "../utils"; // Assuming you have an image validation utility

const useImageChange = () => {
    const [image, setImage] = useState(null); // Store the selected image file
    const [error, setError] = useState(""); // Store any error messages

    const handleImageChange = (e) => {
        setImage(null); // Reset image and error when selecting a new file
        setError("");

        if (e.target.files.length < 1) {
            return;
        }

        const file = e.target.files[0];
        if (isImageValid(file)) {
            setImage(file); // Set the selected image if it's valid
        } else {
            setError("Please upload an Image file.");
            e.target.value = ""; // Clear the file input
        }
    };

    return { image, error, handleImageChange, setError, setImage };
};

export default useImageChange;
