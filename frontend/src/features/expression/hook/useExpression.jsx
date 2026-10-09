import React , {useContext, useEffect} from 'react'
import { ExpressionContext } from '../expression.context'
import useAuth from "../../auth/hooks/useAuth.jsx"

const useExpression = () => {
    const {loading,setLoading} = useContext(ExpressionContext)

    return (
        {  loading  }
    )
}

export default useExpression
