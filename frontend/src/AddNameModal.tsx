import React, {useCallback, useEffect, useMemo, useState} from 'react';
import { Button, Form, Image, Input, Modal, Spin } from 'antd';
import classnames from "classnames";
import { fetchWithBodyParams } from './Fetch';

const { TextArea } = Input;

interface AddNameModalProps {
    onOk: () => void;
    onCancel: () => void;
    visible: boolean;
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

export const AddNameModal: React.FC<AddNameModalProps> = (props: AddNameModalProps) =>  {
    const {visible, onOk, onCancel } = props; 
    const [form] = Form.useForm();

    const onSubmit = async () => { 
        const body = {
            name: form.getFieldValue("name"),
        }
        await fetchWithBodyParams(
            "/names",
            body,
            "POST",
            onOk,
        )
        form.resetFields();
    }

    return (
        <Modal
            title="Add Your Name"
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
                <Form.Item label="Name" name="name" rules={[{ required: false }]}>
                    <Input />
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