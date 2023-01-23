import { patchClassImage, patchUserImage } from "../../api/pachRequests";

export function encodeImageFileAsURL(element, setImage) {
  //console.log("in encode image")
  var file = element.files[0];
  var reader = new FileReader();
  reader.onloadend = () => {
    console.log("the result it", reader.result),
      setImage({ data: reader.result, fileName: file });
  };
  reader.readAsDataURL(file);
}

export const saveImage = async (id, image, profileFlag) => {
  if (!profileFlag) {
    const response = await patchClassImage(id, image);
    console.log(response);
    location.reload();
  } else {
    const response = await patchUserImage(id, image);
    console.log(response);
    location.reload();
  }
};
