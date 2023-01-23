import './App.css';
import React, { Component } from 'react'
import LoadingBar from 'react-top-loading-bar'

//npm react-router-dom
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"

import Navbar from './Components/Navbar';
import News from './Components/News';


export default class App extends Component {
  
  pageSize = 15;
  // apiKey= process.env.REACT_APP_NEWS_API 
  apiKey= " " 

  state = {
    progress: 0
  }

  //always create arrow function in such situations
  setProgress = (progress)=>{
    this.setState({progress: progress})
  }


  //render() method is used to render HTML of the component in react.This method is required for a class based componenet to render DOM.
  render() {

    return (
      <div>
        <Router>

          <Navbar/>

          {/* npm i react-top-loading-bar: check documentation */}
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}                //according to documentation, the "progress" will go from 0-100
          />

          <Routes>
            {/* here, "key" is used to re-mount the componentDidMount() function because without "key", componentDidMount() will not update new components */}
            <Route exact path='/' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="home" pageSize={this.pageSize} country='in' category='general' />}></Route>  
            <Route exact path='/business' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={this.pageSize} country='in' category='business' />}></Route>  
            <Route exact path='/entertainment' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} country='in' category='entertainment' />}></Route>  
            <Route exact path='/general' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pageSize} country='in' category='general' />}></Route>  
            <Route exact path='/health' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={this.pageSize} country='in' category='health' />}></Route>  
            <Route exact path='/science' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={this.pageSize} country='in' category='science' />}></Route>  
            <Route exact path='/sports' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={this.pageSize} country='in' category='sports' />}></Route>  
            <Route exact path='/technology' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={this.pageSize} country='in' category='technology' />}></Route>  
          </Routes>
            
        </Router>
      </div>
    )
  } 
}



