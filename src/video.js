import React, { useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
// Swipable Video player
function Video({ video_source_url, dontLikeVideo, nextVideo, likeVideo}) {
    let start = Date.parse('01 Jan 1970 00:00:00 GMT');


    const handlers = useSwipeable({
        onSwipedRight: (eventData) => dontLikeVideo(),
        onSwipedLeft: (eventData) => nextVideo(),
        onTap: (eventData) => {
            if(start + 500 > Date.now())
                likeVideo();
            else start = Date.now();
        },
        trackMouse: true
      });

    return (
        <div {...handlers} style={{ overflow: 'wrap', width: '100%', height: '360px', maxWidth: '100%' }}>
            <video {...handlers} className="video__player" autoPlay muted height="auto" width="100%" src={video_source_url} />
        </div>
    );
}

export default Video;
