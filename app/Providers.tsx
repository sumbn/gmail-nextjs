"use client"
import {SessionProvider} from "next-auth/react";
import { ReactNode } from "react";
import { SnackbarProvider } from "notistack";

// type ProviderProps = {
//     children: React.ReactNode;
// }

interface Props {
    children: ReactNode
}

const Providers = ({ children }: Props) => {
    return(
    <SessionProvider>
        <SnackbarProvider maxSnack={3} autoHideDuration={1000} anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'}}>
        {children}
        </SnackbarProvider>
    </SessionProvider>)
}

export default Providers;