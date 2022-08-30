import type { PlasmoContentScript } from "plasmo"

export const config: PlasmoContentScript = {
  matches: ["https://github.com/*"]
}

export const getMountPoint = async () => document.querySelector("#repository-container-header")

const App = () => {
  return (
    <span
      style={{
        background: "white",
        color: 'blue',
        padding: 12
      }}>
      HELLO WORLD
    </span>
  )
}

export default App