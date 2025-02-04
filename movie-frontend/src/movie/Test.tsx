import {useState} from "react";
import axios from "axios";

export function Test() {
    const [imageName, setImageName] = useState('');
    const [imageSrc, setImageSrc] = useState('');

    const handleImageNameChange = (event) => {
        setImageName(event.target.value);
    };

    const handleViewImage = () => {
        axios.get(`http://localhost:8080/api/test/upload/${imageName}`, {
            responseType: 'arraybuffer'
        })
            .then((response) => {
                const base64 = btoa(
                    new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
                );
                setImageSrc(`data:image/jpeg;base64,${base64}`);
            })
            .catch((error) => {
                console.error('Error fetching image:', error);
            });
    };
    return (
        <>
            <div>
                <input type="text" value={imageName} onChange={handleImageNameChange} placeholder="Enter image name"/>
                <button onClick={handleViewImage}>View Image</button>
                {imageSrc && <img src={imageSrc} alt="Uploaded"/>}
            </div>
        </>
    )
}