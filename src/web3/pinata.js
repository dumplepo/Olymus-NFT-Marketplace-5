import axios from 'axios';

const PINATA_API_KEY = "YOUR_PINATA_API_KEY";
const PINATA_SECRET_KEY = "YOUR_PINATA_SECRET_KEY";

export const uploadFileToIPFS = async (file) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    let data = new FormData();
    data.append('file', file);

    const res = await axios.post(url, data, {
        headers: {
            'pinata_api_key': PINATA_API_KEY,
            'pinata_secret_api_key': PINATA_SECRET_KEY,
        }
    });
    return `ipfs://${res.data.IpfsHash}`;
};

export const uploadJSONToIPFS = async (json) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    const res = await axios.post(url, json, {
        headers: {
            'pinata_api_key': PINATA_API_KEY,
            'pinata_secret_api_key': PINATA_SECRET_KEY,
        }
    });
    return `ipfs://${res.data.IpfsHash}`;
};