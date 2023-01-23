import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {description, imageUrl, newsUrl, author, date} = this.props;                        //this is how you write props in "class based component"
    return (
        <div className='my-3'>
            <div className="card" style={{width: "18rem"}}>
                <img src={imageUrl} className="card-img-top" alt="..."/>
                <div className="card-body">
                  {/* we can access props like below also ie; this.props.title  */}
                    <h5 className="card-title">{this.props.title}</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-muted">By {author===null ? 'unknown' : author} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary" rel="noreferrer">Read more</a>
                </div>
            </div>
        </div>
    )
  }
}

export default NewsItem

