import React, {FC} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from './SliderStyle.module.css'

interface SliderComponentProps {
    images:string[] | null
}

const SliderComponent:FC<SliderComponentProps> = ({images}) => {

    const settings = {
        arrows:false,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <Slider {...settings} className={style.Slider}>
            {images && images.length > 0
                ? images.map((image, index) => (
                    <div key={index} className={style.Slider}>
                        <img src={image} alt={` ${index + 1}`} className={style.Slider_image}/>
                    </div>
                ))
                : null}
        </Slider>
    );
};

export {SliderComponent};
