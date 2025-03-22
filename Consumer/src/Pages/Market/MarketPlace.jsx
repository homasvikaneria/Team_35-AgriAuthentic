import React, { useEffect, useState } from 'react'

const categories = [
    { id: 1, name: "All Fruits & Vegetables", imgLink: "https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1719920085745-3" },
    { id: 2, name: "Fresh Fruits", imgLink: "https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1702734004998-8" },
    { id: 3, name: "Mangoes & Melons", imgLink: "https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1712577388325-3" },
    { id: 4, name: "Seasonal", imgLink: "https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1702734004998-3" },
    { id: 5, name: "Exotics", imgLink: "https://cdn.grofers.com/app/images/category/cms_images/icon/278_1678705041060.png" },
    { id: 6, name: "Freshly Cut & Sprouts", imgLink: "https://cdn.grofers.com/app/images/category/cms_images/icon/395_1668582176947.png" },
    { id: 7, name: "Frozen Veg", imgLink: "https://cdn.grofers.com/app/images/category/cms_images/icon/157_1643443974388.png" },
    { id: 8, name: "Leafies & Herbs", imgLink: "https://cdn.grofers.com/66acfb51-c5fe-4718-a200-61efaf773556.png" },
    { id: 9, name: "Flowers & Leaves", imgLink: "https://cdn.grofers.com/app/images/category/cms_images/icon/1452_1617891490134.png" },
    { id: 10, name: "Combo & Recipes", imgLink: "https://cdn.grofers.com/app/images/category/cms_images/icon/928_1658840270707.png" },
    { id: 11, name: "Apples & Pears", imgLink: "https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1725615169295-3" },
    { id: 12, name: "Fresh Vegetables", imgLink: "https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1702463308432-3" },
];


const categoryFilters = {
    1: "All Fruits & Vegetables",
    2: "Fresh Fruits",
    3: "Mangoes & Melons",
    4: "Seasonal",
    5: "Exotics",
    6: "Freshly Cut & Sprouts",
    7: "Frozen Veg",
    8: "Leafies & Herbs",
    9: "Flowers & Leaves",
    10: "Combo & Recipes",
    11: "Apples & Pears",
    12: "Fresh Vegetables",
};


const MarketPlace = () => {

    const [selectedCategory, setSelectedCategory] = useState("All Fruits & Vegetables")


    const onCategoryClick = (itemName) => {
        setSelectedCategory(itemName)
    }


    return (
        <>
            <div className="flex justify-center mt-7">
                <div className='w-[15%]'>
                    {
                        categories.map((item) => (
                            <div
                                onClick={() => onCategoryClick(item.name)}
                                className={`flex items-center bg-gray-50 hover:bg-green-100 p-3 h-fit cursor-pointer ${selectedCategory === item.name ? "border-l-4 border-green-500" : ""}`}>
                                <div className='rounded-full overflow-hidden bg-gray-50 h-[50px]'>
                                    <img src={item.imgLink} alt="" width={50} className='hover:scale-110 duration-300' />
                                </div>
                                <h1 className='ml-2'>{item.name}</h1>
                            </div>
                        ))
                    }
                </div>

                <div className='bg-gray-100 w-[70%] h-[887px]'>
                    <h1 className='font-bold p-3'>{selectedCategory}</h1>
                </div>

            </div>
        </>
    )
}

export default MarketPlace