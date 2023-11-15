import { useFormik } from 'formik';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Input, Select, Space } from 'antd';
import { useEffect } from 'react';
import { catNhapThongTinNguoiDungAction, layThongTinNguoiDungChinhSuaAction } from '../../../redux/actions/QuanLyNguoiDungAction';

export default function EditUser(props) {
    const { thongTinNguoiDungChinhSua } = useSelector(state => state.QuanLyNguoiDungReducer)   

    useEffect(() => {        
        const taiKhoanID = props.match.params.taiKhoan;
        dispatch(layThongTinNguoiDungChinhSuaAction(taiKhoanID))
    }, [])

    const userTypeData = ['QuanTri', 'KhachHang'];
    const dispatch = useDispatch();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: thongTinNguoiDungChinhSua[0]?.taiKhoan,
            matKhau: thongTinNguoiDungChinhSua[0]?.matKhau,
            email: thongTinNguoiDungChinhSua[0]?.email,
            soDt: thongTinNguoiDungChinhSua[0]?.soDt,
            maNhom: thongTinNguoiDungChinhSua[0]?.maNhom,
            maLoaiNguoiDung: 'QuanTri',
            hoTen: thongTinNguoiDungChinhSua[0]?.hoTen
        },
        onSubmit: (values) => {
            dispatch(catNhapThongTinNguoiDungAction(formik.values));
        },

    })
    return (
        <div className='container'>
            <h1 className='text-3xl font-bold pb-3'>CHỈNH SỬA NGƯỜI DÙNG </h1>
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
                            <button type='submit' className='bg-blue-600 text-white p-2 ' >Cật nhật</button>

                        </div>
                    </div>
                </fieldset>

            </form>
        </div>
    )
}
