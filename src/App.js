import React, { useState } from 'react';
import './App.css';
import Video from './video';


//TODO on upload use AI to generate the haiku based on the hash tags, they should describe the video and the feeling.

function App() {
  let initialVideoData = [
    {
      title: "New Dawn",
      haiku: "In dawn's soft embrace,<br>Tulip's petals unfurl wide,<br>New day's bloom begins.",
      videoUrl: "media/flower.webm",
      hashtags: ["flower", "beginings"]
    },
    {
      title: "Elevated Ideals",
      haiku: "Ideals ascend high,<br>Mountain train climbs with purpose,<br>Peak dreams await us.",
      videoUrl: "media/train.webm",
      hashtags: ["train", "uplifting"]
    },
    {
      title: "Race Day",
      haiku: "Race day arrives fast,<br>Hooves thunder, hearts quicken pace,<br>Anxious riders soar.",
      videoUrl: "https://upload.wikimedia.org/wikipedia/commons/1/18/Muybridge_race_horse.webm",
      hashtags: ["horse", "nervous"]
    },
    {
      title: "Plain Sailing",
      haiku: "Storm-tossed waves crash down,<br>Overwhelmed by nature's might,<br>Seeking calm within.",
      videoUrl: "https://upload.wikimedia.org/wikipedia/commons/transcoded/8/85/Rough_Sea_at_Dover_1896_Birt_Acres_Robert_W_Paul.webm/Rough_Sea_at_Dover_1896_Birt_Acres_Robert_W_Paul.webm.720p.vp9.webm",
      hashtags: ["storm", "overwhelmed"]
    }
  ];

  const [videoData, setVideoData] = useState(initialVideoData);
  const [videoIdx, setVideoIdx] = useState(0);
  const [favorites, setFavorites] = useState([]);

// removes video from list if it has any of the same hashtags as the current video
  const dontLikeVideo = () => {
    console.log("dontLikeVideo idx: ", videoIdx, " length: ", videoData.length);
    let currentVideo = videoData[videoIdx];
    let updatedVd = videoData.filter(v => !currentVideo.hashtags.some(r => v.hashtags.includes(r)));
    if (updatedVd.length > 1) {
      setVideoData(updatedVd);
      setVideoIdx((videoIdx + 1) % updatedVd.length); // Change to the URL of the new video, loop roound if necessary
    }
  };

  // adds hashtags to favorites and moves to the next video
  const likeVideo = () => {
    console.log("favorites: ", favorites, " videoData[videoIdx].hashtags: ", ...videoData[videoIdx].hashtags)
    setFavorites([...favorites, ...videoData[videoIdx].hashtags]);
    nextVideo();
  };

  const nextVideo = () => {
    console.log("nextVideo idx: ", videoIdx, " length: ", videoData.length);
    setVideoIdx((videoIdx + 1) % videoData.length);
  };

  return (
    <div className="app">
      <section id="why-choose-1821">
        <div class="cs-container">
          <div class="cs-content">
            <span class="cs-topper">Clip Clop</span>
            <h2 class="cs-title"> {videoData[videoIdx].title}
              {favorites.some(r => videoData[videoIdx].hashtags.includes(r)) && <img src='heart-icon-3335.png' height="40" width="auto" />}
            </h2>
            <span class="cs-topper">
              {videoData[videoIdx].hashtags.map((hashtag, idx) => (
                <span key={idx}>#{hashtag}&nbsp;</span>
              ))}
            </span>
            <picture class="cs-picture">
              <Video video_source_url={videoData[videoIdx].videoUrl} dontLikeVideo={dontLikeVideo} nextVideo={nextVideo} likeVideo={likeVideo} />
            </picture>
          </div>

          <ul class="cs-card-group">
            <li class="cs-item">
              <img class="cs-icon" loading="lazy" decoding="async" src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/Icons/red-flower.svg" alt="icon" width="32" height="32" />
              <div class="cs-item-wrapper">
                <p class="cs-item-text" dangerouslySetInnerHTML={{ __html: videoData[videoIdx].haiku }} />
              </div>
            </li>
            <li class="cs-item">
              <img class="cs-icon" loading="lazy" decoding="async" src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/Icons/red-layer.svg" alt="icon" width="32" height="32" />
              <div class="cs-item-wrapper">
                <span><button class="cs-button-solid" onClick={dontLikeVideo}><p class="cs-item-text">Not for Me</p></button>&nbsp;&nbsp;
                  <button class="cs-button-solid" onClick={nextVideo}><p class="cs-item-text">Next</p></button></span>
              </div>
            </li>

          </ul>
        </div>
      </section>
    </div>
  );
}

export default App;
