import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import MultipleRowsSlick from '../../component/RSlick/MultipleRowSlick'
import { layDanhSachPhimAction } from '../../redux/actions/QuanLyPhimActions'
import { layDanhSachHeThongRapAction } from '../../redux/actions/QuanLyRapAction'
import HomeCarousel from '../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel'
import './Home.css'
import HomeMobile from './HomeMobile/HomeMobile'
export default function Home() {
  const { arrFilm, arrFilmDefault } = useSelector(state => state.QuanLyPhimReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    const action = layDanhSachPhimAction();
    dispatch(action)
    dispatch(layDanhSachHeThongRapAction())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div >
      <div style={{ paddingTop: '76px', backgroundColor: '	#051122' }}><HomeCarousel /></div>
      <section className="text-gray-600 body-font " style={{ backgroundColor: '	#051122' }}>
        <div className="container px-5 pb-7   mx-auto">
          <h1 className='text-center text-white text-4xl font-semibold py-5 tracking-wide'>CHOOSE YOUR FILM</h1>
          <MultipleRowsSlick arrFilm={arrFilm} arrFilmDefault={arrFilmDefault} />
        </div>
      </section>
      <div
        className='my-auto'
        style={{
          backgroundImage: `url(./img/Background/bg_mobile_home.jpg)`,
          width: '100%',
          height: '100%',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div style={{
          backgroundColor: 'rgba(11,28,58,0.8)', height: '100%', width: '100%', backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
          <div className='container grid grid-cols-1 md:grid-cols-2 p-10 w-3/4'>
            <div className='pb-4'>
              <h1 className='text-white text-3xl font-medium pb-4'>
                Convenient app for movie lovers</h1>
              <p className='text-white text-lg  font-base pb-4' >Not only booking tickets, you can also comment on movies, score theaters and redeem attractive gifts.</p>
              <button className='p-2 text-white text-sm font-semibold btn-click' style={{ backgroundColor: 'rgb(225, 103, 13)' }}>Install Progressive App!</button>
              <p className='text-white text-lg  font-medium pt-2 pb-1' >MHP cinemas have two version: </p>
              <div className='flex'>
                <button style={{ height: 45, width: 140 }}>
                  <div style={{
                    height: '100%',
                    width: '100%',
                    backgroundImage: `url('./img/Logo/logo_androind.png')`,
                    backgroundSize: '100% auto',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}></div>
                </button>
                <button style={{ height: 45, width: 140 }}>
                  <div style={{
                    height: '100%',
                    width: '100%',
                    backgroundImage: `url('./img/Logo/logo_apple.png')`,
                    backgroundSize: '100% auto',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}></div>
                </button>
              </div>
            </div>
            <div className='flex justify-center '>
              <HomeMobile />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
