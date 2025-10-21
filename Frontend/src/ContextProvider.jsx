import { createContext, useContext, useState } from "react"

const AppContext = createContext()

export const ContextProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [fileId, setFileId] = useState();

    const [path, setPath] = useState("")

    return (
        <AppContext.Provider value={{ isLogin, setIsLogin, fileId, setFileId,path,setPath }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)
