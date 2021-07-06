import fetch from 'node-fetch';

/**
 * Validate Youtube url
 * @param {string} youtubeUrl The url to validate
 * @returns {boolean} True, if given url is a valid Youtube video url. False, if not.
 */
export function validateUrl(youtubeUrl) {
    // Typical Youtube video url -> https://www.youtube.com/watch?v=C0DPdy98e4c
    try {
        const url = new URL(youtubeUrl);
        const protocol = url.protocol.toLowerCase();
        const hostname = url.hostname.toLowerCase();
        const pathname = url.pathname.toLowerCase();
        const vid = url.searchParams.get('v');
        return protocol === 'https:' && hostname === 'www.youtube.com' && pathname === '/watch' && vid;
    }
    catch {
        return false;
    }
}

/**
 * Get Youtube video ID
 * @param {string} youtubeUrl The url to parse
 * @returns {string} Youtube video ID, if given url is a valid Youtube video url. Undefined, if not.
 */
export function getVideoId(youtubeUrl) {
    if (validateUrl(youtubeUrl)) {
        const url = new URL(youtubeUrl);
        const vid = url.searchParams.get('v');
        return vid;
    }
}

/**
 * Get Youtube video title
 * @param {string} youtubeUrl The url to parse
 * @returns {Promise<string>} Youtube video title, if given url is a valid Youtube video url and fetching title was successful. Undefined, if not.
 */
export async function getVideoTitle(youtubeUrl) {
    if (validateUrl(youtubeUrl)) {
        try {
            // Using URL href here -> No need to deal with stuff like whitespaces
            const url = new URL(youtubeUrl);
            const href = url.href;
            const response = await fetch(`http://noembed.com/embed?url=${href}`);
            const obj = await response.json();
            const title = obj?.title ?? '';
            if (title) {
                return title;
            }
        }
        catch {
            // Do nothing -> Return undefined
        }
    }
}

/**
 * Get Youtube video thumbnail url
 * @param {string} youtubeUrl The url to parse
 * @returns {string} Youtube video thumbnail url, if given url is a valid Youtube video url. Undefined, if not.
 */
export function getVideoThumbnailUrl(youtubeUrl) {
    if (validateUrl(youtubeUrl)) {
        const url = new URL(youtubeUrl);
        const vid = url.searchParams.get('v');
        return `https://img.youtube.com/vi/${vid}/default.jpg`;
    }
}