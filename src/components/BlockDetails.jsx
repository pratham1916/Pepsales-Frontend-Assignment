import React from 'react';
import { Modal, Card, Typography, Divider, Tag } from 'antd';
import { UserOutlined, FlagOutlined, CalendarOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const { Title, Text } = Typography;

const BlockDetails = ({ visible, blockId, onClose }) => {
    const block = useSelector((state) => state.blocks.blocks[blockId]);

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High':
                return 'red';
            case 'Medium':
                return 'orange';
            case 'Low':
                return 'green';
            default:
                return 'default';
        }
    };

    return (
        <Modal
            visible={visible}
            onCancel={onClose}
            footer={null}
            width={700}
            title="Block Details"
        >
            <Card style={{ borderRadius: 8, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginTop: '20px' }}>
                <Title level={4}>{block.content}</Title>
                <Divider />
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <UserOutlined style={{ marginRight: 8 }} />
                    <Text strong>Assigned To: </Text>
                    <Tag color="purple" style={{ marginLeft: 8 }}>
                        {block.details.assignedTo}
                    </Tag>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <FlagOutlined style={{ marginRight: 8 }} />
                    <Text strong>Priority: </Text>
                    <Tag color={getPriorityColor(block.details.priority)} style={{ marginLeft: 8 }}>
                        {block.details.priority}
                    </Tag>
                </div>
                <Divider />
                <Title level={5}>History</Title>
                <ul>
                    {block.history.map((lane, index) => (
                        <li key={index}>
                            <CalendarOutlined style={{ marginRight: 8 }} />
                            {lane}
                        </li>
                    ))}
                </ul>
            </Card>
        </Modal>
    );
};

export default BlockDetails;
