import { createContext, useCallback, useState } from "react";
import { storage } from "./firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

 export const ImageContext = createContext();

export default function ImageProvider({ children }) {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const uploadFile = useCallback(async (file, destinationPath) => {
        const storageRef = ref(storage, destinationPath ?? `images/${file.name}`);
        const response = await uploadBytes(storageRef, file);

        return await getDownloadURL(response.ref);
    }, []);

    const fetchImages = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const folderRef = ref(storage, "images/");
            const result = await listAll(folderRef);
            const imageList =[];

            for (const itemRef of result.items) {
                const url = await getDownloadURL(itemRef);
                imageList.push({
                    id: itemRef.name,
                    name: itemRef.name,
                    path: itemRef.fullPath,
                    fullPath: itemRef.fullPath,
                    url
                });
            }

            setImages(imageList);
        }
        catch (error) {
            console.error("Error fetching images:", error);
            setError("Failed to fetch images. Please try again later.");
        }
        finally {
            setLoading(false);
        }
    }, []);

    const updateImage = useCallback(async(imagePath, newFile) => {
        if (!newFile) return;

        setLoading(true);
        setError("");

        try {
            await uploadFile(newFile, imagePath);
            await fetchImages();
        }
        catch (error) {
            console.error("Error updating image:", error);
            setError("Failed to update image. Please try again later.");
        }
        finally { 
            setLoading(false);
        }
    }, [uploadFile, fetchImages]);

    return (
        <ImageContext.Provider value={{ images, loading, error, uploadFile, fetchImages, updateImage }}>
            {children}
        </ImageContext.Provider>    
    );
}