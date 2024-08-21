import axios from "axios"
import { TrendingCoins } from "../../config/api"
import { CryptoState } from "../../CryptoContext"
import { useEffect, useState } from "react"
import AliceCarousel from "react-alice-carousel"
import { Link } from "react-router-dom"


export function numberWithCommas(x){
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")
}

const Carousel = () => {

    const {currency}=CryptoState()

    const [trending,setTrending]=useState([])

    const fetchTrendingCoins=async()=>{
        const {data}=await axios.get(TrendingCoins(currency))
        setTrending(data)
    }

    // console.log(trending)

    useEffect(()=>{
        fetchTrendingCoins()
    },[currency])

    
    

    const items=trending.map((coin)=>{
        return(
            <Link 
            to={`/coins/${coin.id}`}
            className="flex flex-col items-center mt-10"
            >
                <img
                src={coin.image}
                alt={coin.name}
                height="80"
                style={{marginBottom:10}}
                className="h-16"
                />
                <h1 className="flex items-center gap-2">
                    <span className="text-xl text-white uppercase font-extrabold font-serif">{coin.symbol}</span>
                    <span>{coin.price_change_percentage_24h>0 ? <p className="text-green-400 font-bold text-lg">+{coin.price_change_percentage_24h}%</p> : <p className="text-red-500 font-bold text-lg">{coin.price_change_percentage_24h}%</p>}</span>
                </h1>
                <h1 className="text-xl font-extrabold font-sans text-teal-500 ">{coin.name}</h1>
                <h1 className=" font-mono font-extrabold text-white flex gap-1 text-xl"><span>{currency==='INR'?<p>₹</p>:<p>$</p>}</span>{numberWithCommas(coin.current_price)}</h1>
            </Link>
        )
    })

    const responsive={
        0:{
            items:2,
        },
        512:{
            items:4,
        },
    }

    return (
        <div className="overflow-hidden max-w-screen-xl ">
            <AliceCarousel
            mouseTracking
            infinite
            autoPlayInterval={1000}
            animationDuration={1500}
            disableDotsControls
            disableButtonsControls
            responsive={responsive}
            autoPlay
            items={items}
            />
        </div>
    )
}
export default Carousel