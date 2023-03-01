import React, {useCallback, useEffect, useMemo, useState} from 'react';
import { Button, Form, Image, Input, Modal, Spin } from 'antd';
import classnames from "classnames";
import { fetchWithBodyParams } from './Fetch';

const { TextArea } = Input;

interface CreateMessageModalProps {
    onOk: () => void;
    onCancel: () => void;
    visible: boolean;
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

export const CreateMessageModal: React.FC<CreateMessageModalProps> = (props: CreateMessageModalProps) =>  {
    const {visible, onOk, onCancel } = props; 
    const [form] = Form.useForm();

    const onSubmit = async () => { 
        const body = {
            creator: form.getFieldValue("name"),
            message: form.getFieldValue("message"),
        }
        await fetchWithBodyParams(
            "/messages",
            body,
            "POST",
            onOk,
        )
        form.resetFields();
    }

    return (
        <Modal
            title="Create Message"
            open={visible}
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
                <Form.Item label="Your Name" name="name" rules={[{ required: false }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Message" name="message" rules={[{ required: true, message: 'Please enter a message!' }]}>
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