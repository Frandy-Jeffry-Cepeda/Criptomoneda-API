import { useState } from "react"
import { currencies } from "../data"
import { useCryptoStore } from "../store"
import { Pair } from "../types"
import ErrorMessage from "./ErrorMessage"

export default function CriptoSearchForm() {

    const cryptocurrencies = useCryptoStore((state) => state.cryptocurrencies)
    const fetchData = useCryptoStore((state) => state.fetchData)

    const [pair, setPair] = useState<Pair>({
        currency: '',
        cryptocurrency: ''
    })

    const [error, setError] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPair({
            ...pair,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(Object.values(pair).includes('')) {
            setError('Todos los campos son obligatorios')
            return
        }
        setError('')
        fetchData(pair)
    }

  return (
    <>
    <form
        className="form"
        onSubmit={handleSubmit}
    >
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <div className="field">
            <label htmlFor="currency">Moneda:</label>
            <select 
                name="currency" 
                id="currency"
                value={pair.currency}
                onChange={handleChange}
            >
                <option value="">-- Seleccione --</option>
                {currencies.map(crypto => (
                    <option 
                        key={crypto.code}
                        value={crypto.code}
                        >
                        {crypto.name}
                    </option>
                ))}
            </select>
        </div>

        <div className="field">
            <label htmlFor="cryptocurrency">Criptomoneda:</label>
            <select 
                name="cryptocurrency" 
                id="cryptocurrency"
                value={pair.cryptocurrency}
                onChange={handleChange}
            >
                <option value="">-- Seleccione --</option>
                {cryptocurrencies.map(currency => (
                    <option 
                        key={currency.CoinInfo.FullName}
                        value={currency.CoinInfo.Name}
                        >
                        {currency.CoinInfo.FullName}
                    </option>
                ))}
            </select>
        </div>

        <input type="submit" value = 'Cotizar' />
    </form>
    </>
  )
}
