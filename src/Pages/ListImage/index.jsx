import '@aws-amplify/ui-react/styles.css';
import { generateClient } from "aws-amplify/api";
import { downloadData, getUrl } from 'aws-amplify/storage';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import { deleteImage } from '../../graphql/mutations';
import { listImages } from '../../graphql/queries';
import { MyIcon } from '../../ui-components';

const client = generateClient();

export default function ListImage() {
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [fullImageData, setFullImageData] = useState([]);
    const [toggleRefresh, setToggleRefresh] = useState(false);

    useEffect(() => {
        setFullImageData([])
        handleListImages()
        // eslint-disable-next-line
    }, [toggleRefresh])

    useEffect(() => {
        if (fullImageData.length > 0) return
        updtImgDataWithUrl()
        // eslint-disable-next-line
    }, [images])

    async function updtImgDataWithUrl() {//Atualiza a informação das imagens com os seus URL's
        const objectsWithUrl = await addUrlToObjects(images, handleImageUrl);
        setFullImageData(objectsWithUrl)
    }

    async function handleListImages() {//Baixa a lista de imagens disponíveis
        try {
            const imageData = await client.graphql({
                query: listImages
            })
            let images = imageData.data.listImages.items
            setImages(images)
        } catch (err) {
            console.log('error fetching images')
        }
    }

    async function addUrlToObjects(array, handleImageUrl) {//Concatena as URL da S3 com as informações das imagens
        const newArray = await Promise.all(array.map(async obj => {
            try {
                const url = await handleImageUrl(obj.path)
                return { ...obj, url }
            } catch (error) {
                console.error('Erro ao processar objeto:', obj, error)
                return obj
            }
        }))

        return newArray
    }

    async function handleImageUrl(imgName) {//Baixa URL do TIFF no bucket S3
        try {
            const result = await getUrl({
                key: imgName,
                options: { level: 'guest' }
            })
            return result.url.href
        } catch (error) {
            console.log('Error ', error)
        }
    }

    async function delImgFromGraphicL(Id) {//Deleta registro da imagem no banco
        await client.graphql({
            query: deleteImage,
            authMode: 'apiKey',
            variables: { input: { id: Id } }
        })
        setToggleRefresh(!toggleRefresh)
    }

    async function loadingPreview(name) {//Baixa o file respectivo em blob e envia para página "/preview"
        try {
            const downloadResult = await downloadData({ key: name }).result;
            const blob = await downloadResult.body.blob();
            navigate('/preview', {
                state: { imageData: blob }
            })
        } catch (error) {
            console.log('Error : ', error)
        }
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
                            top={10}
                            right={10}
                            onClick={() => delImgFromGraphicL(image.id)}
                        />
                        <MyIcon
                            type='preview'
                            position={'absolute'}
                            right={55}
                            top={10}
                            onClick={() => loadingPreview(image.path)}
                        />
                        {/* <img
                            src={image.url}
                            alt="Imagem do Card"
                            style={styles.cardImage}
                        /> */}
                        <div style={styles.cardContent}>
                            <h2 style={styles.cardTitle}>{`${image.name}`}</h2>
                            <p style={styles.cardDescription}>{`Arquivo ${image.path}`}</p>
                            <p style={styles.cardAdditionalInfo}>{`Criado por ${image.owner}`}</p>
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        boxShadow: '0px 0px 4px 8px #EE432B',
        overflow: 'hidden',
        // background: 'white',
        padding: '15px',
        width: '300px',
        height: '300px',
        margin: '20px',
        position: 'relative'
    },
    cardImage: {
        width: '50%',
        height: '50%',
        borderRadius: '10%'
        // objectFit: 'cover'
    },
    cardContent: {
        // padding: '20px',
        // justifyContent: 'center'
    },
    cardTitle: {
        fontSize: '1.5rem',
        marginBottom: '10px',
        width: '100%'
    },
    cardDescription: {
        fontSize: '1rem',
        marginBottom: '10px',
        width: '100%'
    },
    cardAdditionalInfo: {
        fontSize: '0.9rem',
        color: '#666666',
        width: '100%'
    }
};