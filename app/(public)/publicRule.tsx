import { ReactNode } from "react";

const PublicRule = ({children} : {children: ReactNode}  ) => {
  return (
    <div>
      <h1>Public rules</h1>
      {children}
    </div>
  )
}

export default PublicRule