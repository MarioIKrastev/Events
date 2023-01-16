import { useCookies } from "react-cookie"
import Btn from "../buttons/Btn"

export default function Board() {
   /* eslint-disable no-unused-vars,no-empty-pattern*/ 
  const [_, { }, removeCookie] = useCookies(['Bearer']);

  const signOut = () => {
    removeCookie('Bearer');
    window.location.reload();
  }

  return (
    <Btn text='Log Out' onClick={signOut} />
  )
}
