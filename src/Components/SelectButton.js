
const SelectButton = ({children}) => {

    return (
        <button 
        onClick={onclick}
        className='bg-zinc-950 px-5 py-3 font-bold text-lg text-teal-400 rounded-lg hover:bg-teal-500 hover:text-black duration-300 cursor-pointer active:bg-teal-600 
        focus:bg-teal-500 focus-within:text-black
        ' >{children}</button >
    )
}
export default SelectButton