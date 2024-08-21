import react from 'react'
const SelectButton = ({children}) => {

    return (
        <button 
        onClick={onclick}
        className='bg-zinc-950 px-5 py-3 font-bold text-lg rounded-lg hover:bg-yellow-500 hover:text-black duration-300 cursor-pointer active:bg-yellow-600 
        focus:bg-yellow-500 focus-within:text-black
        ' >{children}</button >
    )
}
export default SelectButton