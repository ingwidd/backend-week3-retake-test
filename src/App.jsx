import { useContext, useEffect } from "react";
import { Form } from "react-bootstrap";
import { ImageContext } from "./Image";
import ImageProvider from "./Image";

function ImageListContent() {
    const { images, loading, error, fetchImages, updateImage } = useContext(ImageContext);

    useEffect(() => {
      fetchImages();
    }, [fetchImages]);

    return (
      <div>
        <h1>Replace Images in Firebase Storage</h1>
        {loading && <p>Loading images...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && images.length === 0 && <p>No images found.</p>}
        {images.map((image) => (
          <div key={image.id}>
            <img src={image.url} width="200" />
            <Form>
              <Form.Control
                type="file"
                onChange={(e) => updateImage(image.fullPath, e.target.files[0])}
              />
            </Form>
          </div>
        ))}
      </div>
    );
}

export default function App() {
  return (
    <ImageProvider>
      <ImageListContent />
    </ImageProvider>  
  );
}