

export const goodResponse = (res,message=null,data = null)=>{
    return res.status(200).json({
        success:true,
        message:message,
        data:data
    })
}


export const badResponse = (res,message=null,error = null)=>{
    return res.status(400).json({
        success:false,
        message:message,
        error:error
    })
}