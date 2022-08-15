import { useParams } from "@remix-run/react";

const DynamicChild = () => {
  const { someId } = useParams();
  return (
    <div>
      <h1>Dynamic Child {someId}</h1>
    </div>
  );
};

export default DynamicChild;
