
const Footer = () => {

    return (
        <div className='flex justify-center items-center h-12 bg-yellow-500 text-gray-900 font-bold mt-10 font-serif'>
            <p onClick={()=>window.open('https://portfolio-nine-rust-42.vercel.app/')}>Made by <span className='font-semibold hover:underline cursor-pointer duration-200 '>Mohammad Zafeer</span></p>
        </div>
    )
}
export default Footer