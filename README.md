# Introduction
This project demonstrates how to use the [Cloudinary React SDK](https://cloudinary.com/documentation/react_integration) to create a photo album app. 

The sample project showcases the following functionality:

* Using the [Upload Widget](https://cloudinary.com/documentation/upload_widget) to upload images to your product environment
* Using the [Upload API](https://cloudinary.com/documentation/image_upload_api_reference) to upload images to your product environment
* [Transforming](https://cloudinary.com/documentation/image_transformations) and [displaying](https://cloudinary.com/documentation/react_image_transformations#plugins) images

# Setup

[Create an unsigned upload preset](https://cloudinary.com/documentation/upload_presets#creating_and_managing_upload_presets) in your Cloudinary product environment and make note the name of the unsigned upload preset as well as your Cloudinary cloud name.

Create a `.env` file with the following content at the root of the project:

```
VITE_CLOUD_NAME='YOUR-CLOUD-NAME'
VITE_UPLOAD_PRESET='YOUR-UNSIGNED-UPLOAD-PRESET'
```

# Run

From your terminal, in the **react-pa** folder, run: 

* `npm i`
* `npm run dev` 

Then, click the localhost link to open the app in your browser.

Try uploading images using each of the upload tabs, then see your images displayed in the Photo Album tab.

# Explore

* Take a look at the source code to understand how it works.  
* Discover more in the [Cloudinary Docs](https://cloudinary.com/documentation).
* Ask for help in our [Community Forum](https://community.cloudinary.com/), in [Discord](https://discord.gg/Cloudinary), or [raise a support request](https://support.cloudinary.com/hc/en-us/requests/new).

