import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ConfigProvider, Tabs } from 'antd';
import './Checkout.css'
import { CloseOutlined, UserOutlined, CheckOutlined, SmileOutlined } from '@ant-design/icons'
import { datGheAction, datVeAction, layChiTietPhongVeAction } from '../../redux/actions/QuanLyDatVeAction'
import _ from 'lodash'
import { ThongTinDatVe } from '../../_core/models/ThongTinDatVe'
import { layThongTinNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction';
import moment from 'moment';
import './Ticket.css'
import { layThongTinChiTietPhim } from '../../redux/actions/QuanLyRapAction';

function Checkout(props) {
  const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)

  const { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDat } = useSelector(state => state.QuanLyDatVeReducer)


  const dispatch = useDispatch()



  useEffect(() => {
    const fetchData = async () => {
      // Gọi hàm tạo action để lấy thông tin chi tiết phòng vé
      const action = layChiTietPhongVeAction(props.match.params.maLichChieu);

      // Sử dụng await để chờ dispatch các action
      await dispatch(layThongTinChiTietPhim(props.match.params.maPhim));
      dispatch(action);
    };

    fetchData(); // Gọi async wrapper function
  }, [dispatch, props.match.params.maLichChieu, props.match.params.maPhim]);


  const { thongTinPhim, danhSachGhe } = chiTietPhongVe




  const renderSeats = () => {
    
    return danhSachGhe.map((ghe, index) => {
      let classGheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : ''
      let classGheDaDat = ghe.daDat === true ? 'gheDaDat' : ''
      let classGheDangDat = '';
      //kiểm tra từng ghế render xem có trong mảng ghế đang đặt hay không
      let classGheDaDuocDat = '';
      if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
        classGheDaDuocDat = 'gheDaDuocDat'
      }
      let indexGheDD = danhSachGheDangDat.findIndex(gheDD => gheDD.maGhe === ghe.maGhe);
      //Kiểm tra từng render xem có phải ghế khác đặt không
      let classGheKhachDat = '';
      let indexGheKD = danhSachGheKhachDat.findIndex(gheKD => gheKD.maGhe === ghe.maGhe);
      if (indexGheKD !== -1) {
        classGheKhachDat = 'gheKhachDat';
      }

      if (indexGheDD !== -1) {
        classGheDaDat = 'gheDangDat'
      }

      return <Fragment key={index} >
        <button onClick={() => {
          const action = datGheAction(ghe, props.match.params.maLichChieu)
          dispatch(
            action
          )
        }}
          disabled={ghe.daDat || classGheKhachDat !== ''} className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat} ${classGheKhachDat} text-center`} key={index}>
          {ghe.daDat ? classGheDaDuocDat !== '' ? <UserOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> : <CloseOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> : classGheKhachDat !== '' ? <SmileOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> : ghe.stt}
        </button>
      </Fragment >


    })
  }

  return (
    <div className='min-h-screen mt-1' >
      <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-12 lg:col-span-6'>
          <h3 className='text-2xl lg:text-4xl text-white font-bold uppercase tracking-tight'>{thongTinPhim?.tenPhim}</h3>
        </div>
        <div className='col-span-12 lg:col-span-2 font-normal tracking-wide'>
          <span className='text-base  text-gray-400 '>CINEMA</span>
          <h3 className='text-base  text-white '>{thongTinPhim.tenCumRap} - {thongTinPhim.tenRap}</h3>
        </div>
        <div className='col-span-12 lg:col-span-2'>
          <span className='text-base  text-gray-400'>SHOWTIME</span>
          <h3 className='text-base  text-white '>{thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}</h3>
        </div>
        <div className='col-span-12 lg:col-span-2'>
          <span className='text-base  text-gray-400'>EMAIL</span>
          <h3 className='text-base  text-white  pb-2'>{userLogin.email}</h3>
          <span className='text-base  text-gray-400'>PHONE</span>
          <h3 className='text-base  text-white  '>{userLogin.soDT}</h3>
        </div>

      </div>


      <div className='mt-5 container'>
        <div className=' text-white'>
          <h1 className='text-4xl  text-center font-bold tracking-wide'>CHOOSE YOUR SEATS</h1>
          <div className="mt-5 flex flex-wrap justify-center border-t-2 border-b-2 border-gray-400 py-3">
            <div className='flex justify-center items-center px-3 font-semibold'>
              <span className='text-center'><button className="ghe text-center"> <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> </button> </span>
              <span>Availability</span>
            </div>
            <div className='flex justify-center items-center px-3'>
              <span className='text-center'><button className="ghe gheDaDat text-center"> <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> </button> </span>
              <span>Booked</span>
            </div>
            <div className='flex justify-center items-center px-3'>
              <span className='text-center'><button className="ghe gheDangDat text-center"> <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /></button></span>
              <span>Selected</span>

            </div>
            <div className='flex justify-center items-center px-3'>
              <span className='text-center'><button className="ghe gheVip text-center"><CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /></button></span>
              <span>VIP</span>
            </div>

            <div className='flex justify-center items-center px-3'>
              <span className='text-center'><button className="ghe gheDaDuocDat text-center"> <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> </button></span>
              <span>Yourselft Booked</span>

            </div>
            <div className='flex justify-center items-center px-3'>
              <span className='text-center'><button className="ghe gheKhachDat text-center"> <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> </button> </span>
              <span>Someone is booking </span>

            </div>
          </div>
          <div className='flex flex-col items-center mt-5'>
            <div className='screen text-center text-gray-400 font-semibold text-xl'>
              <h3 className='mt-3 ' >SCREEN</h3>
            </div>
            <div className='overflow-x-auto w-full pb-3 mb-3' >
              <div className=' row-seat flex justify-center'>
                {renderSeats()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='seat-picker' style={{ backgroundColor: '#0B1C3A', marginLeft: '-48px', marginRight: '-48px' }}>
        <div className='grid grid-cols-12 gap-1 container py-3'>
          <div className='col-span-8 font-normal'>
            <span className='text-gray-400 text-lg'>Seats Selected: </span>
            {_.sortBy(danhSachGheDangDat, ['stt']).map((gheDD, index) => {
              return <span key={index} className='text-white text-xl'> {gheDD.stt}</span>
            })}
          </div>
          <div className='col-span-2 font-normal'>
            <span className='text-white text-lg'>
              <span className='text-gray-400 text-lg'>Total: </span>{danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                return tongTien += ghe.giaVe
              }, 0).toLocaleString()} VNĐ</span>
          </div>
          <div className='col-span-2'>
            {danhSachGheDangDat.length > 0 ? (
              <button onClick={() => {
                const thongTinDatVe = new ThongTinDatVe();
                thongTinDatVe.maLichChieu = props.match.params.maLichChieu;
                thongTinDatVe.danhSachVe = danhSachGheDangDat;

                dispatch(datVeAction(thongTinDatVe))
              }} className=' text-white w-full text-center  font-semibold text-lg cursor-pointer btn-book-clip'>
                BOOK
              </button>
            ) : (
              <button disabled className=' text-white w-full text-center  font-semibold text-lg cursor-not-allowed btn-book-clip-disable'>
                BOOK
              </button>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}


const onChange = (key) => {

};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (props) {


  const filmDetail = useSelector(state => state.QuanLyPhimReducer.filmDetail)
  let videoId = '';
  let thumbnailUrl = '';

  if (filmDetail && filmDetail.trailer) {
    videoId = filmDetail?.trailer.split('/').pop();
    thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }
  const { tabActive } = useSelector(state => state.QuanLyDatVeReducer)
  const dispatch = useDispatch()
  const items = [
    {
      key: '1',
      label: <div className='flex items-center' style={{ height: 50 }} onClick={() => {
        dispatch({
          type: 'CHANGE_TAB_ACTIVE',
          number: '1'
        })

      }}>
        <div className='triangle-left'></div>
        <div className='text-xl font-medium flex items-center tracking-wide ' style={{ height: '100%', paddingLeft: '10px', paddingRight: '10px', backgroundColor: '#0B1C3A' }} > <div>
          1. CHOOSE SEATS & PAY
        </div></div>
        <div className='triangle-right '></div>

      </div>,
      children: <Checkout {...props} />,
    },
    {
      key: '2',
      label: <div className='flex items-center' style={{ height: 50 }} onClick={() => {
        dispatch({
          type: 'CHANGE_TAB_ACTIVE',
          number: '2'
        })

      }}>
        <div className='triangle-left'></div>
        <div className='text-xl font-medium flex items-center tracking-wide ' style={{ height: '100%', paddingLeft: '20px', paddingRight: '20px', backgroundColor: '#0B1C3A' }} > <div>
          2. YOUR TICKETS
        </div></div>
        <div className='triangle-right '></div>
      </div>,

      children: <KetQuaDatVe {...props} />,
    },


  ];
  useEffect(() => {

    return () => {
      dispatch({
        type: 'CHANGE_TAB_ACTIVE',
        number: '1'
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <div style={{ backgroundColor: '	#051122' }}>
    <div className='banner_wrapper w-full' style={{
      position: 'relative',
      backgroundImage: `url(${thumbnailUrl})`,
      backgroundRepeat: 'no-repeat',
      height: '100%',
      width: '100%',
      backgroundSize: 'cover',
      backgroundPosition: 'top',
    }}>

    </div>
    <div className='pt-5 px-5 ' >
      <ConfigProvider theme={{
        token: {
          // Seed Token
          colorPrimary: 'rgb(240 , 151, 17)',
          colorText: '#FFF',
          fontFamily: `'Kanit', sans-serif`
        },
      }}>
        <Tabs defaultActiveKey='1' activeKey={tabActive} items={items} onChange={onChange} />
      </ConfigProvider>
    </div>
  </div>


}

function KetQuaDatVe(props) {
  const dispatch = useDispatch()
  const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer)


  useEffect(() => {
    const action = layThongTinNguoiDungAction()
    dispatch(action)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderTicketItem = function () {
    return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
      const seats = _.first(ticket.danhSachGhe)
      return <div className='p-3 ' style={{ width: '650px' }}>
        <div className="ticket  " >
          <div className="stub">
            <img className='object-cover' alt="team" src={ticket?.hinhAnh} style={{ paddingRight: '2px', height: '100%' }} />
          </div>
          <div className="check  flex-col items-center space-y-4">
            <div className="big">
              {ticket.tenPhim}
            </div>
            <div className='mt-2'>
              <span className='text-lg lg:text-xl font-medium text-gray-400'>Address: </span>
              <span className='text-lg lg:text-xl font-medium text-gray-700'>{seats.tenHeThongRap}</span>
            </div>
            <div className="info ">
              <section className='font-medium text-gray-700'>
                <div className="title" >DATE</div>
                <div>{moment(ticket.ngayDat).format('DD-MM-YYYY')}</div>
              </section>
              <section className='font-medium text-gray-700'>
                <div className="title">TIME</div>
                <div>{moment(ticket.ngayDat).format('hh:mm A')}</div>
              </section>
              <section className='font-medium text-gray-700'>
                <div className="title">CINEMA</div>
                <div>{seats.tenCumRap}</div>
              </section>
            </div>
            <div className='mt-2'>
              <span className='text-lg font-medium text-gray-400'>Seats: </span>{ticket.danhSachGhe.map((ghe, index) => {
                return <span className='text-lg font-medium text-gray-700' key={index}>{ghe.tenGhe} </span>
              })}
            </div>
          </div>
        </div>
      </div>
    })
  }
  return <div className='py-5' style={{ backgroundColor: '#051122' }}>
    <section className="text-gray-600 body-font">
      <div className="container">
        <div className="flex flex-col text-center w-full mb-10">
          <h1 className="sm:text-3xl text-4xl  text-center font-bold tracking-wide title-font mb-2 text-white">CUSTOMER BOOKING HISTORY</h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Please see location and time information to enjoy watching movies</p>
        </div>
        <div className='flex justify-center'>
          <div className="grid grid-cols-1 2xl:grid-cols-2 gap-1 overflow-x-auto ">
            {renderTicketItem()}
          </div>

        </div>
      </div>
    </section>

  </div>
}