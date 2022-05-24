
exports.private = async(req, res, next)=>{
    res.status(200).json({
        success: true,
        data: "you access to private route data (:"
    })
}