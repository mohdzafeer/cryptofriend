import axios from 'axios'
import { useEffect, useState } from 'react'
import { CoinList } from '../config/api'
import { CryptoState } from '../CryptoContext'
import { useNavigate } from "react-router-dom"
import { LinearProgress, Pagination, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import { numberWithCommas } from './Banner/Carousel'

// import {
//     Pagination,
//     PaginationContent,
//     PaginationEllipsis,
//     PaginationItem,
//     PaginationLink,
//     PaginationNext,
//     PaginationPrevious,
// } from "@/components/ui/pagination"


import { makeStyles } from "@material-ui/core";
const CoinsTable = () => {

    const { currency } = CryptoState()

    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)

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


    // const useStyles=makeStyles(()=>({
    //     pagination:{
    //         "& .MuiPaginatinItem-root":{
    //             color:"gold"
    //         }
    //     }
    // }))

    // const classes=useStyles()




    return (
        <div className='flex flex-col items-center'>
            <h1 className='lg:text-5xl xl:text-5xl text-xl text-white my-3  mt-10'>Cryptocurrency Prices by Market Cap</h1>
            {/* <TextField  
            className='w-4/5'
            label='Search' 
            variant='outlined'
            onChange={(e)=>setSearch(e.target.value)}
            bgColor=''
            /> */}
            <div className='w-full flex items-center gap-3 justify-center mt-5'>
                <input
                    className='w-3/5 px-3 py-4 rounded-lg bg-yellow-100 text-gray-900 font-bold'
                    placeholder='Search Your Favourite Cryptocurrency'
                    onChange={(e) => {
                        setSearch(e.target.value)
                    }} />
                {/* <button className='bg-yellow-500 font-bold text-gray-900 px-3 py-2 rounded-lg hover:bg-yellow-400 active:bg-yellow-500 duration-200 text-lg'>Search</button> */}
            </div>

            <TableContainer className='mt-10  no-scrollbar scroll-smooth'>
                {loading === true ? (
                    <LinearProgress 
                    className='my-10' />
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
                            {handleSearch()
                                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                                .map((row) => {
                                    return (
                                        <TableRow
                                            onClick={() => navigate(`/coins/${row.id}`)}
                                            key={row.name}>

                                            <div className='flex items-center justify-start gap-40 w-screen px-10 shadow-lg py-3 cursor-pointer
                                        bg-zinc-800 hover:bg-zinc-950 active:bg-zinc-900 duration-300 my-3 mx-2 rounded-lg min-w-max'
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

                                                <h1 className='text-white  font-bold w-1/5 hidden lg:inline-flex xl:inline-flex text-xl'>
                                                    {row.name}
                                                </h1>
                                                <h1 className='text-yellow-500 w-1/5 flex gap-1 text-xl font-semibold font-mono'>
                                                    {currency === 'INR' ? <p>₹</p> : <p>$</p>}
                                                    {numberWithCommas(row.current_price)}
                                                </h1>
                                                {
                                                    row.price_change_24h > 0 ?
                                                        <h1 className='text-green-500 w-1/5 font-mono flex gap-1 text-xl'>
                                                            {currency === 'INR' ? <p>₹</p> : <p>$</p>}
                                                            {numberWithCommas(Math.floor(row.price_change_24h * 100) / 100)}
                                                        </h1> :
                                                        <h1 className='text-red-500 w-1/5 font-mono flex gap-1 text-xl'>
                                                            {currency === 'INR' ? <p>₹</p> : <p>$</p>}
                                                            
                                                            {numberWithCommas(Math.floor(row.price_change_24h * 100) / 100)}
                                                        </h1>
                                                }
                                                <h1 className='text-white w-1/5 font-mono text-xl'>
                                                    {numberWithCommas(row.market_cap).toString().slice(0, -6)}<span className='font-bold text-lg font-sans'> M</span>
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


            <Pagination
                count={(handleSearch()?.length / 10).toFixed(0)}
                color='secondary'
                variant='outlined'

                style={{
                    padding: 20,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor:"#EAB308",
                    fontWeight:"900",
                    color:'black',
                    marginTop:10

                }}
                onChange={(_,value)=>{
                    setPage(value)
                    window.scroll(0,450);
                }}
                
            />



            




        </div>
    )
}
export default CoinsTable