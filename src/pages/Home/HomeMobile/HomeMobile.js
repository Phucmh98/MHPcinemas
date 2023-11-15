import React from 'react'
import { Carousel } from 'antd';
import './HomeMobile.css'
export default function HomeMobile() {
    
    return (
        <div style={{ width: 200, height: 350 }}>
            <div style={{
                width: '100%',
                height: '100%',
                backgroundImage: `url('./img/Background/samsung2_bg.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'relative',

            }} >
                <div className='text-white ' style={{ padding: '20px 16px 20px 16px' }}>

                    <Carousel autoplay autoplaySpeed={1500}>

                        <div style={{ width: 210, height: 350 }}>
                            <div
                                style={{
                                    backgroundImage: `url("./img/Carousel/carousel_mobile_1.jpg")`,
                                    width: 170, height: 300,
                                    backgroundSize: '170px 300px',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',

                                }}
                            ></div>
                        </div>
                        <div style={{ width: 210, height: 350 }}>
                            <div
                                style={{
                                    backgroundImage: `url("./img/Carousel/carousel_mobile_2.jpg")`,
                                    width: 170, height: 300,
                                    backgroundSize: '170px 300px',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',

                                }}
                            ></div>
                        </div>
                        <div style={{ width: 210, height: 350 }}>
                            <div
                                style={{
                                    backgroundImage: `url("./img/Carousel/carousel_mobile_3.jpg")`,
                                    width: 170, height: 300,
                                    backgroundSize: '170px 300px',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',

                                }}
                            ></div>
                        </div>
                        <div style={{ width: 210, height: 350 }}>
                            <div
                                style={{
                                    backgroundImage: `url("./img/Carousel/carousel_mobile_4.jpg")`,
                                    width: 170, height: 300,
                                    backgroundSize: '170px 300px',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',

                                }}
                            ></div>
                        </div>
                        <div style={{ width: 210, height: 350 }}>
                            <div
                                style={{
                                    backgroundImage: `url("./img/Carousel/carousel_mobile_5.jpg")`,
                                    width: 170, height: 300,
                                    backgroundSize: '170px 300px',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',

                                }}
                            ></div>
                        </div>

                    </Carousel>
                </div>
            </div>

        </div>

    )
}
