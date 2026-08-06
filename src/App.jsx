import { useContext, useEffect } from "react";
import ImageProvider, { ImageContext } from "./Image";
import { Form } from 'react-bootstrap';

function ImageListContent() {
  const { images, fetchImages, loading, updateImage } = useContext(ImageContext);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return (
    <div>
      <h1>Image List</h1>
      {loading && <p>Loading images...</p>}
      {!loading && images.length === 0 && <p>No images found.</p>}
      {images.map((image) => (
        <div key={image.id}>
          <img src={image.url} alt={image.name} width="200" />
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
function App() {

  return (
    <ImageProvider>
      <ImageListContent />
    </ImageProvider>
  );
}

export default App;
