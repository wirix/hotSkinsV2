import { getRandomInt } from "../../helpers/getRandomInt";
import { ICaseInfo } from "../../interfaces/cases.interface";
import { csgoItem } from "../../interfaces/items.interface";
import { IImagesCarousel } from "./CaseComponent";
import { v4 as uuidv4 } from 'uuid';

export const createNewItemForInventory = (caseInfo: ICaseInfo): csgoItem => {
  const idxItem = getRandomInt(0, caseInfo.skins.length - 1);
  const dropItem = caseInfo.skins[idxItem];
  const idxProperty = getRandomInt(0, dropItem.skinItems.length - 1);
  const newItem = {
    color: dropItem.color,
    skinId: dropItem.skinId,
    title: dropItem.skinTitle,
    type: dropItem.type,
    property: dropItem.skinItems[idxProperty].property,
    statTrak: dropItem.skinItems[idxProperty].StatTrak,
    price: dropItem.skinItems[idxProperty].price,
    urlImg: dropItem.skinItems[idxProperty].image,
    skinKey: uuidv4() as string
  };
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