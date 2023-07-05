# Image Proxy Server 

It will accept an image URL, download the image, and serve it to clients. Only 2Kb of the fist part of image is downloaded

## Routes
### `/` 
The root route serves an HTML page with a single `<img>` tag pointing to `/image`.

### `/image`
The `/image` route proxies a request to an external image URL, downloads the image data, and sends it back to the client. It has a maximum response size of 2 KB to prevent large images from being proxied.

## Usage
To run the server:
```bash
npm run start
```
Then you can access `/` in your browser to see the `<img>` tag, and it will proxy the request for the image source to the external URL.

