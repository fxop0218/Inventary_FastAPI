import { useEffect, useState } from "react"
export const Orders = () => {
    const [id, setProductId] = useState("")
    const [quantity, setQuantity] = useState(0)
    const [msg, setMsg] = useState("Buy a product")

    useEffect(() => {
        ;(async () => {
            try {
                if (id) {
                    const response = await fetch(`http://localhost:8000/products/${id}`)
                    const content = await response.json()
                    setMsg(`Product price is ${content.price} €`)
                }
            } catch (e) {
                setMsg("Buy a product")
            }
        })()
    }, [id])

    const submit = async (e) => {
        e.preventDefault()

        await fetch("http://localhost:8000/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, quantity }),
        })
        setMsg("Thanks for your order!!")
    }
    return (
        <div className="container">
            <main>
                <div className="py-5 text-center">
                    <h2>Checkout</h2>
                    <p className="lead">{msg}</p>
                </div>

                <form onSubmit={submit}>
                    <div className="row g-3">
                        <div className="col-sm-6">
                            <input
                                className="form-control"
                                placeholder="Product id"
                                onChange={(e) => setProductId(e.target.value)}
                            />
                        </div>

                        <div className="col-sm-6">
                            <input
                                className="form-control"
                                placeholder="Quantity"
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </div>
                    </div>
                    <hr className="my-4" />
                    <button className="w-100 btn btn-primary btn-lg">Buy</button>
                </form>
            </main>
        </div>
    )
}
