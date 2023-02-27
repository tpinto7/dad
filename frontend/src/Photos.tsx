import React, { Children, LegacyRef, useCallback, useEffect, useState } from "react";
import classnames from "classnames";
import { fetchRequest } from "./Fetch";
import { Divider } from "rc-menu";
import 'photoswipe/dist/photoswipe.css'

import { Gallery, Item } from 'react-photoswipe-gallery'


export type Photo = { 
    creator: string, 
    pictureUrl: string,
}

export const Photos: React.FC = () => { 
    const [loading, setLoading] = useState<boolean>(true);
    const [ratios, setRatios]  = useState<number[]>([]);
    const [photos, setPhotos] = useState<Photo[]>([]);
    const getPhotos = () => { 
        fetchRequest(
            "/pictures",
            null, 
            "GET",
            (data: any) => {
                console.log(photos);
                data.pictures.map((picture: any) => { 
                    console.log(picture.pictureUrl.offsetHeight)
                })
                setPhotos(data.pictures)
                setRatios(new Array(data.pictures.length).fill(1));

                setLoading(false);
            }
        );
    }

    const photosRendered = useCallback(() =>  { 
        // console.log("inside rendered")
        // console.log(photos);
        if (photos == null) return;

        return photos.map((photo) => {
            <img src={photo.pictureUrl} />
        });
    }, [getPhotos]);

    const buildUrl = (url: string) => { 
        const result = url.split("/").slice(-1);
        return "https://firebasestorage.googleapis.com/v0/b/celebrating-dad-80058.appspot.com/o/" + result + "?alt=media";
    }

    useEffect(() => { 
        getPhotos();

    }, []);

    const onImageLoad = (input: any, index: number ) => {
        // console.log(img.offsetHeight);
        console.log("inside image load");
        // console.log(input.target);
        console.log(input.target.offsetHeight)
        const cRatios = ratios; 
        cRatios[index] = 3200 * input.target.offsetWidth / input.target.offsetHeight;
        console.log(index);
        console.log(cRatios[index])
        
        // height = input.target
        // console.log(img.offsetWidth);
    }



    return <>
        Photos
        {loading ? <div> Loading ... </div> : 
        <Gallery>
            <div
                style={{
                display: 'grid',
                gridTemplateColumns: '240px 171px 171px',
                gridTemplateRows: '114px 114px',
                gridGap: 12,
                }}
            ></div>
            {photos.map((image, index) => {
                return <Item height={3200} original={buildUrl(image.pictureUrl)}>
                    {({ ref, open }) => (
                    <img style={{height: 220, marginRight: 2, width: 'null'}} onLoad={(input) => onImageLoad(input, index)} ref={ref as React.MutableRefObject<HTMLImageElement>} onClick={open} src={buildUrl(image.pictureUrl)}/>
                )}
                </Item>
            })}
        </Gallery>
        }
        {photosRendered()}
        
        {photos.map((photo) => {
            <div> 
                Hi
            <img src="https://firebasestorage.googleapis.com/v0/b/celebrating-dad-80058.appspot.com/o/0705556f0e3a6b9d4860b99c7ab5076e?alt=media" />
            </div>
        })}
    </>; 
}