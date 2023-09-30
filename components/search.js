
import { CgSearch } from "react-icons/cg";

export function SearchBarAlone({style}) {

    return (
        <div className="w-full my-5 flex flex-row justify-center items-center">
            <form>
                <div className="flex flex-row justify-center items-center border-b border-violet-500 px-2 py-1">
                        <input 
                        type="search"
                        placeholder={"search topic..."}
                        className={`bg-transparent text-white px-2 w-[200px] focus:outline-none placeholder:italic placeholder:text-white ${style}`}
                        />
                        <CgSearch type="submit" className="font-bold text-violet-800/70"/>
                </div>
            </form>
        </div>
    )
}