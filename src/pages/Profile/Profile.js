import React, { Fragment, useEffect, useState } from 'react';
import { Input, Select, Space, Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { catNhapThongTinNguoiDungAction, layThongTinTaiKhoan } from '../../redux/actions/QuanLyNguoiDungAction';
import { useFormik } from 'formik';

import moment from 'moment';
const userTypeData = ['QuanTri', 'KhachHang'];
export default function Profile(props) {
  const dispatch = useDispatch()
  const { dataThongTinTaiKhoan} = useSelector(state => state.QuanLyNguoiDungReducer)
  const [dataThongTinTaiKhoanLocal, setDataThongTinTaiKhoanLocal] = useState(dataThongTinTaiKhoan);
  const storeTokken = `Bearer ${localStorage.getItem('accessToken')}`;  
  useEffect(() => {
    dispatch(layThongTinTaiKhoan(storeTokken))

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const convertUser = (maLoai) => {
    if (typeof maLoai === "string") {
      if (maLoai === "Quản trị") {
        return "QuanTri";
      } else if (maLoai === "Khách hàng") {
        return "KhachHang";
      }
    }

    return maLoai;
  }
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: dataThongTinTaiKhoan?.taiKhoan,
      matKhau: dataThongTinTaiKhoan?.matKhau,
      email: dataThongTinTaiKhoan?.email,
      soDt: dataThongTinTaiKhoan?.soDT,
      maNhom: dataThongTinTaiKhoan?.maNhom,
      maLoaiNguoiDung: convertUser(dataThongTinTaiKhoan?.loaiNguoiDung),
      hoTen: dataThongTinTaiKhoan?.hoTen
    },
    onSubmit: async (values) => {
      await dispatch(catNhapThongTinNguoiDungAction(formik.values));
      setDataThongTinTaiKhoanLocal(formik.values);
    },
  })

  const items = [
    {
      key: '1',
      label: (<div className='text-xl font-bold'>
        LỊCH SỬ ĐẶT VÉ
      </div>),
      children: (<Fragment>
        <div className="auto flex items-center justify-center">
          <div className="w-full  bg-white shadow-lg p-8">
            <div className="grid grid-cols-2 gap-2">
              {dataThongTinTaiKhoan.thongTinDatVe?.map((thongTinDV, index) => {
                return <div className='flex pb-5' key={index}>
                  <div style={{
                    background: `url('${thongTinDV.hinhAnh}')`, width: 200, height: 300, backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}></div>
                  <div className="px-4 p w-8/12">
                    <h1 className="text-2xl font-bold mb-3">{thongTinDV.tenPhim}</h1>
                    <p className="text-lg mb-2"><span className="font-semibold">Hệ thống rạp:</span> {thongTinDV?.danhSachGhe[0]?.tenHeThongRap}</p>
                    <p className="text-md mb-2"><span className="font-semibold">Thời Lượng:</span> {thongTinDV?.thoiLuongPhim} phút</p>
                    <p className="text-md mb-2"><span className="font-semibold">Ngày đặt vé:</span> {moment(thongTinDV.ngayDat).format('DD/MM/YYYY HH:mm')}</p>
                    <p className="text-md mb-1">
                      <span className="font-semibold">Danh sách ghế:
                      </span>
                    </p>
                    <div className="flex flex-wrap">
                      {thongTinDV?.danhSachGhe?.map((dsGhe, index) => {
                        return <span className="p-1 m-1 bg-green-300 rounded-lg border-2 border-green-700">
                          <span className='text-xs'>{dsGhe.tenRap} - Ghế {dsGhe.tenGhe}</span>
                        </span>
                      })}
                    </div>
                  </div>
                </div>
              })}
            </div>
          </div>
        </div>
      </Fragment >),
    },
    {
      key: '2',
      label: (<div className='text-xl font-bold'>
        THÔNG TIN CÁ NHÂN
      </div>),
      children: (
        <Fragment>
          <form onSubmit={formik.handleSubmit} className="container flex flex-col mx-auto space-y-12 ">
            <fieldset className=" rounded-md   w-full bg-white shadow-lg p-8 ">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-full sm:col-span-1">
                  <label htmlFor="taiKhoan" className="text-sm">Tài khoản</label>
                  <Input
                    name="taiKhoan"
                    type="text"
                    placeholder="Tài khoản"
                    className="w-full rounded-md focus:ring focus:ring-indigo-300 dark:border-gray-700 dark:text-gray-900 h-10"
                    onChange={formik.handleChange}
                    value={formik.values.taiKhoan}
                  />
                </div>
                <div className="col-span-full sm:col-span-1">
                  <label htmlFor="matKhau" className="text-sm">Mật khẩu</label>
                  <Input
                    name="matKhau"
                    type="password"
                    placeholder="Mật khẩu"
                    className="w-full rounded-md focus:ring focus:ring-indigo-300 dark:border-gray-700 dark:text-gray-900 h-10"
                    onChange={formik.handleChange}
                    value={formik.values.matKhau}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 mt-6">
                <div className="col-span-full sm:col-span-1">
                  <label htmlFor="email" className="text-sm">Email</label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-md focus:ring focus:ring-indigo-300 dark:border-gray-700 dark:text-gray-900 h-10"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                </div>
                <div className="col-span-full sm:col-span-1">
                  <label htmlFor="soDt" className="text-sm">Số điện thoại</label>
                  <Input
                    name="soDt"
                    type="text"
                    placeholder="Số điện thoại"
                    className="w-full rounded-md focus:ring focus:ring-indigo-300 dark:border-gray-700 dark:text-gray-900 h-10"
                    onChange={formik.handleChange}
                    value={formik.values.soDt}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 mt-6">
                <div className="col-span-full sm:col-span-1">
                  <label htmlFor="maNhom" className="text-sm">Mã nhóm</label>
                  <Input
                    name="maNhom"
                    type="text"
                    placeholder="GP00-GP10"
                    className="w-full rounded-md focus:ring focus:ring-indigo-300 dark:border-gray-700 dark:text-gray-900 h-10"
                    onChange={formik.handleChange}
                    value={formik.values.maNhom}
                  />
                </div>
                <div className="col-span-full sm:col-span-1">
                  <label htmlFor="maLoaiNguoiDung" className="text-sm">Mã loại người dùng</label>
                  <br />
                  <Space wrap>
                    <Select
                      defaultValue={formik.values.maLoaiNguoiDung}
                      size='large'
                      style={{
                        width: '250px',
                      }}
                      onChange={(value) => formik.setFieldValue('maLoaiNguoiDung', value)}
                      options={userTypeData.map((type) => ({
                        label: type,
                        value: type,
                      }))}
                    />
                  </Space>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 mt-6">
                <div className="col-span-full sm:col-span-1">
                  <label htmlFor="hoTen" className="text-sm">Họ tên</label>
                  <Input
                    name="hoTen"
                    type="text"
                    placeholder="Họ tên"
                    className="w-full rounded-md focus:ring focus:ring-indigo-300 dark:border-gray-700 dark:text-gray-900 h-10"
                    onChange={formik.handleChange}
                    value={formik.values.hoTen}
                  />
                </div>
                <div className="col-span-full sm:col-span-1 flex items-end flex-row-reverse">
                  <button type='submit' className='bg-blue-600 text-white p-2 ' >Cập nhật</button>
                </div>
              </div>
            </fieldset>
          </form>
        </Fragment>
      )
    },
  ]

  return (
    <div className='container'>
      <Tabs defaultActiveKey="1" items={items}/>
    </div>
  )
}

