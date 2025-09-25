import v2 from "cloudinary"
import fs from "fs"

const uploader = async (localFilePath) => {
    try {
        v2.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        });
        if (!localFilePath) return null
        const response = await v2.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        console.log(error)
        fs.unlinkSync(localFilePath)
        return null
    }
}



const uploader2 = async (localFilePath) => {
    try {
        v2.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        });
        if (!localFilePath) return null
        const response = await v2.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        return response
    } catch (error) {
        console.log(error)
        return null
    }
}



export { uploader,uploader2 }