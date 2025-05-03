import React from "react";

interface SectionWrappersProps extends React.PropsWithChildren {
  style?: string;
}

function InfluencerManagementWrapper({
  children,
  style,
}: SectionWrappersProps) {
  return <div className={`p-3 md:p-12 ${style ?? ""} w-full`}>{children}</div>;
}

export default InfluencerManagementWrapper;
