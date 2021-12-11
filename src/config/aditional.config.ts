import cloudinary from 'cloudinary';

export const cloudinaryConfig = ()=>{
    cloudinary.v2.config({ 
        cloud_name: 'dezhqt17n', 
        api_key: '915192935639786', 
        api_secret: 'k-GAHGHQsxMjJRysNXWVXwpqWrE',
        secure: true
      });
}