import React, { useEffect, useState } from 'react'
import Navbar from '../Header/Navbar';
import MarketPlace from './MarketPlace';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import KisanConnect from '../KisanConnect/KisanConnect';


const Market = () => {


    return (
        <>
            <Navbar />

            <Tabs defaultValue="marketplace" className="container mt-5 mb-5 mx-auto"
            >

                <TabsList className="flex w-fit h-fit bg-[#eaeaea46] ml-28">
                    <TabsTrigger
                        value="marketplace"
                        className="p-3 text-green-500 hover:text-green-700 hover:bg-green-50 data-[state=active]:bg-green-100 data-[state=active]:text-green-700 transition-colors duration-200"
                    >
                        Marketplace
                    </TabsTrigger>
                    <TabsTrigger
                        value="myorders"
                        className="p-3 text-green-500 hover:text-green-700 hover:bg-green-50 data-[state=active]:bg-green-100 data-[state=active]:text-green-700 transition-colors duration-200"
                    >
                        My Orders
                    </TabsTrigger>
                    <TabsTrigger
                        value="favfarms"
                        className="p-3 text-green-500 hover:text-green-700 hover:bg-green-50 data-[state=active]:bg-green-100 data-[state=active]:text-green-700 transition-colors duration-200"
                    >
                        Kisan Connect
                    </TabsTrigger>
                    <TabsTrigger
                        value="verify"
                        className="p-3 text-green-500 hover:text-green-700 hover:bg-green-50 data-[state=active]:bg-green-100 data-[state=active]:text-green-700 transition-colors duration-200"
                    >
                        Product Verification
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="marketplace">
                    <MarketPlace />
                </TabsContent>

                <TabsContent value="myorders">
                    <KisanConnect />
                </TabsContent>

                <TabsContent value="favfarms">
                    <KisanConnect />
                </TabsContent>

                <TabsContent value="verify">
                    <KisanConnect />
                </TabsContent>

            </Tabs>

        </>

    )
}

export default Market