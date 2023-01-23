import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

//flow of application: first constructor will run then render() then react updates DOM and then componenetDidMount() will run.
export class News extends Component {

    
    static defaultProps = {
        country: 'in',
        pageSize: 15
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number
    }
    
    //constructor is very first thing than runs. It runs even before render().
    //using constructor. Note: always use super keyword while using using constructor.
    constructor(props){
        super(props);
        // console.log("This is a constructor from news component"); 

        //here articles, page, etc are "states"
        this.state = {
            articles: [ ],                          
            page : 1,
            pageLimit: 0,
            loading: true,
            totalResults: 0
        } 

        document.title = `NewsApp - ${this.firstLetterCapital(this.props.category)}`
    }
    

    //in short, componentDidMount() will run for only once just after render()
    async componentDidMount(){
        this.props.setProgress(20);
        console.log("componentDidMount")
        // https://newsapi.org/v2/top-headlines?country=in&apiKey=1a09f2025e6f4a13add19add84f56e26&page=1&pageSize=20
        let url = ""                     //api link
        url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`
        this.setState({loading: true})
        let data = await fetch(url)                     //it will wait for the promise to resolve
        // console.log(data)
        let parsedData = await data.json()
        // console.log(parsedData)

        let pageLimit = Math.ceil(parsedData.totalResults/this.props.pageSize)           //logic to limit the next and previous button.
        console.log(pageLimit);

        this.setState({                                //this is how you should update "state" ie "articles" value in class base component
            articles: parsedData.articles,
            pageLimit: pageLimit,
            loading: false,
            totalResults: parsedData.totalResults        
        })  
        
        this.props.setProgress(100); 

    }

    
    async updateNews(){
        //below url will show us the second page of the api site.
        // https://newsapi.org/v2/top-headlines?country=in&apiKey=1a09f2025e6f4a13add19add84f56e26&page=2
        //&pageSize=20 means that each page should display atmost 20 news.
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`; 
        this.setState({loading: true})
        let data = await fetch(url)
        let parserdData = await data.json();
        await this.setState({
            loading: false,
            articles: parserdData.articles,
            totalResults: parserdData.totalResults 
        })
    }



    //function to capitalize first letter of the word
    firstLetterCapital = (alphabet)=>{
        return alphabet.charAt(0).toUpperCase() + alphabet.slice(1)
    }



    // handleNextClick = async ()=>{
    //     await this.setState({
    //         page: this.state.page + 1,
    //         pageLimit: this.state.pageLimit - 1
    //     })
    //     this.updateNews()
    // }

    // handlePrevClick = async ()=>{
    //     await this.setState({
    //         page: this.state.page - 1,
    //         pageLimit: this.state.pageLimit + 1
    //     })
    //     this.updateNews()
    // }


    fetchMoreData = async ()=>{
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`; 
        let data = await fetch(url)
        let parserdData = await data.json();
        console.log("fetchMoreData function")
        this.setState({
            articles: this.state.articles.concat(parserdData.articles),             //concatinating old data(ie; news) with the newly fetched data.
            totalResults: parserdData.totalResults,
            page: this.state.page + 1 
        })
    }



    //render() will always run after any execution or changes on the website.
    render() {
        console.log("render");  
        console.log(this.state.articles.length)
        console.log(this.state.totalResults)
        
        return (
        <div className='container my-3'>
            {/* if below logic is true then spinenr will run */}
            {this.state.loading && <Spinner/>}      
            <h2 className='text-center'>Top Headlines - {this.firstLetterCapital(this.props.category)}</h2>   

            
            {/*code for ininite scrolling:  npm i react-infinite-scroll-component: see documentation */}
            <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.articles.length !== this.state.totalResults}
                loader={<Spinner/>} >
            
                <div className="container">
                    <div className="row">
                        {/* use "this" keyword while fetching 'state' in class based component */}
                        {this.state.articles.map((element)=>{
                            // {console.log(element)}
                            // below, "key" is used because whenever map is used then each element should have a unique key. And the "key" should be placed in that 
                            // tag which is returning and here url is unique ie why it is key. And in the below case <div> is returning.
                            return <div className="col-md-4" key={element.url}>
                                {/* below, <NewsItem is a component which is used inside another component. And title and description are the props value that are being passed*/}
                                {/* if element.title is equal to null in api json then the empty string will be displayed. */}
                                <NewsItem title= {element.title ? element.title : ""} description={element.description ? element.description.slice(0,88) : ""} 
                                imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>    
                            </div>                    
                        })}
                    </div> 
                </div>
            
            </InfiniteScroll>
                                




            {/*below, you have to use "this" in this.handlePrevClick because you are in a class*/}
            {/* <div className="container d-flex justify-content-between">
                <button disabled={this.state.page <= 1} type='button' className='btn btn-dark' onClick={this.handlePrevClick}> &larr; Previous</button>
                <button disabled={this.state.pageLimit === 1} type='button' className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>
            </div> */}



            
        </div>
        
        )
    }
}

export default News 