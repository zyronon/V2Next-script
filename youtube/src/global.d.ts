declare global {
    interface Window {
        videoEl?: HTMLVideoElement,
        rate: number,
        funs: {
            checkWatchPageDiv: Function
        },
    }
}

export {}
