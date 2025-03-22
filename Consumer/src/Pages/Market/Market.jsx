import React, { useEffect, useState } from 'react'
import Navbar from '../Header/Navbar';
import MarketPlace from './MarketPlace';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";


const Market = () => {


    return (
        <>
            <Navbar />


            <Tabs defaultValue="marketplace" className="container mt-5 mb-5 mx-auto">

                <TabsList className="flex w-fit h-fit bg-[#eaeaea46] ml-28">
                    <TabsTrigger value="marketplace" className="p-3">Marketplace</TabsTrigger>
                    <TabsTrigger value="myorders" className="p-3">My Orders</TabsTrigger>
                    <TabsTrigger value="favfarms" className="p-3">Kisan Connect</TabsTrigger>
                    <TabsTrigger value="verify" className="p-3">Product Verification</TabsTrigger>
                </TabsList>

                <TabsContent value="marketplace">
                    <MarketPlace />
                </TabsContent>

                <TabsContent value="myorders">
                </TabsContent>

                <TabsContent value="favfarms">
                </TabsContent>

                <TabsContent value="verify">
                </TabsContent>

            </Tabs>

        </>

    )
}

export default Market