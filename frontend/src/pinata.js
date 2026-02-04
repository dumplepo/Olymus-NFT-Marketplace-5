import axios from "axios";

/**
 * Upload a FILE (image) to Pinata IPFS
 * @param {File} file
 * @returns {Promise<string>} ipfs://CID
 */
export const uploadFileToIPFS = async (file) => {
  try {
    if (!file) throw new Error("No file provided");

    const jwt = import.meta.env.VITE_PINATA_JWT;
    if (!jwt) throw new Error("Pinata JWT not found in .env");

    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "multipart/form-data"
        }
      }
    );

    return `ipfs://${res.data.IpfsHash}`;
  } catch (error) {
    console.error("Pinata file upload failed:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Upload METADATA JSON to Pinata IPFS
 * @param {Object} json
 * @returns {Promise<string>} ipfs://CID
 */
export const uploadJSONToIPFS = async (json) => {
  try {
    const jwt = import.meta.env.VITE_PINATA_JWT;
    if (!jwt) throw new Error("Pinata JWT not found in .env");

    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      json,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json"
        }
      }
    );

    return `ipfs://${res.data.IpfsHash}`;
  } catch (error) {
    console.error("Pinata JSON upload failed:", error.response?.data || error.message);
    throw error;
  }
};
