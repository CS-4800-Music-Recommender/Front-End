import { createContext } from "react"

export const context = createContext();
const contextProvider = () => {
  return (
    <div>contextProvider</div>
  )
}

export default contextProvider