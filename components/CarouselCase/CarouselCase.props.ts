import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";
import { BigCarouselType, IsOpeningType, SmallCarouselType } from "../../redux/slices/carouselSlice";

export interface CarouselCaseProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isOpening: IsOpeningType;
  carouselParams: BigCarouselType | SmallCarouselType;
}