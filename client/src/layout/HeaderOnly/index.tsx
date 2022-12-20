import { FC, ReactNode } from "react";
import Header from "../component/header";

interface HeaderOnlyProps {
    children: ReactNode
}

const HeaderOnly:FC<HeaderOnlyProps> = ({children}) => {
    return (  
        <Header>
            {children}
        </Header>
    );
}
 
export default HeaderOnly;