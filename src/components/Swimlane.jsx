import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';
import Lane from './Lane';
import FilterBar from './FilterBar';
import { getFilteredBlocks } from '../redux/reducer';

const Swimlane = () => {
  const lanes = useSelector((state) => state.blocks.lanes);
  const blocks = useSelector((state) => state.blocks.blocks);
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const filteredBlockIds = getFilteredBlocks({ blocks, filters }).map(block => block.id);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    dispatch({
      type: 'MOVE_BLOCK',
      payload: {
        blockId: draggableId,
        sourceLaneId: source.droppableId,
        destinationLaneId: destination.droppableId,
      },
    });
  };

  return (
    <div>
      <FilterBar />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="swimlane-container">
          {Object.values(lanes).map((lane) => (
            <Droppable droppableId={lane.id} key={lane.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`swimlane-lane ${snapshot.isDraggingOver ? 'dragging' : ''}`}
                >
                  <Lane lane={lane} filteredBlockIds={filteredBlockIds} />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Swimlane;
