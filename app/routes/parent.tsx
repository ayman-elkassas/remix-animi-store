import { Outlet } from "@remix-run/react";

// Handling your layout in a separate file

const Parent = () => {
  return (
    <div>
      <h1>I am a parent 1</h1>
      <Outlet></Outlet>
    </div>
  );
};

export default Parent;
