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
            <div
                {...getRootProps()}
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
                >
                </UploadCard>
            </div>
            {fileTest
                ? <>
                    <p>{`Arquivo ${fileTest.name} pronto para upload.`}</p>
                    <button
                        onClick={() => transferImage()}
                        style={{
                            backgroundColor: '#EE432B',
                            marginTop: '10px',
                            marginBottom: '5px'
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