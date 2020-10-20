export async function deleteVideo(videoId, setVideos) {
    const args = {
        method: 'DELETE',
        headers: {
            'X-CSRF-Token': document.querySelector('[name=csrf-token]').getAttribute('content'),
        },
    };

    await fetch(`${location.origin}/api/videos/${videoId ?? 0}`, args)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
        })
        .then(data => {
            if (data) setVideos(p => p.filter(video => video !== data.videoId));
        });
}

export async function setVideo() {
    
}
