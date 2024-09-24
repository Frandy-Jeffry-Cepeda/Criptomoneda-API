import axios from 'axios'
import { CryptoCurrenciesResponseSchema, CryptoPriceSchema } from '../schema/crypto-schema'
import { Pair } from '../types'

export async function getCryptos() {

    const cryptoUrl = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'

    const {data: {Data}} = await axios(cryptoUrl)

    const result = CryptoCurrenciesResponseSchema.safeParse(Data)

    if(result.success) {
        return result.data
    }
}

export async function fetchCurrentCryptoPrice(pair: Pair) {
    
    const cryptoPriceUrl = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${pair.cryptocurrency}&tsyms=${pair.currency}`

    const { data: { DISPLAY } } = await axios(cryptoPriceUrl)

    const result = CryptoPriceSchema.safeParse(DISPLAY[pair.cryptocurrency][pair.currency])

    if(result.success){
        return result.data
    }
}