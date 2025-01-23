import React, { useState, useEffect, useCallback, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useUnsplashAPI, {PER_PAGE} from "../../hooks/useUseUnsplashAPI";
import { useSearch } from "../../hooks/useSearch";
import { toast } from "react-toastify";

const List = () => {
    const { query } = useSearch();
    const { fetchImages, loading, error } = useUnsplashAPI();

    const [items, setItems] = useState<string[]>([]);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

    const queryPhraseExist = useMemo(() => query.length > 2, [query]);

    const fetchMoreData = useCallback(async () => {
        try {
            const newImages = await fetchImages(query, page);
            setItems((prev) => [...prev, ...(newImages || []).map((img: any) => img.urls.small)]);
            if (newImages.length < PER_PAGE) {
                setHasMore(false);
            }
            setPage((prev) => prev + 1);
        } catch (err) {
            setHasMore(false);
        }
    }, [fetchImages, query, page]);

    useEffect(() => {
        if (error && queryPhraseExist) {
            toast.error(error, {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    }, [error, queryPhraseExist]);

    useEffect(() => {
        if (queryPhraseExist) {
            setItems([]);
            setPage(1);
            setHasMore(true);
            setIsInitialLoad(true);
        } else if (query === '') {
            setItems([]);
            setPage(1);
            setHasMore(false);
            setIsInitialLoad(false);
        }
    }, [query, queryPhraseExist]);

    useEffect(() => {
        if (queryPhraseExist && isInitialLoad) {
            fetchMoreData();
            setIsInitialLoad(false);
        }
    }, [queryPhraseExist, isInitialLoad, fetchMoreData]);

    const gridContent = useMemo(() => (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {items.map((url, index) => (
                <div key={`${url}-${index}`} className="p-2">
                    <img src={url} alt={`Unsplash ${index}`} className="w-full" />
                </div>
            ))}
        </div>
    ), [items]);

    return (
        <div>
            {!queryPhraseExist && (
                <p className='text-green-600'>
                    Please write query in search box, it should contain more than two characters
                </p>
            )}
            <InfiniteScroll
                dataLength={items.length}
                next={fetchMoreData}
                hasMore={hasMore && queryPhraseExist}
                loader={loading && <h4>Loading...</h4>}
                endMessage={queryPhraseExist && !error ? <p>No images to load</p> : ''}
            >
                {gridContent}
            </InfiniteScroll>
        </div>
    );
};

export default List;
