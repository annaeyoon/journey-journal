import express from 'express';
import AWS from 'aws-sdk';
import multer from 'multer';

AWS.config.update({
    accessKeyId: 'AKIAZDZTBZEFWWX5YADK',  // Replace with your IAM access key
    secretAccessKey: import.meta.env.VITE_S3_SECRET_KEY,  // Replace with your IAM secret key
    region: 'us-east-1'  // e.g., 'us-west-2'
  });

const s3 = new AWS.S3();

const storage = multer.memoryStorage();  // Store file in memory (you can also use diskStorage)
const upload = multer({ storage: storage });
const username = sessionStorage.getItem('username');

function uploadPicture() {
    const params = {
        Bucket: 'irvinehacks2025',  
        Key: 'uploads/' + username + '/' + req.file.originalname,  // The object key (filename)
        Body: req.file.buffer,  // The file content
        ContentType: req.file.mimetype,
        ACL: 'public-read'  // Set the file to be publicly readable
      };
    
      s3.upload(params, (err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).send('Error uploading file');
        }
    
        res.send(`File uploaded successfully: ${data.Location}`);
      });
    
}

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }
    uploadPicture();
  
  });
  