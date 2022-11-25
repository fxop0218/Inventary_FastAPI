import { Wrapper } from "./Wrapper"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const ProductCreate = () => {
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const navigate = useNavigate()

    const submit = async (e) => {
        e.preventDefault()

        await fetch("http://localhost:8000/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, price, quantity }),
        })

        await navigate(-1)
    }
    return (
        <Wrapper>
            <form className="mt-3" onSubmit={submit}>
                <div className="form-floatin pb-3">
                    <input
                        className="form-control"
                        placeholder="Product name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="form-floatin pb-3">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Price / Unit"
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>

                <div className="form-floatin pb-3">
                    <input
                        className="form-control"
                        placeholder="Quantity"
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </div>

                <button className="w-100 btn btn-lg btn-primary" type="submit">
                    Submit
                </button>
            </form>
        </Wrapper>
    )
}
