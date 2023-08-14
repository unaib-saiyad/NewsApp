import React from 'react'

export default function NewsComponent(props) {
    let { title, description, imgUrl, newsUrl, publishedAt, author, source } = props;
    return (
      <>
        <div className="card">
          <span className="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-warning">
            <span className="visually-hidden">{source?source:"unknown"}</span>
          </span>
          <img className="card-img-top img-thumbnail" style={{ height: "200px" }} src={imgUrl} alt="" />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">Published By: {author ? author : "unknown"}</small></p>
            <p className="card-text"><small className="text-muted">Published At: {publishedAt ? new Date(publishedAt).toGMTString() : "Unknown"
            }</small></p>
            <a href={newsUrl} className="btn btn-sm btn-primary">Read More</a>
          </div>
        </div>
      </>
    )
}
