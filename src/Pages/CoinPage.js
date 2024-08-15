import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { CryptoState } from "../CryptoContext"
import axios from "axios"
import { SingleCoin } from "../config/api"
import CoinInfo from "../Components/CoinInfo"
import '../App.css';
import { numberWithCommas } from "../Components/Banner/Carousel"

const CoinPage = () => {

    const { id } = useParams()
    const [coin, setCoin] = useState()
    const { currency, symbol } = CryptoState()
    const [loading, setLoading] = useState(false)

    const fetchCoin = async () => {
        setLoading(true)
        const { data } = await axios.get(SingleCoin(id))
        setCoin(data)
        setLoading(false)
    }




    useEffect(() => {
        fetchCoin()

    }, [currency])

    console.log(coin)



    return (

        <div className=" flex items-start  justify-between mt-10 px-10">
            <div className="flex flex-col items-center gap-4 w-1/3 border-r-2  border-yellow-600 pr-5">
                {loading === true ?
                    <div className=" w-full flex justify-center h-72 items-center">
                        <div className="loader" />
                    </div>
                    :
                    <div className="flex flex-col items-center w-full select-none">
                        <img
                            src={coin?.image?.large}
                            alt={coin?.name}
                            className="h-80"
                        />
                        <h1 className="text-3xl font-serif text-yellow-400 font-bold uppercase">{coin?.symbol}</h1>
                    </div>
                }
                
                {loading === true ?

                    <div className=" flex justify-center items-center w-full h-96">
                        <div className="spinner" />
                    </div>
                    :
                    <div className=" flex flex-col gap-2 text-xl font-bold text-yellow-400 w-full">
                        <div className="flex items-center justify-start bg-zinc-800 px-3 py-2 rounded-lg hover:bg-zinc-950 shadow-lg duration-200"><span className="w-1/2">Name : </span><span className="text-gray-400 select-none uppercase text-2xl">{coin?.name}</span></div>
                        <div className="flex items-center justify-start bg-zinc-800 px-3 py-2 rounded-lg hover:bg-zinc-950 duration-200"><span className="w-1/2">Current Price : </span>
                        
                            <span className="text-white">
                                {
                                    currency === "INR"
                                        ?
                                        <>
                                            ₹ {coin?.market_data?.current_price.inr}
                                        </>
                                        :
                                        <>
                                            $ {coin?.market_data?.current_price.usd}
                                        </>
                                }
                            </span>
                        </div>
                        <div className="flex items-center justify-start bg-zinc-800 px-3 py-2 rounded-lg hover:bg-zinc-950 duration-200"><span className="w-1/2">Market Cap Rank : </span><span className="text-white">{coin?.market_data?.market_cap_rank}</span></div>
                        <div className="flex items-center justify-start bg-zinc-800 px-3 py-2 rounded-lg hover:bg-zinc-950 duration-200"><span className="w-1/2">24H Change : </span>
                            <span className="text-white">{
                                coin?.marekt_data?.price_change_24h > 0
                                    ?
                                    <span className="text-green-400">
                                        {
                                            currency === 'INR'
                                                ?
                                                <>
                                                    ₹ +{coin?.market_data?.price_change_24h?.toFixed(2)}
                                                </>
                                                :
                                                <>
                                                    $ +{coin?.market_data?.price_change_24h?.toFixed(2)}
                                                </>
                                        }
                                    </span>
                                    :
                                    <span className="text-red-500">
                                        {
                                            currency === 'INR'
                                                ?
                                                <>
                                                    ₹ {coin?.market_data?.price_change_24h_in_currency.inr?.toFixed(2)}
                                                </>
                                                :
                                                <>
                                                    $ {coin?.market_data?.price_change_24h_in_currency.usd?.toFixed(2)}
                                                </>
                                        }
                                    </span>
                            }</span>
                        </div>
                        <div className="flex items-center justify-start bg-zinc-800 px-3 py-2 rounded-lg hover:bg-zinc-950 duration-200"><span className="w-1/2">Market Cap : </span>
                            <span className="text-white">
                                {
                                    currency === 'INR'
                                        ?
                                        <>
                                            ₹ {coin?.market_data?.market_cap?.inr}
                                        </>
                                        :
                                        <>
                                            $ {coin?.market_data?.market_cap?.usd}
                                        </>
                                }
                            </span>
                        </div>
                        
                        <div className="flex items-center justify-start bg-zinc-800 px-3 py-2 rounded-lg hover:bg-zinc-950 duration-200"><span className="w-1/2">Maximum Supply : </span><span className="text-white">{coin?.market_data?.max_supply}</span></div>
                        <div className="flex items-center justify-start bg-zinc-800 px-3 py-2 rounded-lg hover:bg-zinc-950 duration-200"><span className="w-1/2">Twitter Followers : </span><span className="text-white">{coin?.community_data?.twitter_followers}</span></div>
                        <div className="flex items-center justify-start bg-zinc-800 px-3 py-2 rounded-lg hover:bg-zinc-950 duration-200"><span className="w-1/2">Links : </span>
                            <div className="text-white flex items-center gap-4 flex-wrap">
                                <p className="cursor-pointer hover:text-zinc-200 duration-200 hover:underline" onClick={() => window.open(coin?.links?.whitepaper)}>WhitePaper</p>
                                <p className="cursor-pointer hover:text-zinc-200 duration-200 hover:underline" onClick={() => window.open(coin?.links?.homepage[0])}>HomePage</p>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <CoinInfo coin={coin} />
        </div>
    )
}
export default CoinPage