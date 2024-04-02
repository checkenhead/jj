import ImgUser from '../images/user.png';
import ImgDefault from  '../images/pic.png';


export const getUserimgSrc = (member) => {
    if (member.provider === "Kakao") {
        return member.profileimg
    } else if (member.profileimg === null) {
        return ImgUser
    } else {
        return process.env.REACT_APP_IMG_SRC + member.profileimg
    }
}

export const getFeedimgSrc = (filename) => {
    if (filename === null){
        return ImgDefault
    }else{
        return process.env.REACT_APP_IMG_SRC + filename
    }
}