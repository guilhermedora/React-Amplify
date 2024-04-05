import '@aws-amplify/ui-react/styles.css';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import '../../App.css';
import {
    UploadCard
} from '../../ui-components';
import { Amplify } from 'aws-amplify';
import { getCurrentUser } from 'aws-amplify/auth';
import { motion } from 'framer-motion';
import { uploadData } from 'aws-amplify/storage';
import amplifyconfig from '../../amplifyconfiguration.json';
import { generateClient } from "aws-amplify/api";
import { createImage } from '../../graphql/mutations';

Amplify.configure(amplifyconfig);
const client = generateClient()

export default function UploadImage() {
    const navigate = useNavigate()
    const [fileTest, setFileTest] = useState(null)
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        setFileTest(acceptedFiles[0])
    }, [])
    const {
        getRootProps,
        //  getInputProps,
        //   isDragActive 
    } = useDropzone({ onDrop })

    const transferImage = async () => {
        const res = await getCurrentUser()
        const resUpdt = await uploadDataInBucket()
        if (resUpdt) {
            await createDataImage(res.signInDetails.loginId)
            navigate("/")
        } else {
            console.log("Erro: Falha no upload.");
        }
    }

    const createDataImage = async (UserId) => {
        const imageName = removeImageExtension(fileTest.name)
        try {
            const newImage = await client.graphql({
                query: createImage,
                variables: {
                    input: {
                        "name": imageName,
                        "path": fileTest.name,
                        "owner": UserId
                    }
                }
            });
            console.log("Success: imagem salva", newImage);
        } catch (error) {
            console.log('Error : ', error);
        }
    }

    const uploadDataInBucket = async () => {
        try {
            const result = await uploadData({
                key: fileTest.name,
                data: fileTest,
                options: {
                    accessLevel: 'guest', // defaults to `guest` but can be 'private' | 'protected' | 'guest'
                    // onProgress // Optional progress callback.
                }
            }).result;
            console.log('Succeeded: Imagem salva no bucket', result);
            return true
        } catch (error) {
            console.log('Error : ', error);
            return false
        }
    };

    function removeImageExtension(fileName) {
        // Encontrar a posição do último ponto no nome do arquivo
        const pstPoint = fileName.lastIndexOf('.');
        // Se não houver ponto, retornar o nome do arquivo original
        if (pstPoint === -1) {
            return fileName;
        }
        // Retornar a parte do nome do arquivo antes do último ponto
        return fileName.substring(0, pstPoint);
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
            }}
        >
            <motion.div
                style={styles.box}
                {...getRootProps()}
                initial={{
                    opacity: 0,
                    y: '100%',
                    scale: 1
                }}
                animate={{
                    opacity: 2,
                    y: '0',
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 2,
                    ease: "easeInOut"
                }}
            >
                <UploadCard
                    overrides={{
                        "UploadCard": {
                            marginBottom: '20px'
                        }
                        // "MyIcon5897502": {
                        //     ...getInputProps()
                        // }
                    }}
                />
            </motion.div>
            {fileTest
                ? <>
                    <p style={{ fontSize: '20px' }}>{`Arquivo ${fileTest.name} pronto para upload.`}</p>
                    <button
                        onClick={() => transferImage()}
                        style={{
                            backgroundColor: '#EE432B',
                            marginTop: '10px',
                            marginBottom: '5px',
                            fontSize: '20px'
                        }}
                    >
                        Salvar
                    </button>
                </>
                : <></>
            }
        </div>
    )
}

const styles = {
    div1: {
        width: '100px',
        height: '100px',
        background: 'blue'
    },
    box: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '200px',
        height: '200px',
        borderRadius: '30%',
        background: 'var(--accent)',
        textAlign: 'center',
        color: 'white'
    }
}