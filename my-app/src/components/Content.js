import React from 'react';

const Content = () => {
  return (
    <div className="text-center text-primary">
      <h1>Hello World!</h1>
      <h2>It is {new Date().toLocaleTimeString()}</h2>
    </div>
  );
}

export default Content;