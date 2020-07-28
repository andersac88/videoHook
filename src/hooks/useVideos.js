import { useState, useEffect } from "react";
import youtube from "../apis/youtube";


const KEY = "AIzaSyDE5PA9LDLdkAzAnyWYSb1Ahp84zuoZqG4";
const useVideos = (defaultSearchTerm) => {
	const [videos, setVideo] = useState([]);

	useEffect(() => {
		search(defaultSearchTerm);
	}, [defaultSearchTerm]);

	const search = async (term) => {
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
	};

	return [videos, search];
};

export default useVideos;
