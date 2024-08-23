import { ReactNode } from "react"
import ProtectedRule from "./protectedRule"

const AppLayout = ({children} : {children: ReactNode}) => {
  return <ProtectedRule>{children}</ProtectedRule>
}

export default AppLayout