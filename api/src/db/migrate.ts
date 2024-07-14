import ExtraAnnotation from "./model/ExtraAnnotation";
import Image from "./model/Image";
import User from "./model/User";


const migrate = async(force = false) => {
    await User.sync({force})
    await Image.sync({ force })
    await ExtraAnnotation.sync({force})
}


export default migrate;