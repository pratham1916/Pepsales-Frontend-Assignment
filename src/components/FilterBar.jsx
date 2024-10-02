import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input, Select, Button, Row, Col } from 'antd';

const { Option } = Select;

const FilterBar = () => {
  const [assignedTo, setAssignedTo] = useState('');
  const [priority, setPriority] = useState('');
  const dispatch = useDispatch();

  const handleFilter = () => {
    dispatch({
      type: 'SET_FILTER',
      payload: {
        assignedTo: assignedTo.trim() || '',
        priority: priority || '',
      },
    });
  };

  return (
    <div className="filter-bar">
      <Row gutter={16}>
        <Col xs={24} sm={8}>
          <Input
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            placeholder="Assigned To"
            className="filter-input"
          />
        </Col>
        <Col xs={24} sm={8}>
          <Select
            value={priority}
            onChange={(value) => setPriority(value)}
            placeholder="Priority"
            className="filter-select"
          >
            <Option value="">All</Option>
            <Option value="High">High</Option>
            <Option value="Medium">Medium</Option>
            <Option value="Low">Low</Option>
          </Select>
        </Col>
        <Col xs={24} sm={8}>
          <Button
            type="primary"
            onClick={handleFilter}
            className="filter-button"
          >
            Apply Filter
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default FilterBar;
