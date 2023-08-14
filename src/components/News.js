import React, { useEffect, useState } from 'react'
import NewsComponent from './NewsComponent'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export default function News(props) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const updateNews = async (pageNo) => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${props.apiKey}&page=${pageNo}&category=${props.category}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        setArticles(parsedData.articles);
        setLoading(false);
        setPage(pageNo);
        setTotalResults(parsedData.totalResults);
        props.setProgress(100);
    }
    useEffect(() => {
        updateNews(1);
        document.title = `News App - ${props.category}`
    }, []);
    
    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${props.apiKey}&page=${page + 1}&category=${props.category}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setPage(page+1);
    }
    return (
        <div className='container'>
            <h1 className="h2 text-center p-2" style={{marginTop: '90px'}}>News App - Top Headlines from {props.category}</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                <div className="row m-2 p-2">
                    {articles.map((elem) => {
                        return (<div className="col-md-4" key={elem.url}>
                            <NewsComponent title={elem.title ? elem.title.slice(0, 50) : ""} description={elem.description ? elem.description.slice(0, 88) : ""} imgUrl={elem.urlToImage} newsUrl={elem.url} publishedAt={elem.publishedAt} source={elem.source.name} author={elem.author} />
                        </div>)
                    })}
                </div>
            </InfiniteScroll>
        </div>
    )

}

News.defaultProps = {
    country: "in",
    pageSize: 15,
    category: 'general',
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}