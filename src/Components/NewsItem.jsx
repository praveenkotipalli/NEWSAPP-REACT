const NewsItem = ({ title, description, url }) => {
    return (
        <div className="card m-3" style={{ maxWidth: "345px" }}>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <a href={url} className="btn btn-primary">Read more...</a>
            </div>
        </div>
    );
};

export default NewsItem;
