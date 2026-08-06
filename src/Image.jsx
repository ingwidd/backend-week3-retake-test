import { createContext, useState, useCallback } from "react";
import { storage } from "./firebase";
import { ref, listAll, getDownloadURL, uploadBytes } from "firebase/storage";

export const ImageContext = createContext();

export default function ImageProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);

    const uploadFile = useCallback(async (file, destinationPath) => {
        const storageRef = ref(storage, destinationPath ?? `images/${file.name}`);
        const response = await uploadBytes(storageRef, file);
        return await getDownloadURL(response.ref);
    }, []);

    const fetchImages = useCallback(async () => {
        setLoading(true);
        try {
            const folderRef = ref(storage, "images/");
            const result = await listAll(folderRef);
            const imageList = await Promise.all(
                result.items.map(async (itemRef) => ({
                    id: itemRef.name,
                    name: itemRef.name,
                    path: itemRef.fullPath,
                    fullPath: itemRef.fullPath,
                    url: await getDownloadURL(itemRef),
                }))
            );
            setImages(imageList);
        } catch (error) {
            console.error("Error fetching images:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const updateImage = useCallback(async (imagePath, newFile) => {
        if (!newFile) return;

        setLoading(true);
        try {
            await uploadFile(newFile, imagePath);
            await fetchImages();
        } catch (error) {
            console.error("Error updating image:", error);
            setLoading(false);
        }
    }, [uploadFile, fetchImages]);

    return (
        <ImageContext.Provider value={{ loading, images, uploadFile, updateImage, fetchImages }}>
            {children}
        </ImageContext.Provider>
    );
}