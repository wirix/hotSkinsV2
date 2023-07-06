import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";
import { BigCarouselType, IsOpeningType, SmallCarouselType } from "../../redux/slices/carouselSlice";
import { IImagesCarousel } from "../../page-components";

export interface CarouselCaseProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isOpening: IsOpeningType;
  carouselParams: BigCarouselType | SmallCarouselType;
  imagesCarousel: IImagesCarousel[];
}