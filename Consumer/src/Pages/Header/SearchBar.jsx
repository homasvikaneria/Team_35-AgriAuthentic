import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Search, X, ShoppingCart } from 'lucide-react';
import { ProductsData } from '../../../products_dataset.js';
import { MarketCard } from '../Market/MarketCard.jsx';

function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [visibleData, setVisibleData] = useState([]); 
    const [page, setPage] = useState(1); 
    const [hasMore, setHasMore] = useState(true); 
    const observer = useRef(); 

    const tags = [
        'sd card',
        'micro sd card',
        'sdxc memory card',
        'portronics micro sd card'
    ];

    
    const itemsPerPage = 10;

    
    const filterData = useCallback(() => {
        const query = searchQuery.toUpperCase();
        return ProductsData.filter((element) =>
            element.productName.toUpperCase().startsWith(query)
        );
    }, [searchQuery]);

    
    const filteredData = useMemo(() => filterData(), [filterData]);

    
    useEffect(() => {
        setVisibleData(filteredData.slice(0, itemsPerPage));
        setPage(1);
        setHasMore(filteredData.length > itemsPerPage);
    }, [filteredData]);


    useEffect(() => {
        if (!hasMore) return;

        const loadMoreData = () => {
            const nextPage = page + 1;
            const startIndex = (nextPage - 1) * itemsPerPage;
            const newData = filteredData.slice(startIndex, startIndex + itemsPerPage);

            if (newData.length > 0) {
                setVisibleData((prev) => [...prev, ...newData]);
                setPage(nextPage);
            } else {
                setHasMore(false);
            }
        };

       
        const observerCallback = (entries) => {
            if (entries[0].isIntersecting && hasMore) {
                loadMoreData();
            }
        };

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0,
        };

        observer.current = new IntersectionObserver(observerCallback, observerOptions);

      
        const lastElement = document.querySelector('.load-more-trigger');
        if (lastElement) {
            observer.current.observe(lastElement);
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [page, hasMore, filteredData]);

  
    const toggleTag = (tag) => {
        setSelectedTags((prev) =>
            prev.includes(tag)
                ? prev.filter((t) => t !== tag)
                : [...prev, tag]
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
          
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center gap-8 pl-40">
                        <div className="relative flex-1 max-w-4xl">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for products..."
                                className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                aria-label="Search for products"
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                    aria-label="Clear search"
                                >
                                    <X size={20} className="text-gray-400" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </header>

          
            <div className="max-w-7xl mx-auto px-4 py-6">
                {searchQuery && (
                    <div className="mt-6">
                        <h2 className="text-lg font-medium text-gray-900">
                            Showing results for "{searchQuery}"
                        </h2>
                    </div>
                )}

             
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 w-fit mx-auto">
                    {!visibleData.length ? (
                        <div className="text-center py-10">No products found.</div>
                    ) : (
                        visibleData.map((item) => (
                            <MarketCard key={item._id} data={item} />
                        ))
                    )}
                </div>

                
                {hasMore && (
                    <div className="load-more-trigger" style={{ height: '10px' }}></div>
                )}
            </div>
        </div>
    );
}

export default SearchBar;