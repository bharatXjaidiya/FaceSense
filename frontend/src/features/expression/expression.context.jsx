import { createContext , useState } from "react";


export const ExpressionContext = createContext();

export const ExpressionProvider = ({childern}) =>{
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    return(
    <ExpressionContext.Provider value = {{user,setUser,loading,setLoading}}>
        {childern}
    </ExpressionContext.Provider>
    )
}