
import { useNavigate } from 'react-router-dom'
import { CryptoState } from '../CryptoContext'
const Header = () => {

    const navigate=useNavigate()

    const {currency,setCurrency} = CryptoState()

    // console.log(currency);

    return (
        <div className='h-20 flex justify-between items-center lg:px-10 px-4 bg-gray-900 shadow-xl  '>
            <h1 onClick={()=>navigate('/')} className='font-bold lg:text-3xl md:text-xl text-xl text-teal-400 uppercase select-none shadow-lg font-sans cursor-pointer hover:scale-105 duration-200 tracking-wide'>Crypto Friend</h1>
            {/* <img
            src='./crypto_friend.png'
            alt='Crypto Friend'
            className='h-14 cursor-pointer'
            onClick={navigate('/')}
            /> */}
            <div className='flex items-center gap-4'>
            <form class="">
                
                <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 lg:text-2xl text-lg px-3"
                value={currency}
                onChange={(e)=>setCurrency(e.target.value)}
                >
                    
                    <option  value="USD">USD</option>
                    <option selected value="INR">INR</option>
                    
                </select>
            </form>
            {/* <button className='bg-teal-400 font-bold lg:text-2xl text-lg px-3 py-2 rounded-lg text-gray-900 hover:bg-teal-500 active:bg-teal-400 duration-200'>Log In</button> */}
            </div>
        </div>
    )
}
export default Header