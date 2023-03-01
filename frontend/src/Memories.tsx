import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { EditOutlined } from '@ant-design/icons';
import css from "./Memories.module.scss";

import { Button, Collapse, Upload, UploadProps } from "antd";
import { fetchRequest } from "./Fetch";
import { CreateMemoryModal } from "./CreateMemoryModal";
const { Panel } = Collapse;

export type Memory = { 
    creator: string, 
    title: string, 
    description: string,
};

export const Memories: React.FC = () => { 
    // const [loading, setLoading] = useState<boolean>(true);
    const [memories, setMemories] = useState<Memory[]>([]);
    const [visible, setVisible] = useState<boolean>(false);
    const getMemories = async () => { 
        await fetchRequest(
            "/memories",
            null, 
            "GET",
            (data: any) => {
                setMemories(data.memories)
            }
        );
    }

    const handleNewMemory = () => { 
        setVisible(false);
        getMemories();
    }

    useEffect(() => { 
        getMemories();
    }, []);
    
    return <>
        <div className={classnames(css.memoriesHeader)} > 
           Memories
            <div className={classnames(css.uploadButton)}>
                <Button onClick={() => setVisible(true)} icon={<EditOutlined />}> Add Memory </Button>
            </div>
        </div>
        <div className={classnames(css.memoriesSynopsis)}>
            Feel free to add a memory where Neil inspired you, made you happy, or captured the spirit that he is. 
        </div> 
        <Collapse>
            {memories.map((memory, index) =>  {
                return <Panel 
                        header={<div>
                            <b>{memory.title} </b>
                            <span className={classnames(css.memoryCreator)}>by {memory.creator} </span>
                        </div>}
                        key={index}>
                        <p>{memory.description}</p>
                </Panel>
            })}
        </Collapse>
        <CreateMemoryModal visible={visible} onOk={handleNewMemory} onCancel={() => setVisible(false)}/>
    </>; 
}