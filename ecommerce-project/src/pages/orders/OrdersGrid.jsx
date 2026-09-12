
import { OrderDetailsGrid } from "./OrderDetailsGrid"
import { OrdersHeader } from "./OrdersHeader"

export const OrdersGrid = ({orders, loadCart}) => {
    return (
        <div className="orders-grid">
            {orders.map((order) => {
                return (
                    <div className="order-container">

                        <OrdersHeader order={order}/>

                        <OrderDetailsGrid order={order} loadCart={loadCart}/>
                    </div>
                )
            })}
        </div>
    )
}