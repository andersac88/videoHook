import React, { Component } from "react";
import SearchBar from "../components/SearchBar";
import youtube from "../apis/youtube";
import VideoList from "../components/VideoList";
import VideoDetail from "../components/VideoDetail";

const KEY = "AIzaSyDE5PA9LDLdkAzAnyWYSb1Ahp84zuoZqG4";

class App extends Component {
	state = {
		videos: [],
		selectedVideo: null,
	};

	componentDidMount() {
		this.onTermSubmit('cats')
	}

	onTermSubmit = async (term) => {
		const response = await youtube.get("/search", {
			params: {
				q: term,
				type: "video",
				part: "snippet",
				maxResults: 5,
				key: KEY,
			},
		});
		this.setState({
			videos: response.data.items,
			selectedVideo: response.data.items[0]
		});
	};

	onVideoSelect = (video) => {
		this.setState({ selectedVideo: video });
	};

	render() {
		return (
			<div className="ui container">
				<SearchBar onFormSubmit={this.onTermSubmit}> </SearchBar>
				<div className="ui grid">
					<div className="ui row">
						<div className="eleven wide column">
							<VideoDetail video={this.state.selectedVideo} />
						</div>
						<div className="five wide column">
							<VideoList
								onVideoSelect={this.onVideoSelect}
								videos={this.state.videos}
							></VideoList>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
