import { useEffect, useState } from "react";
import {useAccount, useContract, useProvider, erc721ABI} from "wagmi";
import styles from "../styles/Listing.module.css";
import {formatEther} from "ethers/lib/utils";

export default function Listing(props) {
    const [imageURI, setImageURI] = useState("");
    const [name, setName] = useState("");

    const [loading, setLoading] = useState(true);

    const provider = useProvider();
    const {address} = useAccount();
    const ERC721Contract = useContract({
        address: props.nftAddress,
        abi: erc721ABI,
        signerOrProvider: provider,
    });

    const isOwner = address.toLocaleLowerCase() === props.seller.toLocaleLowerCase();

    async function fetchNFTDEtails() {
        try{
            let tokenURI = await ERC721Contract.tokenURI(0);
            tokenURI = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");

            const metadata= await fetch(tokenURI);
            const metadataJSON = await metadata.json();

            let image = metadataJSON.imageUrl;

            image = image.replace("ipfs://", "https://ipfs.io/ipfs/");

            setName(metadataJSON.name);
            setImageURI(image);
            setLoading(false);
        } catch (e) {
            console.error(e);
            setLoading(false);
        }
    }


    useEffect(() => {
        fetch();
    }, []);

    return (
        <div>
            {loading? (
                <span>Loading...</span>
            ): (
                <div className={styles.card}>
                    <img src={imageURI} />
                    <div className={styles.container}>
                        <span>
                            <b>
                                {name} - #{props.tokenId}
                            </b>
                        </span>
                        <span>Price: {formatEther(props.price)} CELO</span>
                        <span>
                            Seller: {isOwner? "You" : props.seller.substring(0,6) + "..."}
                        </span>
                    </div>


                </div>
            )}
        </div>
    );

}