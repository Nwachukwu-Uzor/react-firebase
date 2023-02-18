import React from "react";

interface Props {
  children?: React.ReactNode;
}

const Container: React.FC<Props> = ({ children }) => {
  return (
    <section className="w-[90%] max-w-[800px] mx-auto my-10">
      {children}
    </section>
  );
};

export default Container;
