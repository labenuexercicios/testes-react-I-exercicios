import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import Calculator from "../components/Calculator"

describe("Exercicios", () => {
    test("Garanta em pelo menos um teste que a aplicação é renderizada corretamente com os dígitos de operações +, -, *, e /.", () => {
        render(<Calculator />)
        // o HTML é gerado com o valor em string, mesmo em código sendo number
        const allbuttons = screen.getByText("+", "-", "*", "/")
        expect(allbuttons).toBeInTheDocument()
        // eslint-disable-next-line testing-library/no-debugging-utils
        screen.logTestingPlaygroundURL()
    })

    test("Ao clicar nos dígitos para realizar o cálculo 5 * 2 e clicar em =, deve aparecer no resultado o valor 10.", async () => {
        render(<Calculator />)
        const user = userEvent.setup()
        
        const firstbutton = screen.getByText("5")
        const multbutton = screen.getByText("*")
        const secondbutton = screen.getByText("2")
        const resultbutton = screen.getByText("=")

        await user.click(firstbutton)
        await user.click(multbutton)
        await user.click(secondbutton)
        await user.click(resultbutton)
        const result = screen.getByText(/10/i)
        expect(result).toBeInTheDocument()

    })

    test("Ao clicar nos dígitos, deve aparecer 5 * 2 + 10 deve ser 20 e não 25", async () => {
        render(<Calculator />)
        const user = userEvent.setup()
        
        const cbutton = screen.getByText("C")
        const firstbutton = screen.getByText("5")
        const multbutton = screen.getByText("*")
        const secondbutton = screen.getByText("2")
        const sumbutton = screen.getByText("+")
        const thirdbutton = screen.getByText("1")
        const resultbutton = screen.getByText("=")

        await user.click(cbutton)
        await user.click(firstbutton)
        await user.click(multbutton)
        await user.click(secondbutton)
        await user.click(sumbutton)
        await user.click(thirdbutton)

        const button0 = screen.getByText("0")
        await user.click(button0)

        await user.click(resultbutton)

        const result = screen.getByText("20")
        expect(result).toBeInTheDocument()

    })
})