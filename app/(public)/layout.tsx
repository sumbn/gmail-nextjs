import { ReactNode } from "react";
import PublicRule from "./publicRule";

const AppLayout = ({children} : {children: ReactNode}) => {
  return <PublicRule>{children}</PublicRule>
}

export default AppLayout