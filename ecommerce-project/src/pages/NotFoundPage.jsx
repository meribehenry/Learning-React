import { Header } from "../components/Header"
import "./NotFoundPage.css"

export const NotFoundPage = ({cart}) => {
    return (
        <>
            <Header cart={cart}/>
            <h2 className="not-found">Page Not Found</h2>
        </>
    )
}