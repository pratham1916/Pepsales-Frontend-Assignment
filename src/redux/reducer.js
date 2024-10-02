import { message } from 'antd';

const initialState = {
  lanes: {
    'lane-1': { id: 'lane-1', title: 'To Do', blockIds: ['block-1', 'block-2', 'block-3'] },
    'lane-2': { id: 'lane-2', title: 'In Progress', blockIds: ['block-8', 'block-7'] },
    'lane-3': { id: 'lane-3', title: 'Completed', blockIds: ['block-4', 'block-5'] },
    'lane-4': { id: 'lane-4', title: 'On Hold', blockIds: ['block-6'] },
  },
  blocks: {
    'block-1': { id: 'block-1', content: 'Design the home page UI', history: ['To Do'], details: { assignedTo: 'Pratham Nemade', priority: 'High' } },
    'block-2': { id: 'block-2', content: 'Set up project repository', history: ['To Do'], details: { assignedTo: 'Amit Pandey', priority: 'Medium' } },
    'block-3': { id: 'block-3', content: 'Develop login functionality', history: ['To Do'], details: { assignedTo: 'Rohit Diwate', priority: 'High' } },
    'block-4': { id: 'block-4', content: 'Create database schema', history: ['To Do', 'In Progress', 'Completed'], details: { assignedTo: 'Krunal Bhandekar', priority: 'Medium' } },
    'block-5': { id: 'block-5', content: 'Prepare project documentation', history: ['To Do', 'In Progress', 'Completed'], details: { assignedTo: 'Hitesh Kadukar', priority: 'Low' } },
    'block-6': { id: 'block-6', content: 'Implement user registration flow', history: ['To Do', 'On Hold'], details: { assignedTo: 'Akash Yadav', priority: 'High' } },
    'block-7': { id: 'block-7', content: 'Develop the settings page', history: ['To Do', 'In Progress'], details: { assignedTo: 'Bhavesh Pandey', priority: 'Medium' } },
    'block-8': { id: 'block-8', content: 'Test deployment pipeline', history: ['To Do', 'In Progress'], details: { assignedTo: 'Sunny Rajput', priority: 'Low' } },
  },
  filters: {},
  allowedMovements: {
    'lane-1': ['lane-2', 'lane-4'],
    'lane-2': ['lane-3', 'lane-1'],
    'lane-3': ['lane-4'],
    'lane-4': ['lane-1'],
  },
};

const blockReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MOVE_BLOCK':
      const { sourceLaneId, destinationLaneId, blockId, additionalData } = action.payload;
      if (!state.allowedMovements[sourceLaneId]?.includes(destinationLaneId)) {
        message.warning('Movement not allowed!');
        return state;
      }
      const updatedSourceLane = {
        ...state.lanes[sourceLaneId],
        blockIds: state.lanes[sourceLaneId].blockIds.filter(id => id !== blockId),
      };
      const updatedDestinationLane = {
        ...state.lanes[destinationLaneId],
        blockIds: [...state.lanes[destinationLaneId].blockIds, blockId],
      };
      const updatedBlock = {
        ...state.blocks[blockId],
        history: [...state.blocks[blockId].history,state.lanes[destinationLaneId].title],
        details: { ...state.blocks[blockId].details, ...additionalData },
      };
      message.success('Block moved successfully!');
      return {
        ...state,
        lanes: {
          ...state.lanes,
          [sourceLaneId]: updatedSourceLane,
          [destinationLaneId]: updatedDestinationLane,
        },
        blocks: {
          ...state.blocks,
          [blockId]: updatedBlock,
        },
      };
    default:
      return state;
  }
};

const filterReducer = (state = initialState.filters, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const getFilteredBlocks = ({ blocks, filters }) => {
  const { assignedTo, priority } = filters;
  return Object.values(blocks).filter(block => {
    const matchesAssignedTo = !assignedTo || block.details.assignedTo === assignedTo;
    const matchesPriority = !priority || block.details.priority === priority;
    return matchesAssignedTo && matchesPriority;
  });
};

export { blockReducer, filterReducer, getFilteredBlocks };