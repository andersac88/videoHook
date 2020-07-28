import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import youtube from "../apis/youtube";
import VideoList from "../components/VideoList";
import VideoDetail from "../components/VideoDetail";

const KEY = "AIzaSyDE5PA9LDLdkAzAnyWYSb1Ahp84zuoZqG4";

const App = () => {
	const [videos, setVideo] = useState([]);
	const [selectedVideo, setSelectedVideo] = useState(null);

	useEffect(() => {
		onTermSubmit("cats");
	}, []);

	const onTermSubmit = async (term) => {
		const response = await youtube.get("/search", {
			params: {
				q: term,
				type: "video",
				part: "snippet",
				maxResults: 5,
				key: KEY,
			},
		});

		setVideo(response.data.items);
		setSelectedVideo(response.data.items[0]);
	};

	const onVideoSelect = (video) => {
		setSelectedVideo(video);
	};

	return (
		<div className="ui container">
			<SearchBar onFormSubmit={onTermSubmit}> </SearchBar>
			<div className="ui grid">
				<div className="ui row">
					<div className="eleven wide column">
						<VideoDetail video={selectedVideo} />
					</div>
					<div className="five wide column">
						<VideoList
							onVideoSelect={onVideoSelect}
							videos={videos}
						></VideoList>
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
