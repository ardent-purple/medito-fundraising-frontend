import { atom } from 'jotai'

const donationAmount = atom<number | undefined>(undefined)

export default donationAmount
