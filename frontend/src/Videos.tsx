import React, { Children, LegacyRef, useCallback, useEffect, useState } from "react";
import classnames from "classnames";
import { fetchRequest } from "./Fetch";
import { LeftOutlined, RightOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Carousel, Upload, UploadProps } from "antd";
// import { Carousel } from "react-responsive-carousel";
import { Divider } from "rc-menu";
import 'photoswipe/dist/photoswipe.css'
import css from "./Photos.module.scss";
import { Gallery, Item } from 'react-photoswipe-gallery'
import ReactPlayer from "react-player";

import "./Videos.scss";

export type Photo = { 
    creator: string, 
    pictureUrl: string,
};

export const Videos: React.FC = () => { 
    const [loading, setLoading] = useState<boolean>(true);
    const [ratios, setRatios]  = useState<number[]>([]);
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [isPlaying, setIsPlaying] = useState<boolean>(true);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const getPhotos = () => { 
        fetchRequest(
            "/pictures/videos",
            null, 
            "GET",
            (data: any) => {
                setPhotos(data.videos)
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
        const split = url.split("/").slice(-1);
        const result = "https://firebasestorage.googleapis.com/v0/b/celebrating-dad-80058.appspot.com/o/" + split + "?alt=media";
        console.log(result);
        return result;
    }

    useEffect(() => { 
        getPhotos();
    }, []);

    const onImageLoad = (input: any, index: number ) => {

        const cRatios = ratios; 
        cRatios[index] = input.target.offsetWidth / input.target.offsetHeight;
        setRatios(cRatios);
        // console.log(cRatios[index]);
        // console.log(index);
        // height = input.target
        // console.log(img.offsetWidth);
    }
    const uploadPhotoRequest = async (options: any) => { 
        const { file } = options; 
        const data = new FormData(); 
        data.append('file', file);
        fetchRequest(
            "/pictures/videos",
            data,
            "POST",
            () => { 
                getPhotos()
            }
        );
    }

    const uploadProps: UploadProps = { 
        accept: ".jpg,.png,.jpeg",
        showUploadList: false, 
        customRequest: uploadPhotoRequest
    }

    const onBeforeChange = (pswpInstance: any) => {
        pswpInstance.on('change', async () => {
            // console.log('slide was changed')
            // console.log(pswpInstance);
            // console.log(pswpInstance.currSlide.data.element.offsetWidth);
            // console.log(pswpInstance.currSlide.data.element.offsetHeight);

            const ratio = pswpInstance.currSlide.data.element.offsetWidth / pswpInstance.currSlide.data.element.offsetHeight;
            // console.log(ratio);
            // console.log(pswpInstance.viewportSize.y * ratio);
            pswpInstance.viewportSize.x = pswpInstance.viewportSize.y * ratio; 

            await pswpInstance.updateSize();
          });   
    }

    const isVideoPlaying = React.useCallback((index: number) => { 
        console.log()
        return index === activeIndex && isPlaying;
    }, [activeIndex, isPlaying]);



    return <>
        <div className={classnames(css.photoHeader)} > 
            Video  Gallery 
            <div className={classnames(css.uploadButton)}>
                <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}> Add Photo </Button>
            </Upload>
            </div>
        </div>
        <div className={classnames(css.galleryWrapper)}>
            <Carousel arrows prevArrow={<LeftOutlined />} nextArrow={<RightOutlined />} beforeChange={(from, to) => setIsPlaying(false)} afterChange={(current) => { console.log(current); setActiveIndex(current)} }>
            {photos.map((image, index) => {
                // width
                    
                    return <div key={index}><ReactPlayer onPause={() => setIsPlaying(false)} playing={isVideoPlaying(index)} controls={true} height={400} width={"null"} loop={true} url={buildUrl(image.pictureUrl)}/> </div>
            })}
            </Carousel>
        </div>
        
    </>; 
}