import React, { useState } from 'react';

function Counter({ callback }: { callback: (count: number) => number }) {
  const [count, set_count] = useState(0);
  return (
    <div>
      <h1>Counter : {count} </h1>
      <button onClick={() => set_count(count + 1)}>Increment</button>
      <button onClick={() => callback(count)}>callback</button>
    </div>
  );
}

export default Counter;
