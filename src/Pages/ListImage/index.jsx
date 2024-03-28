import '@aws-amplify/ui-react/styles.css';
import { useState, useEffect } from 'react';
import '../../App.css';
import { listImages } from '../../graphql/queries';
import {
    MyIcon
} from '../../ui-components';
import { generateClient } from "aws-amplify/api";
import { getUrl } from 'aws-amplify/storage';
import { deleteImage } from '../../graphql/mutations';

const client = generateClient();

export default function ListImage() {
    const [images, setImages] = useState([]);
    const [fullImageData, setFullImageData] = useState([])
    const [toggleRefresh, setToggleRefresh] = useState(false)

    useEffect(() => {
        setFullImageData([])
        fetchImages();
    }, [toggleRefresh]);

    useEffect(() => {
        if (fullImageData.length > 0) return
        updtImgDataWithUrl()
        // eslint-disable-next-line
    }, [images])

    async function updtImgDataWithUrl() {
        const objectsWithUrl = await addUrlToObjects(images, teste2);
        setFullImageData(objectsWithUrl)
    }

    async function addUrlToObjects(array, fetchFunction) {
        const newArray = await Promise.all(array.map(async obj => {
            try {
                const url = await fetchFunction(obj.path);
                return { ...obj, url };
            } catch (error) {
                console.error('Erro ao processar objeto:', obj, error);
                return obj;
            }
        }));

        return newArray;
    }

    async function fetchImages() {
        try {
            const imageData = await client.graphql({
                query: listImages
            });
            let images = imageData.data.listImages.items;
            setImages(images);
        } catch (err) {
            console.log('error fetching images');
        }
    }

    async function teste2(imgName) {
        try {
            const result = await getUrl({
                key: imgName,
                options: { level: 'guest' }
            });
            return result.url.href
        } catch (error) {
            console.log('Error ', error);
        }
    }

    async function delImgFromGraphicL(Id) {
        await client.graphql({
            query: deleteImage,
            authMode: 'apiKey',
            variables: { input: { id: Id } }
        });
        setToggleRefresh(!toggleRefresh)
    }

    return (
        <div style={styles.container}>
            <h2>Lista de imagens</h2>
            <div style={styles.image}>
                {fullImageData?.map((image, index) => (
                    <div key={index} style={styles.card}>
                        <MyIcon
                            type='delete'
                            position={'absolute'}
                            right={.1}
                            onClick={() => delImgFromGraphicL(image.id)}
                        />
                        <img src={image.url} alt="Imagem do Card" style={styles.cardImage} />
                        <div style={styles.cardContent}>
                            <h2 style={styles.cardTitle}>{image.name}</h2>
                            <p style={styles.cardDescription}>{image.path}</p>
                            <p style={styles.cardAdditionalInfo}>{image.owner}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '20px',
        gap: '30px',
        minHeight: '100vh',
        backgroundColor: '#242424'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: 'black',
        padding: 10,
    },
    image: {
        display: 'flex',
        marginBottom: 15,
        flexWrap: 'wrap',
        gap: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
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
    },
    card: {
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        // background: 'white',
        width: '300px',
        height: '300px',
        margin: '20px',
        position: 'relative'
    },
    cardImage: {
        width: '30%',
        height: '30%',
        // objectFit: 'cover'
    },
    cardContent: {
        padding: '20px'
    },
    cardTitle: {
        fontSize: '1.5rem',
        marginBottom: '10px'
    },
    cardDescription: {
        fontSize: '1rem',
        marginBottom: '10px'
    },
    cardAdditionalInfo: {
        fontSize: '0.9rem',
        color: '#666666'
    }
};