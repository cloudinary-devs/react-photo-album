# Introduction
This project demonstrates how to use the [Cloudinary React SDK](https://cloudinary.com/documentation/react_integration) to create a photo album app. 

The sample project showcases the following functionality:

* Using the [Upload Widget](https://cloudinary.com/documentation/upload_widget) to upload images to your product environment
* Using the [Upload API](https://cloudinary.com/documentation/image_upload_api_reference) to upload images to your product environment
* Displaying transformed images

# Setup

Create an unsigned upload preset in your Cloudinary product environment and make note the name of the unsigned upload preset as well as your Cloudinary cloud name.

Create a `.env` file with the following content at the root of the project:

```
VITE_CLOUD_NAME='YOUR-CLOUD-NAME'
VITE_UPLOAD_PRESET='YOUR-UNSIGNED-UPLOAD-PRESET'
```

# Run

From your terminal run `npm run dev` and follow the instructions to see this sample project.
