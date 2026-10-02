import React , {useContext} from 'react'
import { ExpressionContext } from '../expression.context'

const useExpression = () => {
    const {user,loading,setUser,setLoading} = useContext(ExpressionContext)


    
    return (
        { user , loading }
    )
}

export default useExpression
