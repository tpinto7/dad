import React, {useCallback, useEffect, useMemo, useState} from 'react';
import { Button, Form, Image, Input, Modal, Spin } from 'antd';
import classnames from "classnames";
import { fetchWithBodyParams } from './Fetch';

const { TextArea } = Input;

interface CreateMemoryModalProps {
    onOk: () => void;
    onCancel: () => void;
    visible: boolean;
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

export const CreateMemoryModal: React.FC<CreateMemoryModalProps> = (props: CreateMemoryModalProps) =>  {
    const {visible, onOk, onCancel } = props; 
    const [form] = Form.useForm();

    const onSubmit = async () => { 
        const body = {
            title: form.getFieldValue("title"),
            creator: form.getFieldValue("name"),
            description: form.getFieldValue("description"),
        }
        await fetchWithBodyParams(
            "/memories",
            body,
            "POST",
            onOk,
        )
    }

    return (
        <Modal
            title="Create Memory"
            open={visible}
            width={"50%"}
            mask={true}
            onCancel={onCancel}
            footer={null}
        > 
            <Form
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onSubmit}
            >
                <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please enter a title!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Your Name" name="name" rules={[{ required: false }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please enter a description!' }]}>
                    <TextArea />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" style={{marginRight: 5}}>
                    Submit
                    </Button>
                    <Button htmlType="button" onClick={() => form.resetFields()}>
                    Reset
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    ); 
}