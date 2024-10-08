
import { FaReact } from "react-icons/fa";


const Footer = () => {

    return (
        <div className='flex justify-center items-center h-28 bg-teal-400 text-gray-900 font-bold mt-10 font-serif'>
            <p className="flex items-center gap-2">Made with <FaReact/> by <span onClick={()=>window.open('https://portfolio-nine-rust-42.vercel.app/')} className='font-semibold hover:underline cursor-pointer duration-200 '>Mohammad Zafeer</span></p>
        </div>
    )
}
export default Footer