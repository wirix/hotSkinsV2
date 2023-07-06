import { getRandomInt } from "../../helpers/getRandomInt";
import { ICaseInfo } from "../../interfaces/cases.interface";
import { IImagesCarousel } from "./CaseComponent";

export const createNewItemForInventory = (caseInfo: ICaseInfo) => {
  const idxItem = getRandomInt(0, caseInfo.skins.length - 1);
  const dropItem = caseInfo.skins[idxItem];
  const idxProperty = getRandomInt(0, dropItem.skinItems.length - 1);
  const newItem = {
    color: dropItem.color,
    skinId: dropItem.skinId,
    skinTitle: dropItem.skinTitle,
    type: dropItem.type,
    property: dropItem.skinItems[idxProperty].property,
    StatTrak: dropItem.skinItems[idxProperty].StatTrak,
    price: dropItem.skinItems[idxProperty].price,
    image: dropItem.skinItems[idxProperty].image
  };
  console.log('newItem', newItem);
  return newItem;
};

export const generateFakeItemsForCarousel = (caseInfo: ICaseInfo, count: number): IImagesCarousel[] => {
  const imagesCarousel: IImagesCarousel[] = [];
  for (let i = 0; i < count; i++) {
    const idx = getRandomInt(0, caseInfo.skins.length - 1);
    imagesCarousel.push({
      urlImg: caseInfo.skins[idx].skinItems[0].image,
      color: caseInfo.skins[idx].color
    });
  }
  return imagesCarousel;
};