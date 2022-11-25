import { Wrapper } from "./Wrapper"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export const Products = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        ;(async () => {
            const response = await fetch("http://localhost:8000/products")
            const contnt = await response.json()
            setProducts(contnt)
        })()
    }, [])
    return (
        <Wrapper>
            <div>
                <Link to={"/create"} className="pt-3 pb.2 mb-3 border-bottom">
                    Add
                </Link>
            </div>
            <div class="table-responsive">
                <table class="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Product</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => {
                            return (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <a href="#" className="btn btn-sm btn-outlline-secondary">
                                            Delete
                                        </a>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </Wrapper>
    )
}
