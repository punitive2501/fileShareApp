const router = require('express').Router();
const File = require('./../Model/file');
/* take us to download/error page */

router.get('/:uuid', async (req, res)=>{
    try{
        // fetch file
        const file_srch = await File.findOne({
            uuid: req.params.uuid  
        });
    
        if(!file_srch){
            return res.render('err_page', 
            {error: "Wrong/Expired Link"});
        }

        return res.render('err_page', {
            Success: "The following File Found",
            fileName: file_srch.fileName,
            uuid: file_srch.uuid,
            fileSize: file_srch.size,
            downloadLink: `${process.env.APP_BASE_URL}/files/download/${file_srch.uuid}`
        });

    }catch(err){
        /* in case of err EJS searches in Views folder for 'err_page' */
        return res.render('err_page', 
            {error: "something went wrong"});
    }
});

module.exports = router;