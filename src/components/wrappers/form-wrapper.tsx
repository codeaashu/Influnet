import React from "react";

interface FormWrapperProps extends React.PropsWithChildren {}

function FormWrapper({ children }: FormWrapperProps) {
  return (
    <div className="flex min-h-[85vh] flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">{children}</div>
    </div>
  );
}

export default FormWrapper;
