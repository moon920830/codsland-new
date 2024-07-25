import React, { useEffect, useState } from "react";
import ShopFilter from "../../components/shop/filter";

const Shop:React.FC = () => {
    const [categoryId, setCategoryId] = useState('all')
    useEffect(() => {
        if(categoryId !== "all") {
            console.log(categoryId)
        }
    }, [categoryId])
    return(
        <div className="mx-20 flex pt-[150px]">
            <div className="basis-4/12">
                <ShopFilter setCategoryId={setCategoryId}/>
            </div>
        </div>
    )
}

export default Shop;