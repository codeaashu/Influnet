import React from "react";

interface SectionWrappersProps extends React.PropsWithChildren {
  style?: string;
}

function SectionWrappers({ children, style }: SectionWrappersProps) {
  return <div className={`px-2 md:px-20 ${style ?? ""}`}>{children}</div>;
}

export default SectionWrappers;
