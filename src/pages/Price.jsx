import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function Price() {

    const [coin, setCoin] = useState({})

    const navigate = useNavigate()

    const params = useParams()

    async function getCoin() {

        let key = import.meta.env.VITE_API_KEY
        let api = `http://rest.coinapi.io/v1/exchangerate/${params.symbol}/USD?apikey=${key}`

        const response = await fetch(api)
        const data = await response.json()
        console.log(data)

        console.log('getCoinnn')
        setCoin(data)
    }

    useEffect(() => {
        console.log('useEffect')
        if (!coin.rate) {
            getCoin()
        }
    }, [])

    function loaded() {
        return (
            <div>
                <h1>{coin.asset_id_base}/{coin.asset_id_quote}</h1>
                <h2>{coin.rate}</h2>
                <button onClick={() => navigate('/currencies')}>Back</button>
            </div>
        )
    }

    function loading() {
        return (
            <div>Loading...</div>
        )
    }

    return coin.rate ? loaded() : loading()
}