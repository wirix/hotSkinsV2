import { FC, useEffect, useRef, useState } from 'react';
import { CarouselCaseProps } from './CarouselCase.props';
import styles from './CarouselCase.module.css';
import cn from 'classnames';
import { SkinCard } from '../SkinCard/SkinCard';
import { getRandomInt } from '../../helpers/getRandomInt';
import { useActionCreators } from '../../redux/store';
import { carouselActions } from '../../redux/slices/carouselSlice';

export const CarouselCase: FC<CarouselCaseProps> = ({ carouselParams, isOpening, className, ...props }) => {
  const carouselAction = useActionCreators(carouselActions);
  const itemsLength = new Array(20).fill('');
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
    const rangeX = (itemsLength.length - 6 + carouselParams.swapNextItem) * wholeWidthItem + randomInt;
    itemRef.current.style.transition = `all ${carouselParams.timeTransition}s cubic-bezier(0.25, 0.1, 0.25, 1)`;
    setPositionCarousel(positionCarousel - rangeX);
    setTimeout(() => {
      carouselAction.setIsOpening('opened');
    }, carouselParams.timeTransition*1000 + 500);
  };

  useEffect(() => {
    rollCarousel();
  }, [isOpening]);

  return (
    <div
      className={cn(styles.container, className)}
      style={{ height: carouselParams.height + 6 }}
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
          {itemsLength.map((_, index) => (
            <div key={index} className={styles.item}>
              <SkinCard
                width={carouselParams.width}
                height={carouselParams.height}
                color='red'
                urlImg={'https://cdn.csgoskins.gg/public/uih/products/aHR0cHM6Ly9zdGVhbWNvbW11bml0eS1hLmFrYW1haWhkLm5ldC9lY29ub215L2ltYWdlLy05YTgxZGxXTHdKMlVVR2NWc19uc1Z0emRPRWR0V3dLR1paTFFIVHhEWjdJNTZLVTBad3dvNE5VWDRvRkpaRUhMYlhINUFwZU80WW1saHhZUWtuQ1J2Q28wNERFVmx4a0tncG90N0h4ZkRoanhzekplZ0pLNmQyeXE1T0RtT1BMTzdUZG1WUmQ0Y0o1bnRiTjlKN3lqUnJzX2hFNWEyMmhkWUhHY2dFM1lGX1U4MUxzeWJ2bjFKQzY3NVNkd0hjd3N5SXFzQzJJbDBleG4xZ1NPVFVLUnBGdi81MTJ4Mzg0/auto/auto/85/notrim/7b5dfd1209147ab0113ed5adbf76e074.webp'}
              />
              <span className={styles.title}>AK | 47 Skin</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};