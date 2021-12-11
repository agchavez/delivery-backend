
//Subir imagen a Cloudinary
import cloudinary from 'cloudinary';
cloudinary.v2.config({
    cloud_name: 'dezhqt17n',
    api_key: '915192935639786',
    api_secret: 'k-GAHGHQsxMjJRysNXWVXwpqWrE'
});
//Delete image from Cloudinary by url
export const deleteImage = async (url: string) => {
    const result = await cloudinary.v2.uploader.destroy(url);
    return result;
};
//Update image from Cloudinary by url
export const updateImage = async (url: string, file: any, folder:string) => {
    try {
        //Divde the url to get the name of the image
        const name = url.split('/').pop()?.split('.')[0];
        
        //Upload the image to Cloudinary
        const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
            public_id: name,
            overwrite: true,
            folder: folder
        })
        return result.url;
    } catch (error) {
        return ""
    
}}
export const uploadImg = async (file: any, folder: string): Promise<string> => {
   
    try {
        const url = await cloudinary.v2.uploader.upload(file.tempFilePath, {
            folder,
        use_filename: true,
        unique_filename: false
        });
        return url.url;
    } catch (error) {
        console.log(error);
        throw new Error('There was an error uploading the image');
    }
}