import { ChangeEventHandler } from "react"

interface Props{
    onChange:ChangeEventHandler<HTMLInputElement>;
}

const SearchBooks =({onChange}:Props) =>{
    return(
        <>
        <input
        className="w-full max-w-[180px] mr-5 rounded-lg pl-2"
        type="text"
        placeholder="search books"
        onChange={onChange}
      />
    </>
    )
}

export default SearchBooks