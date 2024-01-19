import React, { useRef, useEffect, useState } from 'react';
import './CarrouselPage.scss';

interface Slide {
  index: number;
  headline: string;
  button: string;
  src: string;
}

interface SlideProps {
  slide: Slide;
  current: number;
  handleSlideClick: (index: number) => void;
}

const Slide: React.FC<SlideProps> = ({ slide, current, handleSlideClick }) => {
  const slideRef = useRef<HTMLLIElement>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLLIElement>) => {
    const el = slideRef.current;
    if (el) {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--x', `${event.clientX - (r.left + Math.floor(r.width / 2))}`);
      el.style.setProperty('--y', `${event.clientY - (r.top + Math.floor(r.height / 2))}`);
    }
  };

  const handleMouseLeave = () => {
    if (slideRef.current) {
      slideRef.current.style.setProperty('--x', '0');
      slideRef.current.style.setProperty('--y', '0');
    }
  };

  const handleSlideClickInternal = () => {
    handleSlideClick(slide.index);
  };

  const imageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const target = event.target as HTMLImageElement;
    if (target) {
      target.style.opacity = '1';
    }
  };

  let classNames = 'slide';
  if (current === slide.index) classNames += ' slide--current';
  else if (current - 1 === slide.index) classNames += ' slide--previous';
  else if (current + 1 === slide.index) classNames += ' slide--next';

  return (
    <li
      ref={slideRef}
      className={classNames}
      onClick={handleSlideClickInternal}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="slide__image-wrapper">
        <img className="slide__image" alt={slide.headline} src={slide.src} onLoad={imageLoaded} />
      </div>

      <article className="slide__content">
        <h2 className="slide__headline">{slide.headline}</h2>
        <button className="slide__action btn">{slide.button}</button>
      </article>
    </li>
  );
};

interface SliderControlProps {
  type: string;
  title: string;
  handleClick: () => void;
}

const SliderControl: React.FC<SliderControlProps> = ({ type, title, handleClick }) => {
  return (
    <button className={`btn btn--${type}`} title={title} onClick={handleClick}>
      <svg className="icon" viewBox="0 0 24 24">
        <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
      </svg>
    </button>
  );
};

interface SliderProps {
  heading: string;
  slides: Slide[];
}

const Slider: React.FC<SliderProps> = ({ heading, slides }) => {
  const [current, setCurrent] = useState(0);

  const handlePreviousClick = () => {
    const previous = current - 1;
    setCurrent((previous < 0) ? slides.length - 1 : previous);
  };

  const handleNextClick = () => {
    const next = current + 1;
    setCurrent((next === slides.length) ? 0 : next);
  };

  const handleSlideClick = (index: number) => {
    if (current !== index) {
      setCurrent(index);
    }
  };

  return (
    <div className='slider' aria-labelledby={`slider-heading__${heading.replace(/\s+/g, '-').toLowerCase()}`}>
      <ul className="slider__wrapper" style={{ transform: `translateX(-${current * (100 / slides.length)}%)` }}>
        <h3 id={`slider-heading__${heading.replace(/\s+/g, '-').toLowerCase()}`} className="visuallyhidden">{heading}</h3>

        {slides.map(slide => (
          <Slide
            key={slide.index}
            slide={slide}
            current={current}
            handleSlideClick={handleSlideClick}
          />
        ))}
      </ul>

      <div className="slider__controls">
        <SliderControl
          type="previous"
          title="Go to previous slide"
          handleClick={handlePreviousClick}
        />

        <SliderControl
          type="next"
          title="Go to next slide"
          handleClick={handleNextClick}
        />
      </div>
    </div>
  );
};

export default Slider;
