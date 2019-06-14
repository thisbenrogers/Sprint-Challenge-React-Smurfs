import React from 'react';
import { Card, CardTitle, CardBody } from 'shards-react';

const Smurf = props => {
  return (
    <Card style={{ width: "400px" }} className="Smurf">
      <CardBody>
        <CardTitle>{props.name}</CardTitle>
        <strong>{props.height} tall</strong>
        <p>{props.age} smurf years old</p>
      </CardBody>
    </Card>
  );
};

Smurf.defaultProps = {
  name: '',
  height: '',
  age: ''
};

export default Smurf;

