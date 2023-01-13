import { useMutation } from "react-query"
import axios from 'axios'

export const useAuthMutation = (prop) => {
    return useMutation(async (payload) => {
        return await axios.post(`http://localhost:3030/auth/local/${prop}`, payload)
    })

}