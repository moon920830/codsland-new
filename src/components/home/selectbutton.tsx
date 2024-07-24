import React, {useState} from "react";

interface selectType {
    name : string,
}

const SelectButton:React.FC<selectType> = (props) => {
    const [stats, setStats] = useState(true)
    const name = props.name
    const handleButton = () => {
        setStats(!stats)
    }
    return(
        <div className={`py-2 ${stats == true ? 'text-[#787878] bg-white' : 'text-white bg-[#252775]'} rounded-[42px] text-sm font-normal cursor-pointer border border-[#787878] text-center`} onClick={handleButton}>
            {name}
        </div>
    )
}

export default SelectButton;