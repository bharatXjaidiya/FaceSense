import React , {useContext} from 'react'
import { ExpressionContext } from '../expression.context'
import { getMe } from '../../auth/services/auth.api'

const useExpression = () => {
    const {user,loading,setUser,setLoading} = useContext(ExpressionContext)

    const handleGetMe = async() =>{
        setLoading(true)

        const response = await getMe();

        setUser(response.user);

        setLoading(false)
    }
    
    return (
        { user , loading , handleGetMe}
    )
}

export default useExpression
