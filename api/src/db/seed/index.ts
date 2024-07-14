import migrate from "../migrate"
import ExtraAnnotation from "../model/ExtraAnnotation";
import Image from "../model/Image"
import User from "../model/User"



const seed = async() => {
    await migrate(true);
    const user = await User.create({ email: "hossamhamza.hm@gmail.com" })

    // const image = await Image.create({ file_name: "img1.png", file_extension: 'png', user_pk: user.pk }, { include: [{ model: User, as: 'user' }] });
    // const extra_annotation = await ExtraAnnotation.create({ image_pk: image.pk, key: 'color', value: "black" });

    // const found_user = await User.findOne({ include: [{ model: Image, as: 'images' }] });
    // const found_image = await Image.findOne({ include: [{ model: User }, { model: ExtraAnnotation, as: 'extra_annotations' }]});

    // if (found_image){
    //     console.log(found_image.dataValues)
    //     console.log(found_image.dataValues.extra_annotations)
    // }
    // if (found_user) console.log(found_user.dataValues)
}

seed();