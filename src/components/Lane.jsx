import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Card } from 'antd';
import Block from './Block';

const Lane = ({ lane, filteredBlockIds }) => {
  return (
    <Card title={lane.title} className="lane-card">
      {lane.blockIds.filter(blockId => filteredBlockIds.includes(blockId)).map((blockId, index) => (
        <Draggable draggableId={blockId} index={index} key={blockId}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="lane-block"
            >
              <Block blockId={blockId} />
            </div>
          )}
        </Draggable>
      ))}
    </Card>
  );
};

export default Lane;
