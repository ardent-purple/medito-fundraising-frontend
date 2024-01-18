import { atom } from 'jotai'
import Currency from 'types/currency'

const currency = atom(Currency.USD)

export default currency
