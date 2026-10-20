import { expect, it, describe, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useLocation } from "react-router";
import { MemoryRouter } from "react-router";
import axios from "axios";
import { PaymentSummary } from "./PaymentSummary";


const paymentSummary = { 
    "totalItems": 10, 
    "productCostCents": 13624, 
    "shippingCostCents": 499, 
    "totalCostBeforeTaxCents": 14123, 
    "taxCents": 1412, 
    "totalCostCents": 15535 
}

vi.mock("axios")
vi.mock("useNavigate")


describe("Payment Summary Test Suite", () => {

    let loadCart;
    let user;

    beforeEach(() => {
        loadCart = vi.fn()

        user = userEvent.setup()
    })


    it("If payment summary displays properly", () => {
        render(
            <MemoryRouter>
                <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
            </MemoryRouter>
        )

        const totalItems = screen.getByTestId("total-items")
        const productCostCents = screen.getByTestId("product-cost-cents")
        const shippingCostCents = screen.getByTestId("shipping-cost-cents")
        const totalCostBeforeTaxCents = screen.getByTestId("total-cost-before-tax-cents")
        const taxCents = screen.getByTestId("tax-cents")
        const totalCostCents = screen.getByTestId("total-cost-cents")

        expect(totalItems).toHaveTextContent("10")
        expect(productCostCents).toHaveTextContent("$136.24")
        expect(shippingCostCents).toHaveTextContent("$4.99")
        expect(totalCostBeforeTaxCents).toHaveTextContent("$141.23")
        expect(taxCents).toHaveTextContent("$14.12")
        expect(totalCostCents).toHaveTextContent("$155.35")
    })

    it("Test the place order button works", async () => {
        const Location = () => {
            const location = useLocation()
            return <div data-testid="url-path">{location.pathname}</div>
        }

        render(
            <MemoryRouter>
                <Location/>
                <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
            </MemoryRouter>
        )

        const placeOrderButton = screen.getByTestId("place-order-button")
        await user.click(placeOrderButton)
        expect(axios.post).toHaveBeenCalledWith("/api/orders")
        const urlPath = screen.getByTestId("url-path")
        expect(urlPath).toHaveTextContent("/orders")
        expect(loadCart).toHaveBeenCalled()

    })
})

