import React, { useRef, useState } from 'react';


function Video({ video_source_url }) {
    return (
        <div style={{overflow: 'wrap', width: '100%', height: '360px',  maxWidth: '100%'}}>
            <video className="video__player" autoPlay muted height="auto" width="100%" src={video_source_url} />
        </div>
    );
}

export default Video;
