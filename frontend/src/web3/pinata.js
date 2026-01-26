import axios from 'axios';

const PINATA_API_KEY = "e4b47f7a45965efc2def";
const PINATA_SECRET_KEY = "e8daf82a90bfa39d751ad2e88bf7e1a8d12560883af983a3fc91abfdd2e505e5";

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