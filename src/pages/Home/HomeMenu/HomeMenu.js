import React, { Fragment, useEffect, useState } from 'react';
import { ConfigProvider, Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import moment from 'moment/moment';
import { layDanhSachPhimAction } from '../../../redux/actions/QuanLyPhimActions';
import { layDanhSachHeThongRapAction } from '../../../redux/actions/QuanLyRapAction';
import { history } from '../../../App';
import './HomeMenu.css'



function HomeMenu(props) {
    // console.log(props.heThongRapChieu)
    const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer);
    const [tabPosition, setTabPosition] = useState(window.innerWidth < 1024 ? 'top' : 'left');

    const dispatch = useDispatch();
    useEffect(() => {
        const action = layDanhSachPhimAction();
        dispatch(action);

        dispatch(layDanhSachHeThongRapAction());

        const handleResize = () => {
            setTabPosition(window.innerWidth < 1024 ? 'top' : 'left');
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    const splitTextIntoLines = (text, wordsPerLine) => {
        const words = text.split(' ');

        const lines = [];
        let currentLine = '';

        for (let i = 0; i < words.length; i++) {
            currentLine += words[i] + ' ';

            if ((i + 1) % wordsPerLine === 0) {
                lines.push(currentLine.trim());
                currentLine = '';
            }
        }

        if (currentLine) {
            lines.push(currentLine.trim());
        }

        return lines;
    };


    const renderHeThongRap = () => {
        return heThongRapChieu?.map((heThongRap, index) => {
            return <TabPane tab={
                <div className='text-center  text-lg font-semibold' style={{ textTransform: 'uppercase' }}>
                    <img src={heThongRap.logo} alt={heThongRap.logo} width={50} height={50} style={{ marginLeft: 'auto', marginRight: 'auto' }} />
                    {heThongRap.tenHeThongRap}
                </div>
            } key={index}>
                <Tabs tabPosition={tabPosition}>
                    {heThongRap.lstCumRap?.map((cumRap, index) => {
                        return <TabPane tab={
                            <div style={{ display: 'flex ', width: 280 }}>
                                <img src={heThongRap.logo} alt={heThongRap.logo} style={{ width: 50, height: 50 }} />
                                <br />
                                <div className='text-left ml-2'>
                                    {cumRap.tenCumRap}
                                    {splitTextIntoLines(cumRap.diaChi, 5).map((line, index) => (
                                        <p key={index} className='text-gray-400'>{line}</p>
                                    ))}
                                </div>
                            </div>
                        }
                            key={index}>
                            {cumRap.danhSachPhim?.map((phim, index) => {
                                return (
                                    <Fragment key={index}>
                                        <div className='mb-5 grid grid-cols-12 gap-3'>
                                            <div className='col-span-12 md:col-span-3 lg:col-span-4 xl:col-span-3 2xl:col-span-2'>
                                                <NavLink to={`/detail/${phim.maPhim}`} >
                                                    <img
                                                        style={{ width: '100%', height: 'auto' }}
                                                        src={phim.hinhAnh}
                                                        alt={phim.tenPhim}
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = 'http://picsum.photos/75/75';
                                                        }}
                                                    ></img>
                                                </NavLink>
                                            </div>
                                            <div className='ml-2 col-span-12 md:col-span-9 lg:col-span-8 xl:col-span-9 2xl:col-span-10'>
                                                <button className='text-3xl font-bold uppercase hover:no-underline  text-white hover-film' onClick={() => {
                                                    history.push(`/detail/${phim.maPhim}`)
                                                }}>{phim.tenPhim}</button>
                                                <div className='col-span-12 flex overflow-x-auto mt-5'>
                                                    {phim.lstLichChieuTheoPhim?.map((lichChieu, index) => {
                                                        return (
                                                            <div className='mr-2 py-2' key={index}>
                                                                <NavLink
                                                                    to={`/checkout/${phim.maPhim}/${lichChieu.maLichChieu}`}
                                                                    key={index}
                                                                    className='thong-tin-lich-chieu text-green-800 font-bold hover:no-underline '
                                                                >
                                                                    <div className='btn-book font-normal' style={{ width: 150 }}>
                                                                        <div className='text-xl  text-white'>{moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}</div>
                                                                        <div className='text-base text-gray-400'>{moment(lichChieu.ngayChieuGioChieu).format('dd/mm/yy')}</div>
                                                                        <div className='text-base text-gray-400'>{lichChieu.tenRap}</div>

                                                                    </div>
                                                                    <div className='btn-book-clip text-base font-normal text-white' style={{ width: 150 }}>Book Now</div>
                                                                </NavLink>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                    </Fragment>
                                );
                            })}
                        </TabPane>
                    })
                    }
                </Tabs >
            </TabPane >
        })
    }

    return (
        <div className='pt-28 w-5/6 pb-14'>
            <div className='text-center text-white mb-5 '>
                <h1 className='text-4xl text-center  font-bold tracking-wide'>CINEMAS & FILMS</h1>
                <p className='text-lg text-gray-400 text-center   font-normal'> Quickly choose the right theater and time for you</p>
            </div>
            <ConfigProvider theme={{
                token: {
                    colorPrimary: 'rgb(240 , 151, 17)',
                    colorText: '#FFF',
                    fontFamily: `'Kanit', sans-serif`
                },
            }}>

                <Tabs tabPosition={'top'} centered={window.innerWidth > 1024}>
                    {renderHeThongRap()}
                </Tabs>
            </ConfigProvider>
        </div>
    )
}
export default React.memo(HomeMenu)