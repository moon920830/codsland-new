import React from "react";

interface CardType {
    title : string,
    direction: boolean,
    content: string,
    link: string
}

const HomeCard:React.FC<CardType> = (props) => {
    const title = props.title
    const direction = props.direction
    const content =  props.content
    const link = props.link
    return (
        <div className={`${direction == true ? 'bg-white rounded-t-full' : 'bg-[#2E3192] rounded-b-full'} px-5`}>
            <img src={`${direction == true ? '/images/Frame.png' : '/images/Frameblack.png'}`} className="mt-10 m-auto"/>
            <div className={`${direction == true ? 'text-[#2E3192]' : 'text-white'} mt-10 font-semibold`}>
                <div className="text-center text-xl">{title}</div>
                <div className={`${direction == true ? 'text-black' : ''} mt-10 text-center`}>{content}</div>
                <div className={`${direction == true? 'text-[#2E3192]' : 'text-white'} mt-10 mb-10`}>
                    <a href={`https://${link}`} target="_blank" className="w-full">{link}</a>
                </div>
            </div>
        </div>
    )
}

export default HomeCard;