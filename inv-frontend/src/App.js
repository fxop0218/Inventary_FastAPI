import logo from "./logo.svg"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Products } from "./components/Products"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Products />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
