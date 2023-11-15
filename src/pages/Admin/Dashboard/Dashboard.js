import { Input, Popconfirm, Table } from 'antd';
import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TimKiemNguoiDungAction, layDanhSachNguoiDungAction, xoaNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungAction';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import ErrorComponent from '../../../component/Error/ErrorComponent';
import './Dashboard.css'


export default function Dashboard() {

    const dispatch = useDispatch();
    const { danhSachNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);


    useEffect(() => {
        dispatch(layDanhSachNguoiDungAction())
    }, [])

    
    const onSearch = (value) => {
        console.log('onSelect', value);
        if (value === '') {            
            dispatch(layDanhSachNguoiDungAction())
        } else {
            dispatch(TimKiemNguoiDungAction(value))
        }

    };

    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Tài Khoản',
            dataIndex: 'taiKhoan',
            key: 'taiKhoan',

            sorter: (item2, item1) => {
                let taiKhoan1 = item1.taiKhoan?.trim().toLowerCase();
                let taiKhoan2 = item2.taiKhoan?.trim().toLowerCase();
                if (taiKhoan2 < taiKhoan1) {
                    return -1;
                }
                return 1;
            },

        },
        {
            title: 'Mật Khẩu',
            dataIndex: 'matKhau',
            key: 'matKhau',
            render: (text) => text || 'N/A',

        },
        {
            title: 'Họ tên',
            dataIndex: 'hoTen',
            key: 'hoTen',
            render: (text) => text || 'N/A',
            sorter: (item2, item1) => {
                let hoTen1 = item1.hoTen?.trim().toLowerCase();
                let hoTen2 = item2.hoTen?.trim().toLowerCase();
                if (hoTen2 < hoTen1) {
                    return -1;
                }
                return 1;
            },


        },

        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',

            sorter: (item2, item1) => {
                let email1 = item1.email?.trim().toLowerCase();
                let email2 = item2.email?.trim().toLowerCase();
                if (email2 < email1) {
                    return -1;
                }
                return 1;
            },


        },
        {
            title: 'Số điện thoại',
            dataIndex: 'soDt',
            key: 'soDt',
            render: (text) => text || 'N/A',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (text, record, index) => {
                return <div key={index}>
                    <NavLink className="btn ml-3 mr-3 btn-primary btn_edit" to={`/admin/user/edit/${record.taiKhoan}`}>                        
                        EDIT
                    </NavLink>
                    <Popconfirm
                        title={` Bạn có chắc chắn xóa tài khoản ${record.taiKhoan}`}
                        onConfirm={() => {
                            dispatch(xoaNguoiDungAction(record.taiKhoan))
                        }}

                        okText="Yes"
                        cancelText="No"
                    >
                        <button className="btn btn-danger btn_delete ">                           
                            DELETE
                        </button>
                    </Popconfirm>
                </div>
            },
        }
    ];

    return (
        <div className="container-fluid " style={{ height: '100vh' }}>
            <h1 className='text-3xl font-bold'>QUẢN LÝ NGƯỜI DÙNG</h1>
            <div className='bg_project'>
                <div style={{ width: '100%', marginBottom: '20px', marginTop: '10px' }}>
                    <Input.Search
                        placeholder="Tìm kiếm tài khoản"
                        allowClear
                        enterButton="SEARCH"
                        size="large"
                        onSearch={onSearch}

                    />
                </div>
                <div className='table-shadow' style={{ overflowX: 'auto', maxHeight: window.innerHeight, backgroundColor: 'white' }}>
                    {danhSachNguoiDung && danhSachNguoiDung.length > 0 ? (
                        <Table style={{ fontSize: '16px' }} columns={columns} rowKey='taiKhoan' dataSource={danhSachNguoiDung}  bordered={true} size='middle' />
                    ) : (
                        <ErrorComponent />
                    )}
                </div>
            </div>


        </div>
    )
}
