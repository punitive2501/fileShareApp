const router = require('express').Router();
const multer = require('multer');
const document = require('./../Model/file');
const path = require('path');
const {v4: uuid4} = require('uuid');

// max-size of 3MB
const max_size = 3 * 1024 * 1024;

let storage = multer.diskStorage({
    destination: (req, file, callback)=> callback(null ,'uploads/'),
    filename: (req, file, callback) => {
        // create a unique name for the current file
        const name = `1234${Date.now() - Math.round(Math.random()*1E5)}${path.extname(file.originalname)}`;
        callback(null, name);
    }
});

let upload = multer({
    storage,
    limit: {
        fileSize: max_size
    }
}).single('file');

router.post('/', (req, res)=>{
    // Validate req
    
    upload(req, res, async (err)=>{
        // if file is not there so error
        if(err){
            return res.status(500).send({
                error: err.message
            })
        }
        try{    
            if(!req.file || req.file.size > max_size){
                return res.json({
                    error: "No file uploaded(File size exceeds 3MB)"
                });
            }

            /* Storing the data into DB */
            const new_doc = document({
                fileName: req.file.filename,
                path:req.file.path,
                size:req.file.size,
                uuid: uuid4()
            });

            const response = await new_doc.save();
            
            return res.json({
                message: "uploaded",
                file: `${process.env.APP_BASE_URL}/files/${response.uuid}`
            });

        }catch(err){
            console.log(err);
            return res.json({
                status: 400,
                message: err.message,
                error: "Something went wrong"
            })
        }
    });
});

module.exports = router;