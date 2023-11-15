import React, { Fragment, useEffect } from 'react'
import { Button, Popconfirm, Table } from 'antd';
import { Input} from 'antd';
import {EditOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachPhimAction, xoaPhimAction } from '../../../redux/actions/QuanLyPhimActions';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import { history } from '../../../App';

const { Search } = Input;
export default function Films() {
    const { arrFilmDefault } = useSelector(state => state.QuanLyPhimReducer)
    const dispatch = useDispatch();

    
    useEffect(async () => {
        await dispatch(layDanhSachPhimAction())
    }, [])


    const columns = [
        {
            title: 'Mã Phim',
            dataIndex: 'maPhim',
            width: '7%',

            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => b.maPhim - a.maPhim,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Hình Ảnh',
            dataIndex: 'hinhAnh',
            width: '7%',
            render: (text, film, index) => {
                return <Fragment>
                    <img src={film.hinhAnh} alt={film.tenPhim} width={50} height={50} onError={(e) => { e.target.onError = null; e.target.src = `https://picsum.photo/id/${index}/50/50` }} />
                </Fragment>
            }

        },
        {
            title: 'Tên Phim',
            dataIndex: 'tenPhim',
            width: '20%',
            onFilter: (value, record) => record.address.indexOf(value) === 0,
            sorter: (a, b) => {
                let tenPhimA = a.tenPhim.toLowerCase().trim();
                let tenPhimB = b.tenPhim.toLowerCase().trim();
                if (tenPhimA > tenPhimB) {
                    return 1;
                }
                return -1
            },
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Mô tả',
            dataIndex: 'moTa',
            width: '40%',
            onFilter: (value, record) => record.address.indexOf(value) === 0,
            sorter: (a, b) => {
                let moTaA = a.moTa.toLowerCase().trim();
                let moTaB = b.moTa.toLowerCase().trim();
                if (moTaA > moTaB) {
                    return 1;
                }
                return -1
            },
            render: (text, film) => {
                return <Fragment>
                    {film.moTa.length > 50 ? film.moTa.substr(0, 100) + ' ...' : film.moTa}
                </Fragment>
            },
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Hành Động',
            dataIndex: 'hanhDong',
            width: '20%',

            render: (text, film) => {
                return <Fragment>
                    <NavLink key={1} className=' mr-2 p-2 text-2xl' to={`films/edit/${film.maPhim}`} style={{ color: 'blue' }}><EditOutlined /></NavLink>
                    <Popconfirm
                        title={`Bạn có muốn xóa ${film.tenPhim}?`}
                        onConfirm={() => {
                            dispatch(xoaPhimAction(film.maPhim))
                        }}

                        okText="Yes"
                        cancelText="No"
                    >
                        <span key={2} className='mr-2 p-2 text-2xl' style={{ color: 'red', cursor: 'pointer' }} ><DeleteOutlined /></span>
                    </Popconfirm>
                    
                    <NavLink key={3} className=' mr-2 p-2 text-2xl' to={`films/showtime/${film.maPhim}/${film.tenPhim}`} style={{ color: 'green' }} onClick={() => {
                        localStorage.setItem('filmParams', JSON.stringify(film))
                    }}><CalendarOutlined /></NavLink>
                </Fragment>
            },
            sortDirections: ['descend', 'ascend'],
        },
    ];
    const data = arrFilmDefault
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    const onSearch = (value) => {
        //gọi Api lấy danh sách phim
        dispatch(layDanhSachPhimAction(value))
    };
    return (
        <div >
            <h3 className='text-3xl font-bold mb-3'>QUẢN LÝ PHIM</h3>
            <Button type="primary" className='' onClick={() => {
                history.push('films/addnew')
            }}>Thêm Phim</Button>
            <Search
                className='my-4'
                placeholder="Tìm kiếm tên phim"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={onSearch}
            />
            <div className='table-shadow'>
            <Table columns={columns} dataSource={data} onChange={onChange} rowKey={'maPhim'} />
            </div>
            

        </div>
    )
}
