// React & Redux related
import React from 'react'
import {useSelector} from 'react-redux'
// Material UI related
import Snackbar from './Snackbar'
import TextFieldsForm from './TextFieldsForm'

export const Signup = () => {
  const user = useSelector(state => state.user)
  return (
    <div>
      {(user && user.message) ? <Snackbar message={user.message} severity="error" /> : <></>}
      <TextFieldsForm button="Sign Up" color="red" />
    </div>
  )
}

export default Signup