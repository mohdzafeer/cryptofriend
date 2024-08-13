import axios from 'axios'
import { useEffect, useState } from 'react'
import { CoinList } from '../config/api'
import { CryptoState } from '../CryptoContext'
import { useNavigate } from "react-router-dom"
import { LinearProgress, Table, TableBody, TableContainer, TableHead, TableRow} from '@mui/material'
import { numberWithCommas } from './Banner/Carousel'
const CoinsTable = () => {

    const { currency } = CryptoState()

    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')

    const navigate = useNavigate()


    const fetchCoins = async () => {
        setLoading(true)
        const { data } = await axios.get(CoinList(currency))
        setCoins(data)
        setLoading(false)
    }


    useEffect(() => {
        fetchCoins()

    }, [currency])

    // console.log(coins)


    const handleSearch = () => {
        return coins.filter((coin) => 
            coin.name.toLowerCase().includes(search) ||
                coin.symbol.toLowerCase().includes(search)
        )
    }


    

    return (
        <div className='flex flex-col items-center'>
            <h1 className='lg:text-5xl xl:text-5xl text-xl text-white my-3 font-serif mt-10'>Cryptocurrency Prices by Market Cap</h1>
            {/* <TextField  
            className='w-4/5'
            label='Search' 
            variant='outlined'
            onChange={(e)=>setSearch(e.target.value)}
            bgColor=''
            /> */}
            <div className='w-full flex items-center gap-3 justify-center mt-5'>
                <input
                    className='w-3/5 px-3 py-2 rounded-lg bg-yellow-100 text-gray-900 font-bold'
                    placeholder='Search Your Favourite Cryptocurrency'
                    onChange={(e) => {
                        setSearch(e.target.value)
                    }} />
                {/* <button className='bg-yellow-500 font-bold text-gray-900 px-3 py-2 rounded-lg hover:bg-yellow-400 active:bg-yellow-500 duration-200 text-lg'>Search</button> */}
            </div>

            <TableContainer className='mt-10  no-scrollbar scroll-smooth'>
                {loading === true ? (
                    <LinearProgress className='my-10' />
                ) : (
                    <Table>
                        
                        <TableHead style={{ backgroundColor: '#EEBC1D' }}>
                            

                            <div className='font-bold text-black flex items-center justify-start h-20 text-xl px-10 w-screen min-w-max gap-40 '>
                                <p className='w-1/5 flex flex-col items-center'>Coin</p>
                                <p className='w-1/5 hidden lg:inline-flex xl:inline-flex'>Name</p>
                                <p className='w-1/5'>Price</p>
                                <p className='w-1/5'>24H Change</p>
                                <p className='w-1/5'>Market Cap</p>
                            </div>


                        </TableHead>

                        <TableBody>
                            {handleSearch().map((row) => {
                                return (
                                    <TableRow
                                        onClick={() => navigate(`/coins/${row.id}`)}
                                        key={row.name}>

                                        <div className='flex items-center justify-start gap-40 w-screen px-10 shadow-lg py-3 cursor-pointer hover:bg-gray-700 active:bg-gray-800 duration-300'
                                        >
                                            <div className='flex flex-col items-center gap-1 w-1/5'>
                                                <img
                                                    src={row?.image}
                                                    alt={row.name}
                                                    height='10'
                                                    className='lg:h-12 xl:h-12 h-6'
                                                />
                                                <p className='text-yellow-400 uppercase'>{row.symbol}</p>
                                            </div>

                                            <h1 className='text-white  font-bold w-1/5 hidden lg:inline-flex xl:inline-flex'>
                                                {row.name}
                                            </h1>
                                            <h1 className='text-yellow-500 w-1/5 flex gap-1 text-lg font-semibold font-mono'>
                                                {currency==='INR'?<p>₹</p>:<p>$</p>}
                                                {numberWithCommas(row.current_price)}
                                            </h1>
                                            {
                                                row.price_change_24h >0 ?
                                                <h1 className='text-green-500 w-1/5 font-mono flex gap-1'>
                                                {currency==='INR'?<p>₹</p>:<p>$</p>}
                                                {numberWithCommas(row.price_change_24h)}
                                            </h1> : 
                                            <h1 className='text-red-500 w-1/5 font-mono flex gap-1'>
                                            {currency==='INR'?<p>₹</p>:<p>$</p>}
                                            {numberWithCommas(row.price_change_24h)}
                                        </h1>
                                            }
                                            <h1 className='text-white w-1/5 font-mono'>
                                                {numberWithCommas(row.market_cap)}
                                            </h1>


                                        </div>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                )
                }
            </TableContainer>
        </div>
    )
}
export default CoinsTable