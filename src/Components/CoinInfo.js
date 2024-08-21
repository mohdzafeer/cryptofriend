import { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext'
import { HistoricalChart } from '../config/api'
import axios from 'axios'
import '../App.css';
import { Line } from 'react-chartjs-2'

// 
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
import { chartDays } from '../config/data';
import SelectButton from './SelectButton';
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
// 

const CoinInfo = ({ coin }) => {

    const [historicData, setHistoricData] = useState()
    const [days, setDays] = useState(1)
    const { currency } = CryptoState()
    const [loading, setLoading] = useState(false)

    let cur = currency.toLowerCase()



    const fetchHistoricalData = async () => {
        setLoading(true)
        const { data } = await axios.get(HistoricalChart(coin?.id, days, cur))
        setHistoricData(data?.prices)
        setLoading(false)
    }

    useEffect(() => {
        fetchHistoricalData()
    }, [currency, days,cur])

    console.log(historicData)
    // console.log(cur)

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
                                            label: `Price (Past ${days} Days) in ${currency}`,
                                            borderColor: '#EEBC1D',
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

                            {chartDays.map((day) => (
                                <SelectButton 
                                key={day.value}
                                onClick={()=>{
                                  setDays(day.value)  
                                }}
                                selected={day.value ===days}
                                >
                                    {day.label}
                                </SelectButton>
                            ))}
                        </div>
                    </>
            }
        </div>
    )
}
export default CoinInfo