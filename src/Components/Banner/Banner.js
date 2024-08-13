
import Carousel from './Carousel'

// import {cryptobg} from './public/cryptobg.jpg'
const Banner = () => {

    return (
        <div className='relative flex flex-col items-center'>
            <img
                className='w-screen select-none'
                src='/cryptobg.jpg'
                alt='cryptobg' />
            <div className='text-white absolute flex flex-col items-center  top-0  '>
                <div className='flex flex-col lg:items-center items-start gap-3 mt-5'>
                    <h1 className='lg:text-6xl md:text-3xl text-xl font-bold uppercase'>Crypto Friend</h1>
                    <p className='lg:text-xl md:text-lg text-sm font-serif'>Learn all about your Favourite Crypto Currency here.</p>
                </div>
                <div className='hidden xl:inline-flex lg:inline-flex'>
                    <Carousel/>
                </div>
            </div>
            <div className='xl:hidden lg:hidden'>
                <Carousel />
            </div>
        </div>
    )
}
export default Banner