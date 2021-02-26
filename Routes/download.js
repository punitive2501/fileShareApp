const router = require('express').Router();
const File = require('./../Model/file');

router.get('/:uuid', async(req, res)=>{    
    try{
        // fetch file

        const file_srch = await File.findOne({
            uuid: req.params.uuid  
        });

        if(!file_srch){
            return res.render('err_page', 
            {error: "Wrong/Expired Link"});
        }

        const path = `${__dirname}/../${file_srch.path}`;
        res.download(path);

    }catch(err){
        /* in case of err EJS searches in Views folder for 'err_page' */
        return res.render('err_page', 
            {error: "something went wrong"});
    }
});

module.exports = router;