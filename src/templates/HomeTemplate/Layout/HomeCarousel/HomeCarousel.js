import React, { useEffect } from 'react'
import { Carousel } from 'antd';
import {  useDispatch } from 'react-redux';
import { getCarouselAction } from '../../../../redux/actions/CarousselAction';
import './HomeCarousel.css'

const contentStyle = {
    height: '600px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#051122',
    backgroundPosition: 'center',
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat'
};
export default function HomeCarousel(props) {
    const dispatch = useDispatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {

        dispatch(getCarouselAction())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <Carousel  effect="fade" style={{ position: 'relative', zIndex: 1, width: '100%', padding: 0, margin: 0 }} autoplaySpeed={4000}>
            <div style={contentStyle}>
                <div style={{ backgroundColor: '#051122', height: '600px', position: 'relative' }}>
                    <div
                        className='img-banner'
                        style={{
                            backgroundImage: `url("./img/Carousel/carousel_mhp.png")`,
                            width: '100%',
                            height: '100%',
                            backgroundSize: 'cover',
                            backgroundPosition: 'bottom',

                        }}
                    ></div>
                    <div className='banner-text'>
                        <div className='text-2xl md:text-4xl lg:text-7xl font-bold w-full lg:w-3/4 ' >
                            Quick access, quick booking
                        </div>
                        <div className='mt-7'>
                            <button className='banner-btn'>Try it now</button>
                        </div>
                    </div>

                </div>
            </div>
            <div style={contentStyle}>
                <div style={{ backgroundColor: '#051122', height: '600px', position: 'relative' }}>
                    <div
                        className='img-banner'
                        style={{
                            backgroundImage: `url("./img/Carousel/carousel_1.jpg")`,
                            width: '100%',
                            height: '100%',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',

                        }}
                    ></div>
                    <div className='banner-text'>
                        <div className='text-2xl md:text-4xl lg:text-7xl font-bold w-full lg:w-3/4 '>
                            Book online, save every time
                        </div>
                        <div className='mt-7'>
                            <button className='banner-btn' >Choose your cinema</button>
                        </div>

                    </div>

                </div>
            </div>
            <div style={contentStyle}>

                <div style={{ backgroundColor: '#051122', height: '600px', position: 'relative' }}>
                    <div
                        className='img-banner'
                        style={{
                            backgroundImage: `url("./img/Carousel/carousel_2.jpg")`,
                            width: '100%',
                            height: '100%',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',

                        }}
                    ></div>
                    <div className='banner-text'>
                        <div className='text-2xl md:text-4xl lg:text-7xl font-bold w-full lg:w-3/4 '>
                            Thrills & Chills
                        </div>
                        <div className='mt-7'>
                            <button className='banner-btn' >Find Something Carry</button>
                        </div>

                    </div>

                </div>
            </div>
            <div style={contentStyle}>
                <div style={{ backgroundColor: '#051122', height: '600px', position: 'relative' }}>
                    <div
                        className='img-banner'
                        style={{
                            backgroundImage: `url("./img/Carousel/carousel_3.jpg")`,
                            width: '100%',
                            height: '100%',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',

                        }}
                    ></div>
                    <div className='banner-text'>
                        <div className='text-2xl md:text-4xl lg:text-7xl font-bold w-full lg:w-3/4 '>
                            The greatest shows on screen
                        </div>
                        <div className='mt-7'>
                            <button className='banner-btn' >Book Event Cinema tickets</button>
                        </div>

                    </div>

                </div>
            </div>
            <div style={contentStyle}>
                <div style={{ backgroundColor: '#051122', height: '600px', position: 'relative' }}>
                    <div
                        className='img-banner'
                        style={{
                            backgroundImage: `url("./img/Carousel/carousel_4.jpg")`,
                            width: '100%',
                            height: '100%',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',

                        }}
                    ></div>
                    <div className='banner-text'>
                        <div className='text-2xl md:text-4xl lg:text-7xl font-bold w-full lg:w-3/4 '>
                            Gran Turismo: Based On A True Story
                        </div>
                        <div className='mt-7'>
                            <button className='banner-btn' >Book tickets</button>
                        </div>
                    </div>

                </div>
            </div>


        </Carousel>
    )
}
