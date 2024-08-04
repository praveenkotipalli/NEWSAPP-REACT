import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

const NewsBoard = () => {
    const [articles, setArticles] = useState([]);
    const [category, setCategory] = useState("general");
    const [country, setCountry] = useState("us");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
    const countries = [
        { code: 'us', name: 'United States' },
        { code: 'gb', name: 'United Kingdom' },
        { code: 'ca', name: 'Canada' },
        { code: 'au', name: 'Australia' },
        { code: 'in', name: 'India' }
        // Add more countries as needed
    ];

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            setError(null);

            let url = searchQuery 
                ? `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=9c5b49851dda45b49a099568d96bac7c`
                : `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=9c5b49851dda45b49a099568d96bac7c`;

            if (startDate) {
                url += `&from=${startDate}`;
            }
            if (endDate) {
                url += `&to=${endDate}`;
            }

            try {
                const response = await fetch(url);
                const data = await response.json();
                if (response.ok) {
                    setArticles(data.articles);
                } else {
                    throw new Error(data.message);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [category, country, startDate, endDate, searchQuery]);

    return (
        <div>
            <h2 className="text-center">
                <span className="badge text-bg-danger">Latest News</span>
            </h2>
            <div className="d-flex justify-content-center mb-3">
                <select className="form-select mx-2" value={country} onChange={(e) => setCountry(e.target.value)}>
                    {countries.map(({ code, name }) => (
                        <option key={code} value={code}>{name}</option>
                    ))}
                </select>
                <select className="form-select mx-2" value={category} onChange={(e) => setCategory(e.target.value)}>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                    ))}
                </select>
                <input 
                    type="date" 
                    className="form-control mx-2" 
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)} 
                />
                <input 
                    type="date" 
                    className="form-control mx-2" 
                    value={endDate} 
                    onChange={(e) => setEndDate(e.target.value)} 
                />
                <input
                    type="text"
                    className="form-control mx-2"
                    placeholder="Search for news"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            {loading ? (
                <div className="text-center">Loading...</div>
            ) : error ? (
                <div className="text-center text-danger">Error: {error}</div>
            ) : (
                <div className="d-flex flex-wrap justify-content-center">
                    {articles.length > 0 ? (
                        articles.map((news, index) => (
                            <NewsItem 
                                key={index} 
                                title={news.title} 
                                description={news.description} 
                                src={news.urlToImage} 
                                url={news.url} 
                            />
                        ))
                    ) : (
                        <div className="text-center">No news articles found</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default NewsBoard;
