import { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { createImage } from './graphql/mutations';
import { listImages } from './graphql/queries';
import { Amplify } from 'aws-amplify';
import amplifyconfig from './amplifyconfiguration.json';
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { getCurrentUser, signOut } from 'aws-amplify/auth';
import { uploadData } from 'aws-amplify/storage';

const initialState = { name: '', path: '', owner: '' };
const client = generateClient();

Amplify.configure(amplifyconfig);

const App = () => {
  const [formState, setFormState] = useState(initialState);
  const [images, setImages] = useState([]);
  const [userName, setUserName] = useState('')
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    currentUser();
    fetchImages();
  }, []);

  async function uploadTest() {
    try {
      const result = await uploadData({
        key: 'baixados.png',
        data: selectedImage,
        options: {
          contentType: 'image/*',
          accessLevel: 'guest', // defaults to `guest` but can be 'private' | 'protected' | 'guest'
          // onProgress // Optional progress callback.
        }
      }).result;
      console.log('Succeeded: ', result);
    } catch (error) {
      console.log('Error : ', error);
    }
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
        console.log(reader.result);
      };
      reader.readAsDataURL(file);
      setErrorMessage('');
      // onImageSelect(file);
    } else {
      setSelectedImage(null);
      setPreviewUrl(null);
      setErrorMessage('Por favor, selecione uma imagem JPEG ou PNG.');
      // onImageSelect(null);
    }
  };

  async function currentUser() {
    const { signInDetails } = await getCurrentUser()
    console.log(signInDetails);
    setUserName(signInDetails.loginId)
  }

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  async function fetchImages() {
    try {
      const imageData = await client.graphql({
        query: listImages
      });
      const images = imageData.data.listImages.items;
      setImages(images);
    } catch (err) {
      console.log('error fetching images');
    }
  }

  async function addImage() {
    try {
      if (!formState.name || !formState.path || !formState.owner) return;
      const image = { ...formState };
      setImages([...images, image]);
      setFormState(initialState);
      await client.graphql({
        query: createImage,
        variables: {
          input: image
        }
      });
    } catch (err) {
      console.log('error creating image:', err);
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Heading style={{ color: 'white' }} level={1}>Hello! {userName}</Heading>
        <Button style={styles.button2} onClick={signOut}>Sign out</Button>
      </div>
      <h2 style={{ textAlign: 'center' }}>Amplify images</h2>
      <input
        onChange={(event) => setInput('name', event.target.value)}
        style={styles.input}
        value={formState.name}
        placeholder="Name"
      />
      <input
        onChange={(event) => setInput('path', event.target.value)}
        style={styles.input}
        value={formState.path}
        placeholder="Path"
      />
      <input
        onChange={(event) => setInput('owner', event.target.value)}
        style={styles.input}
        value={formState.owner}
        placeholder="Owner"
      />

      <button style={styles.button} onClick={() => addImage()}>
        Create Image
      </button>
      {/* {images.map((image, index) => (
        <div key={image.id ? image.id : index} style={styles.image}>
          <p style={styles.imageName}>{image.name}</p>
          <p style={styles.imagePath}>{image.path}</p>
          <p style={styles.imageOwner}>{image.owner}</p>
        </div>
      ))} */}

      <div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 10
          }}
        >
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleImageChange}
            style={{ ...styles.input, width: '50%' }}
          />
          {selectedImage && (
            <>
              <p>Imagem selecionada: {selectedImage.name}</p>
              <img
                src={previewUrl}
                alt="Preview"
                style={{ maxWidth: '100%', maxHeight: '200px' }}
              />
              <button style={styles.button} onClick={() => uploadTest()}>
                Create Image
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    paddingBottom: '20px',
    width: '100%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItens: 'center',
    justifyContent: 'center',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    padding: 10,
  },
  image: { marginBottom: 15, alignSelf: 'center' },
  input: {
    border: 'none',
    width: '50%',
    alignSelf: 'center',
    backgroundColor: '#ddd',
    marginBottom: 10,
    padding: 8,
    fontSize: 18
  },
  imageName: { fontSize: 20, fontWeight: 'bold' },
  imagePath: { marginBottom: 0 },
  imageOwner: { marginBottom: 0 },
  button: {
    backgroundColor: 'black',
    color: 'white',
    outline: 'none',
    fontSize: 18,
    padding: '12px 0px',
    width: '50%',
    alignSelf: 'center',
  },
  button2: {
    backgroundColor: 'white',
    color: 'black',
    outline: 'none',
    fontSize: 18,
    padding: '12px 0px',
    width: '10%',
    alignSelf: 'center',
  }
};

export default withAuthenticator(App);