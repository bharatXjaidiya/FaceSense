import React , {useContext} from 'react'
import { useNavigate , Navigate } from 'react-router'
import { AuthContext } from '../auth.context'

const ProtectedComponent = ({children}) => {
    const {user,loading} = useContext(AuthContext)


    if(loading){
        return <h1>Loading...</h1>
    }

    if(!user){
        return <Navigate to="/login" />
    }

  return children

}

export default ProtectedComponent
