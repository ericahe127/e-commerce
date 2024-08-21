import axios from "axios"

const upload = async (file) => {
    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", "webdjj")

    try {
        const res = await axios.post("https://api.cloudinary.com/v1_1/dedmhwelb/image/upload", data) //https://cloudinary://823218558736483:sqmOq0sBb0SibK-BJ7zZHt5dybU@dedmhwelb
        const {url} = res.data
        return url
    } catch (error) {
        console.log(error)
    }
}

export default upload