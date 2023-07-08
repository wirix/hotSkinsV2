import { useEffect, useRef, useState } from 'react';
import { CarouselCaseProps } from './CarouselCase.props';
import styles from './CarouselCase.module.css';
import cn from 'classnames';
import { SkinCard } from '../SkinCard/SkinCard';
import { getRandomInt } from '../../helpers/getRandomInt';
import { useActionCreators } from '../../redux/store';
import { carouselActions } from '../../redux/slices/carouselSlice';

export const CarouselCase = ({ imagesCarousel, carouselParams, isOpening, className, ...props }: CarouselCaseProps): JSX.Element | null => {
  const carouselAction = useActionCreators(carouselActions);
  const itemRef = useRef<HTMLDivElement | null>(null);
  // not change
  const [positionCarousel, setPositionCarousel] = useState<number>(-55);

  const rollCarousel = () => {
    if (!itemRef.current || isOpening !== 'opening') {
      return;
    }
    // rigth border of item in css
    const borderLengthPx = 2;
    const randomInt = getRandomInt(0, carouselParams.randomRange);
    // width item with border
    const wholeWidthItem = carouselParams.width + borderLengthPx;
    // show how far from the start
    const rangeX = (imagesCarousel.length - 6 + carouselParams.swapNextItem) * wholeWidthItem + randomInt;
    itemRef.current.style.transition = `all ${carouselParams.timeTransition}s cubic-bezier(0.25, 0.1, 0.25, 1)`;
    setPositionCarousel(positionCarousel - rangeX);
    setTimeout(() => {
      carouselAction.setIsOpening('opened');
    }, carouselParams.timeTransition*1000 + 500);
  };

  useEffect(() => {
    rollCarousel();
  }, [isOpening]);

  if (isOpening !== 'opening') {
    return null;
  }

  return (
    <div
      className={cn(styles.container, className)}
      style={{ height: carouselParams.height + 11 }}
      {...props}
    >
      <div
        className={styles.carouselCase}
        style={{ height: carouselParams.height }}
      >
        <span
          className={styles.centerBorder}
          style={{ height: carouselParams.height }}
        ></span>
        <div
          className={styles.itemContainer}
          style={{ left: `${positionCarousel}px` }}
          ref={itemRef}
        >
          {imagesCarousel.map((skinItem, index) => (
            <div key={index} className={styles.item}>
              <SkinCard
                width={carouselParams.width}
                height={carouselParams.height}
                color={skinItem.color}
                urlImg={skinItem.urlImg}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};