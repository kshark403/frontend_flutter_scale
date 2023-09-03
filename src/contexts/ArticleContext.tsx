import React, {useState, createContext} from "react";

type ArticleContextProps = {
    needLoadArticles: boolean
    setNeedLoadArticles: React.Dispatch<React.SetStateAction<boolean>>
}

// Chao: react version is not support, to get rid the error
// https://stackoverflow.com/questions/59106742/typescript-error-property-children-does-not-exist-on-type-reactnode
interface Props {
    children?: React.ReactNode;
}
const ArticleContext = createContext({} as ArticleContextProps)

export const ArticleProvider: React.FC<Props> = ({ children }) => {
    const [needLoadArticles, setNeedLoadArticles] = useState<boolean>(false)
    
    return (
        <ArticleContext.Provider
            value={
                {
                    needLoadArticles, 
                    setNeedLoadArticles
                }
            }
        >
            {children}
        </ArticleContext.Provider>
    )
}

export default ArticleContext