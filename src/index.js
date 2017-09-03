//npm package that i use for this project
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';
// my local components
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
//api key from google
const API_KEY = "AIzaSyCDIkfjp4mOuwPFZz6_0a_dwO6mce0gw8Y";

//the beginning of the app component
class App extends Component {
  //the constructor the very first function that is ran in this component
  constructor(props) {
    super(props);
    //this is making the state at the start
    this.state = { 
      videos: [],
      selectedVideo: null
     };

     //this is running this in-class function with 'cat' as a parameter
     this.onSearchChange("cat"); 
  }
  //this is just a method that is created in this class
  onSearchChange(term) {
    //this is making an ajax request to the youtube api
    YTSearch({key: API_KEY, term: term}, (videos) => {
      //inside of this callback, we set the state of this componente
      //which will cause it to re-render
      this.setState({ 
        videos: videos,
        selectedVideo: videos[0]
        });
    });  
  }
  //the render method re-runs every time this components state is changed
  render() {
    const onSearchChange = _.debounce((term) => { this.onSearchChange(term) }, 300);

    //all render method must return some html
    return (
      <div>
        {/* these are the child components which we are passing properties to them */}
        <SearchBar onSearchTermChange={ onSearchChange }/>
        <VideoDetail video={ this.state.selectedVideo } />
        <VideoList 
        videos={ this.state.videos } 
        onVideoSelect={(video) => this.setState({selectedVideo: video})}
        />
      </div>
    )
  } 
}

ReactDOM.render(
  <App />,
  document.querySelector(".container")
);