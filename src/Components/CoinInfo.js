import { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext'
import { HistoricalChart } from '../config/api'
import axios from 'axios'
import '../App.css';
import { Line } from 'react-chartjs-2'


import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
// import { chartDays } from '../config/data';
// import SelectButton from './SelectButton';
//   import { Line } from 'react-chartjs-2';
//   import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

 

const CoinInfo = ({ coin }) => {

    const [historicData, setHistoricData] = useState()
    const [days, setDays] = useState(365)
    const { currency } = CryptoState()
    const [loading, setLoading] = useState(true)

    let cur = currency.toLowerCase();



    const fetchHistoricalData = async () => {
        // setLoading(true)
        try{
            const { data } = await axios.get(HistoricalChart(coin?.id, cur, days))
        setHistoricData(data.prices)
        setLoading(false)
        }
        catch(error){
            console.error('Error fetching historical data:', error)
            // setLoading(false)
            setTimeout(() => {
                setLoading(false)
                // fetchHistoricalData()
            }, 20000);
        }
    }

    useEffect(() => {
        fetchHistoricalData()
        console.log(days)
    }, [currency, days])

    // console.log(historicData)
    console.log(cur)

    return (
        <div className='p-5 w-2/3 flex flex-col justify-center'>
            {
                loading === true
                    ?
                    <div className='flex h-96 justify-center items-center'>
                        <div className='loader' />
                    </div>
                    :
                    <>
                        {/* Chart */}


                        <div>
                            <Line
                                data={{
                                    labels: historicData?.map((coin) => {
                                        let date = new Date(coin[0]);
                                        let time = date.getHours() > 12
                                            ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                            : `${date.getHours()}:${date.getMinutes()} AM`;
                                        return days === 1 ? time : date.toLocaleDateString()
                                    }),
                                    datasets: [
                                        {
                                            data: historicData?.map((coin) => coin[1]),
                                            label: `Price (Past ${days} Day(s)) in ${currency}`,
                                            borderColor: '#2DD4BF',
                                        },
                                    ],
                                }}
                                options={{
                                    elements: {
                                        point: {
                                            radius: 1,
                                        }
                                    }
                                }}
                            />
                        </div>



                        {/* Buttons */}
                        <div className='flex items-center gap-8 justify-center mt-20'>
                            {/* <button className='text-xl bg-zinc-950 text-white px-6 py-3 font-bold hover:bg-zinc-800 rounded-lg shadow-xl duration-200'>24 Hours</button>
                            <button className='text-xl bg-zinc-950 text-white px-6 py-3 font-bold hover:bg-zinc-800 rounded-lg shadow-xl duration-200'>30 Days</button>
                            <button className='text-xl bg-zinc-950 text-white px-6 py-3 font-bold hover:bg-zinc-800 rounded-lg shadow-xl duration-200'>3 Months</button>
                            <button className='text-xl bg-zinc-950 text-white px-6 py-3 font-bold hover:bg-zinc-800 rounded-lg shadow-xl duration-200'>1 Year</button> */}

                            {/* {chartDays.map((day) => (
                                <SelectButton 
                                key={day.value}
                                onClick={()=>{
                                  setDays(day.value)  
                                }}
                                selected={day.value ===days}
                                >
                                    {day.label}
                                </SelectButton>
                            ))} */}

                            <button 
                            onClick={()=>setDays(1)}
                            className='text-teal-400 px-3 py-2 font-bold text-xl rounded-lg bg-gray-800 hover:bg-teal-400 hover:text-black duration-200 active:bg-teal-700 active:text-black focus:bg-teal-500 focus:text-black'>24 Hours</button>
                            <button 
                            onClick={()=>setDays(30)}
                            className='text-teal-400 px-3 py-2 font-bold text-xl rounded-lg bg-gray-800 hover:bg-teal-400 hover:text-black duration-200 active:bg-teal-500 active:text-black focus:bg-teal-500 focus:text-black'>30 Days</button>
                            <button 
                            onClick={()=>setDays(90)}
                            className='text-teal-400 px-3 py-2 font-bold text-xl rounded-lg bg-gray-800 hover:bg-teal-400 hover:text-black duration-200 active:bg-teal-700 active:text-black focus:bg-teal-500 focus:text-black'>3 Months</button>
                            <button 
                            onClick={()=>setDays(365)}
                            className='text-teal-400 px-3 py-2 font-bold text-xl rounded-lg bg-gray-800 hover:bg-teal-400 hover:text-black duration-200 active:bg-teal-700 active:text-black focus:bg-teal-500 focus:text-black'>1 Year</button>
                        </div>
                    </>
            }
        </div>
    )
}
export default CoinInfo