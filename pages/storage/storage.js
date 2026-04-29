import axios from "axios";

export const uploadToPinata = async (file) => {
    // api keys
    const pinataApiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY;
    const pinataSecretApiKey = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY;

    if (!pinataApiKey || !pinataSecretApiKey) {
        throw new Error("Pinata API key not found");
    }

    // image file
    const imageData = new FormData();
    imageData.append("file", file.image);

    
    const pinataMetadata = JSON.stringify({
        name: `${file.name}_image`,
    });
    imageData.append("pinataMetadata", pinataMetadata);

    try {
        const imageRes = await axios.post(
            "https://api.pinata.cloud/pinning/pinFileToIPFS",
            imageData,
            {
                headers: {
                    pinata_api_key: pinataApiKey,
                    pinata_secret_api_key: pinataSecretApiKey,
                },
            }
        );

        const imageHash = imageRes.data.IpfsHash;
        const imageURL = `https://gateway.pinata.cloud/ipfs/${imageHash}`;

        // metadata for all cards
        const metadata = {
            name: file.name,
            description: `A custom card with rarity: ${file.rarity}`,
            image: imageURL,
            attributes: [
                { trait_type: "Rarity", value: file.rarity },
                { trait_type: "Price", value: file.price }
            ]
        };

        const jsonRes = await axios.post(
            "https://api.pinata.cloud/pinning/pinJSONToIPFS",
            metadata,
            {
                headers: {
                    "Content-Type": "application/json",
                    pinata_api_key: pinataApiKey,
                    pinata_secret_api_key: pinataSecretApiKey,
                },
            }
        );

        return `https://gateway.pinata.cloud/ipfs/${jsonRes.data.IpfsHash}`;

    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        throw error;
    }
};