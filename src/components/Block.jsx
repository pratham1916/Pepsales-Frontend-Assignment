import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Button } from 'antd';
import BlockDetails from './BlockDetails';

const Block = ({ blockId }) => {
    const block = useSelector((state) => state.blocks.blocks[blockId]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const getPriorityClass = (priority) => {
        switch (priority) {
            case 'High':
                return 'high-priority';
            case 'Medium':
                return 'medium-priority';
            case 'Low':
                return 'low-priority';
            default:
                return 'default-priority';
        }
    };

    return (
        <div>
            <Card
                className={`block-card ${getPriorityClass(block.details.priority)}`}
            >
                <h4 className="block-content">{block.content}</h4>
                <Button className="block-button" onClick={() => setIsModalVisible(true)}>View Details</Button>
            </Card>
            <BlockDetails
                visible={isModalVisible}
                blockId={blockId}
                onClose={() => setIsModalVisible(false)}
            />
        </div>
    );
};

export default Block;
