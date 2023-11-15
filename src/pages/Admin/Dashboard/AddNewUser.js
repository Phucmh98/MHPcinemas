import { Input, Select, Space } from 'antd';
import { useFormik } from 'formik';
import React from 'react'
import { useDispatch } from 'react-redux';
import { themNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungAction';



export default function AddNewUser() {
  const userTypeData = ['QuanTri', 'KhachHang'];
  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: '',
      matKhau: '',
      email: '',
      soDt: '',
      maNhom: '',
      maLoaiNguoiDung: 'QuanTri',
      hoTen: '',
    },
    onSubmit: (values) => {
      dispatch(themNguoiDungAction(values))

    },


  })

  return (
    <div className='container'>
      <h1 className='text-3xl font-bold pb-4'>THÊM MỚI NGƯỜI DÙNG</h1>
      <form onSubmit={formik.handleSubmit} className="flex flex-col mx-auto space-y-12 ">
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
              <button type='submit' className='bg-blue-600 text-white p-2 ' >Thêm Mới</button>

            </div>
          </div>
        </fieldset>

      </form>
    </div>
  )
}
