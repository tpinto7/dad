import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { EditOutlined } from '@ant-design/icons';
import css from "./Messages.module.scss";

import { Button, Card, Col, Row, Space, Upload, UploadProps } from "antd";
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

    useEffect(() => { 
        getMessages();
    }, []);

    return <>
        <div className={classnames(css.messagesHeader)} > 
           Messages
            <div className={classnames(css.uploadButton)}>
                <Button onClick={() => setVisible(true)} icon={<EditOutlined />}> Add Message </Button>
            </div>
        </div>
        <div className={classnames(css.messagesWrapper)}>
            <Row>
                {messages.map((message, index) => { 
                    return <Col> <Card size="small" style={{width:400, margin: 5}} title={message.creator} key={index}> 
                        {message.message}
                        </Card>
                    </Col>
                })}
            </Row>
        </div>

        <CreateMessageModal visible={visible} onOk={handleNewMessage} onCancel={() => setVisible(false)}/>

    </>; 
}