import { Header } from "../../components/Header"
import { useEffect, useState } from "react"
import { ProductGrid } from "./ProductGrid"
import { useSearchParams } from "react-router"
import axios from 'axios'
import "./HomePage.css"


export const HomePage = ({cart, loadCart}) => {
    const [searchParams] = useSearchParams()

    const search = searchParams.get("search")

    const [products, setProducts] = useState([])
    

    useEffect( () => {
        const getHomeData = async () => {
            if (search) {
                const response = await axios.get(`/api/products?search=${search}`)
                setProducts(response.data)
            } else {
                const response = await axios.get("/api/products")
                setProducts(response.data)
            }
        }
        getHomeData()
    }, [search])

    return (
        
    <>
        <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />
        <title>Ecommerce Project</title>
        <Header cart={cart} search={search}/>

        
        <div className="home-page">
            <ProductGrid products={products} loadCart={loadCart}/>
        </div>
    </>
    )
}