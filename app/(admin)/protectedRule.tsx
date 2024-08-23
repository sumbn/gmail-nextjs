import { ReactNode } from "react";

const ProtectedRule = ({children} : {children: ReactNode}  ) => {
  return (
    <div>
      <h1>Protected Rules</h1>
      {children}
    </div>
  )
}

export default ProtectedRule