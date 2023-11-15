import React, { useEffect } from 'react'
import '@tsamantanis/react-glassmorphism/dist/index.css'
import '../../assets/styles/circle.css'
import { ConfigProvider, Rate, Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane'
import { useDispatch, useSelector } from 'react-redux'
import { layThongTinChiTietPhim } from '../../redux/actions/QuanLyRapAction'
import moment from 'moment/moment'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'
import './Detail.css'
import summer_ticket from '../../assets/img/Detail/summer_ticket.jpg'
import ErrorComponent from '../../component/Error/ErrorComponent'

export default function Detail(props) {
  const filmDetail = useSelector(state => state.QuanLyPhimReducer.filmDetail)
  const dispatch = useDispatch();
  let videoId = '';
  let thumbnailUrl = '';
  let { id } = props.computedMatch.params;
  if (filmDetail && filmDetail.trailer) {
    videoId = filmDetail.trailer.split('/').pop();
    thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }

  useEffect(() => {
    //Lấy thông tin param từ url
    let { id } = props.computedMatch.params;

    dispatch(layThongTinChiTietPhim(id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={{ backgroundColor: '#051122', backgroundSize: '100%', backgroundPosition: 'center', minHeight: '100vh' }}>
      <div className='banner_wrapper w-full' style={{
        position: 'relative',
        backgroundImage: `url(${thumbnailUrl})`,
        backgroundRepeat: 'no-repeat',
        height: '100%',
        width: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'top',
      }}>
        <div className="banner_overlay"></div>
        <a className="play_button" href={`${filmDetail.trailer}`} target="_blank" rel="noopener noreferrer" >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="  60px" height="60px">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M8 5v14l11-7L8 5z" />
          </svg>
        </a>
      </div>
      <div
        style={{ paddingTop: 50, minHeight: '100vh' }}
      >
        <div className='grid grid-cols-12 container'>
          <div className='col-span-12 lg:col-span-10 col-start-1'>
            <div className='md:flex text-white'>
              <img className='pl-5 pb-4' src={filmDetail.hinhAnh} style={{ height: 300 }} alt="123" />
              <div className='px-5' >
                <p className='text-3xl md:text-4xl pb-3 font-semibold uppercase tracking-tighter'>{filmDetail.tenPhim}</p>
                <p className='text-base md:text-lg pb-3 text-gray-400 font-light'>Release date: <span className='text-white'>{moment(filmDetail.ngayKhoiChieu).format('DD.MM.YYYY')}</span></p>
                <p className='text-lg md:text-xl pb-1 text-gray-400 font-light'>Description:</p>
                <p className='text-base md:text-lg font-light'>{filmDetail.moTa}</p>
              </div>
            </div>
          </div>
          <div className='col-start-1 col-span-12 lg:col-span-2 lg:col-start-11 '>
            <h1 className='text-xl sm:text-2xl text-yellow-400 font-medium pt-3' style={{ textAlign: 'center' }}>Overall Rating</h1>
            <div className='flex justify-center'>
              <span className='text-white text-4xl sm:text-6xl font-semibold pb-1'>
                {(filmDetail.danhGia / 2)}
              </span>

            </div>

            <h1 style={{ textAlign: 'center' }} className='text-yellow-500 text-2xl'><Rate allowHalf value={filmDetail.danhGia / 2} style={{ color: 'yellow', fontSize: 30 }} /></h1>
            <p className='text-center text-gray-400 pt-1'>Based on many reviews</p>


          </div>

        </div>
        <h1 className='text-center text-white text-4xl pt-5 font-bold tracking-wide'>CHOOSE YOUR CINEMAS</h1>
        <div className='mt-4  w-4/5 container px-0'>
          <ConfigProvider theme={{
            token: {
              // Seed Token
              colorPrimary: 'rgb(240 , 151, 17)',
              colorText: '#FFF',
              fontFamily: `'Kanit', sans-serif`
            },
          }}>
            {filmDetail.heThongRapChieu?.length > 0 ? (
              <Tabs centered>
                {filmDetail.heThongRapChieu?.map((htr, index) => {
                  return <TabPane
                    tab={<div className='text-center  text-lg font-semibold' style={{ textTransform: 'uppercase' }}>
                      <img src={htr.logo} alt={htr.logo} width={50} height={50} style={{ marginLeft: 'auto', marginRight: 'auto' }} />
                      {htr.tenHeThongRap}
                    </div>}
                    key={index}>
                    {htr.cumRapChieu?.map((cumRap, index) => {
                      return <div className='mt-3' key={index}>

                        <div className='flex flex-row pb-3'>
                          <img src={htr.logo} alt={htr.logo} style={{ width: 60, height: 60 }} />
                          <div className='ml-2'>
                            <p className='text-xl text-white pb-2 font-medium' style={{ lineHeight: 1, textTransform: 'uppercase' }}>{cumRap.tenCumRap}</p>
                            <p className='text-gray-400 ' style={{ marginTop: 0 }}>{cumRap.diaChi}</p>

                          </div>
                        </div>
                        <div className=' flex flex-wrap pb-5'>

                          {cumRap.lichChieuPhim?.map((lichChieu, index) => {
                            return <div className='p-3' style={{ width: '175px' }} key={index}>
                              <NavLink to={`/checkout/${id}/${lichChieu.maLichChieu}`} key={index} className='thong-tin-lich-chieu text-green-800 font-bold hover:no-underline' >

                                <div className='btn-book font-normal' >
                                  <div className='text-xl  text-white'>{moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}</div>
                                  <div className='text-base text-gray-400'>{moment(lichChieu.ngayChieuGioChieu).format('dd/mm/yy')}</div>
                                  <div className='text-base  text-gray-400'>{lichChieu.tenRap}</div>
                                </div>
                                <div className='btn-book-clip text-base font-normal text-white'>Book Now</div>

                              </NavLink>
                            </div>
                          })}

                        </div>

                      </div>
                    })}
                  </TabPane>
                })}
              </Tabs>) : (<ErrorComponent />)}

          </ConfigProvider>
        </div>

      </div>
      <div className='container px-0 py-5 w-4/5 border-t-2  border-gray-400 mt-2'>
        <div className='grid grid-cols-6 gap-5'>
          <div className='col-start-1 col-end-7 sm:col-start-1 sm:col-end-3'>
            <div >
              <img src={summer_ticket} alt="mhpcinema" style={{ height: 'auto', width: '100%' }} />
            </div>
          </div>
          <div className='col-start-1 col-end-7 sm:col-start-3 sm:col-end-6'>
            <div className='text-xl sm:text-2xl text-white font-semibold pb-4 tracking-wide'>SUMMER SAVER</div>
            <p className='text-sm sm:text-lg text-white font-light pb-3'>Grab a Summer Saver bundle and treat yourself to movie magic at great value with tickets starting from just £5*!</p>
            <p className='text-sm sm:text-lg text-white font-light pb-3'>Don't miss out on this limited-time offer exclusive to MHP members.</p>
            <p className='text-sm sm:text-xs text-white font-light pb-3'>*Terms and conditions apply</p>
            <p className='text-sm sm:text-lg text-gray-400 font-light'>Expires: 30/09/2023</p>
          </div>
          <div className='col-start-1 col-end-7 sm:col-start-6 flex justify-center items-center'>
            <button className='btn-book-clip text-base sm:text-lg text-white font-medium w-full pt-2 pb-2'>Find out more</button>
          </div>
        </div>
      </div>
    </div >

  )
}

