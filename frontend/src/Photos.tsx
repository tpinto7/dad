import React, { Children, LegacyRef, useCallback, useEffect, useState } from "react";
import classnames from "classnames";
import { fetchRequest } from "./Fetch";
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, UploadProps } from "antd";
import { Divider } from "rc-menu";
import 'photoswipe/dist/photoswipe.css'
import css from "./Photos.module.scss";
import { Gallery, Item } from 'react-photoswipe-gallery'


export type Photo = { 
    creator: string, 
    pictureUrl: string,
};

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
            "/pictures",
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



    return <>
        <div className={classnames(css.photoHeader)} > 
            Photo Gallery 
            <div className={classnames(css.uploadButton)}>
                <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}> Add Photo </Button>
            </Upload>
            </div>
        </div>
        {loading ? <div> Loading ... </div> : 
        <div className={classnames(css.galleryWrapper)}>
            <Gallery>
                {photos.map((image, index) => {
                    // width
                    return <Item width={700} height={800} original={buildUrl(image.pictureUrl)}>
                        {({ ref, open }) => (
                        <img style={{cursor: 'pointer', objectFit: 'cover', height: 240, marginRight: 2, width: 'null'}} onLoad={(input) => onImageLoad(input, index)} ref={ref as React.MutableRefObject<HTMLImageElement>} onClick={open} src={buildUrl(image.pictureUrl)}/>
                    )}
                    </Item>
                })}
            </Gallery>
        </div>
        }
    </>; 
}