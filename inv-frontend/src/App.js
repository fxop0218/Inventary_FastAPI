import logo from "./logo.svg"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Products } from "./components/Products"
import { ProductCreate } from "./components/ProductCreate"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Products />} />
                <Route path="/create" element={<ProductCreate />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
