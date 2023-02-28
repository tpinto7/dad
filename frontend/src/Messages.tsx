import React, { useState } from "react";
import classnames from "classnames";
import { UploadOutlined } from '@ant-design/icons';
import css from "./Messages.module.scss";

import { Button, Upload, UploadProps } from "antd";
import { CreateMessageModal } from "./CreateMessageModal";
import { fetchRequest } from "./Fetch";

export type Message = { 
    creator: string, 
    message: string,
};

export const Messages: React.FC = () => { 
    const [messages, setMessages] = useState<Message[]>([]);
    const [visible, setVisible] = useState<boolean>(false);

    const getMessages = async () => { 
        await fetchRequest(
            "/messages",
            null, 
            "GET",
            (data: any) => {
                setMessages(data.messages)
            }
        );
    }

    const handleNewMessage = () => { 
        setVisible(false);
        getMessages();
    }


    return <>
        <div className={classnames(css.messagesHeader)} > 
           Messages
            <div className={classnames(css.uploadButton)}>
                <Button onClick={() => setVisible(true)} icon={<UploadOutlined />}> Add Message </Button>
            </div>
        </div>

        <CreateMessageModal visible={visible} onOk={handleNewMessage} onCancel={() => setVisible(false)}/>

    </>; 
}