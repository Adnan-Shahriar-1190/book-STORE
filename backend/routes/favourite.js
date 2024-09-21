const router = require("express").Router();
const User = require( "../models/user");
const { authenticateToken } = require("./userAuth");

//put book to favourites
router.put("/add-to-favourites",authenticateToken,async(req,res)=>{
    try{
        const {bookid, id}=req.headers;
        const userData = await User.findById(id);
        const isBookinFavourites = userData.favourites.includes(bookid);
        if(isBookinFavourites){
            return res.json({
                status: " Success",
                message: "Book is already in favourites",
            });
        }
        await User.findByIdAndUpdate(id,{
            $push: {favourites: bookid},
        });
        return res.json({
            status: "Success",
            message: "Book added to favourites",
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "An error occurred"});
    }
});
router.put("/remove-from-favourites/:bookid",authenticateToken,async(req,res)=>{
    try{
        const {bookid}=req.params;
        const { id }=req.headers;
        await User.findByIdAndUpdate(id , {
            $pull: { favourites : bookid},
        });

        return req.json({
            status: "Success",
            message: "Book remove from favourites",
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "An error occurred"});
    }
});
router.get("/get-user-favourites",authenticateToken,async(req,res)=>{
    try{
        const {id}=req.headers;
        const userData= await User.findById(id).populate("favourites");
        const favouritesBooks =userData.favourites.reverse();
        return res.json({
            status: "Success",
            data: favouritesBooks,
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "An error occurred"});
    }
});
module.exports =router;