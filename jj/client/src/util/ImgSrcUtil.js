import ImgUser from '../images/user.png';

export const getImgSrc = (member) => {
    if (member.provider === "Kakao") {
        return member.profileimg
    } else if (member.profileimg === null) {
        return ImgUser
    } else {
        return process.env.REACT_APP_IMG_SRC + member.profileimg
    }
}