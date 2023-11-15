
import _ from 'lodash'
import React from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';

export default function Footer(props) {
    const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer);
    const arrHeThongRap = _.map(heThongRapChieu, (heThongRap) => _.pick(heThongRap, ['maHeThongRap', 'tenHeThongRap', 'logo']));
    return (
        <footer className="py-6 text-white w-full" style={{ backgroundColor: '#0B1C3A' }}>
            <div className="container px-6 mx-auto space-y-6 divide-y divide-gray-400 md:space-y-12 divide-opacity-50">
                <div className='flex justify-between'>
                    <div className="col-span-6 text-center md:text-left md:col-span-3 w-1/5">
                        <p className="pb-1 text-lg font-medium text-white">PARTNER</p>
                        <div className="grid sm:grid-cols-1 lg:grid-cols-3  " style={{ color: '#fff' }}>
                            {arrHeThongRap.map((htr, index) => {
                                return <div className='justify-center flex pt-2' key={index}>
                                    <img src={htr.logo} style={{ width: 50 }} alt={htr.logo}/>
                                </div>
                            })}
                        </div>
                    </div>
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 w-4/5 pl-5 font-light">
                        <span><NavLink to='/' className='hover:text-yellow-500'>Cookie Policy</NavLink></span>
                        <span><NavLink to='/' className='hover:text-yellow-500'>Modern Slavery Statement</NavLink></span>
                        <span><NavLink to='/' className='hover:text-yellow-500'>Contact Us</NavLink></span>
                        <span><NavLink to='/' className='hover:text-yellow-500'>Corporate Responsibility</NavLink></span>
                        <span><NavLink to='/' className='hover:text-yellow-500'>Privacy and Legal</NavLink></span>
                        <span><NavLink to='/' className='hover:text-yellow-500'>Help</NavLink></span>
                        <span><NavLink to='/' className='hover:text-yellow-500'>Accessibility</NavLink></span>
                        <span><NavLink to='/' className='hover:text-yellow-500'>Aller and Nutritional Information</NavLink></span>
                        <span><NavLink to='/' className='hover:text-yellow-500'>About us</NavLink></span>
                        <span><NavLink to='/' className='hover:text-yellow-500'>Careers</NavLink></span>
                        <span><NavLink to='/' className='hover:text-yellow-500'>Corporate Event</NavLink></span>
                        <span><NavLink to='/' className='hover:text-yellow-500'>MHP scene</NavLink></span>
                        <span><NavLink to='/' className='hover:text-yellow-500'>IOS App</NavLink></span>
                        <span><NavLink to='/' className='hover:text-yellow-500'>Android App</NavLink></span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-white">
                    <div className=" self-center text-base text-left font-medium">
                        <span>©MHP Cinemas Design by MHP</span>
                    </div>
                    <div className='text-2xl text-right'>
                        <NavLink to='/' className='px-2 hover:text-yellow-500'><i className="fab fa-facebook"></i></NavLink>
                        <NavLink to='/' className='px-2 hover:text-yellow-500'><i className="fab fa-twitter"></i></NavLink>
                        <NavLink to='/' className='px-2 hover:text-yellow-500'><i className="fab fa-instagram"></i></NavLink>
                        <NavLink to='/' className='px-2 hover:text-yellow-500'><i className="fab fa-youtube"></i></NavLink>
                        <NavLink to='/' className='px-2 hover:text-yellow-500'><i className="fab fa-google-plus-g"></i></NavLink>
                    </div>
                </div>
            </div>
        </footer>

    )
}