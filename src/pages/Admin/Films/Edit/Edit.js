import React, { useEffect, useState } from 'react'
import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Switch,
    TreeSelect,
} from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { values } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { capNhatPhimUpLoadAction, layThongTinPhimAction, themPhimUpLoadHinhAction } from '../../../../redux/actions/QuanLyPhimActions';
import { GROUPID } from '../../../../ultil/settings/config';
import TextArea from 'antd/es/input/TextArea';
export default function Edit(props) {
    const { thongTinPhim } = useSelector(state => state.QuanLyPhimReducer)
    
    const dispatch = useDispatch()
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maPhim: thongTinPhim.maPhim,
            tenPhim: thongTinPhim?.tenPhim,
            trailer: thongTinPhim?.trailer,
            moTa: thongTinPhim?.moTa,
            ngayKhoiChieu: thongTinPhim?.ngayKhoiChieu,
            dangChieu: thongTinPhim?.dangChieu,
            sapChieu: thongTinPhim?.sapChieu,
            hot: thongTinPhim?.hot,
            danhGia: thongTinPhim?.danhGia,
            hinhAnh: null,
            // maNhom:GROUPID
        },
        onSubmit: (values) => {
            
            values.maNhom = GROUPID
            //Tạo đối tượng form data
            let formData = new FormData();
            for (let key in values) {
                // formData.append(key, values[key])
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key])
                } else {
                    if (values.hinhAnh !== null) {
                        formData.append('File', values.hinhAnh, values.hinhAnh.name)
                    }

                }
            }

            //Cập nhật phim upload action
            dispatch(capNhatPhimUpLoadAction(formData))


        }

    })
    const [imgSrc, setImgSrc] = useState('')
    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    const handleChangeDatePicker = (value) => {
        // console.log('datepicker',moment(value).format('DD/MM/YYYY'))
        let ngayKhoiChieu = moment(value)
        formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu)
    }
    const handleChangeSwitch = (name) => {
        return (value) => {
            formik.setFieldValue(name, value)
        }
    }
    const handleChangeInputNumber = (name) => {
        return (value) => {
            formik.setFieldValue(name, value)
        }
    }
    const handleChangeFile = async (e) => {
        //Lấy file ra từ e
        let file = e.target.files[0];
        if (file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/png') {
            //Tạo đối tượng để lọc file
            let reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = (e) => {
                console.log(e.target.result)
                setImgSrc(e.target.result)
            }
            // console.log('file', file)
            //đem dữ liệu file lưu vài formil
            await formik.setFieldValue('hinhAnh', file)
        }
    }
    useEffect(() => {
        let { id } = props.match.params
        dispatch(layThongTinPhimAction(id))
    }, [])
    return (
        <div>
            <Form
                onSubmitCapture={formik.handleSubmit}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                initialValues={{
                    size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
                className='container '
                
                
            >
                <h3 className='font-bold text-3xl pb-4'>CẬT NHẬT PHIM</h3>
                <div className='grid grid-cols-2 gap-2 table-shadow p-5'>
                    <div className='w-full' >
                        <Form.Item label="Tên phim: " >
                            <Input name='tenPhim' onChange={formik.handleChange} value={formik.values.tenPhim} />
                        </Form.Item>
                        <Form.Item label="Trailer: ">
                            <Input name='trailer' onChange={formik.handleChange} value={formik.values.trailer} />
                        </Form.Item>
                        <Form.Item label="Mô tả: ">
                            <TextArea name='moTa' onChange={formik.handleChange} value={formik.values.moTa} rows={14}  />
                        </Form.Item>
                        <Form.Item label="Ngày khởi chiếu: ">
                            <DatePicker format={'DD/MM/YYYY'} onChange={handleChangeDatePicker} value={moment(formik.values.ngayKhoiChieu)} />
                        </Form.Item>

                    </div>
                    <div className='w-full'>
                        <Form.Item label="Đang chiếu: " >
                            <Switch name="dangChieu" onChange={handleChangeSwitch('dangChieu')} checked={formik.values.dangChieu} />
                        </Form.Item>
                        <Form.Item label="Sắp chiếu: " >
                            <Switch name="sapChieu" onChange={handleChangeSwitch('sapChieu')} checked={formik.values.sapChieu} />
                        </Form.Item>
                        <Form.Item label="Hot" >
                            <Switch name="hot" onChange={handleChangeSwitch('hot')} checked={formik.values.hot} />
                        </Form.Item>
                        <Form.Item label="Số sao">
                            <InputNumber onChange={handleChangeInputNumber('danhGia')} min={1} max={10} value={formik.values.danhGia} />
                        </Form.Item>
                        <Form.Item label="Hình ảnh">
                            <input type='file' onChange={handleChangeFile} />
                            <br />
                            <img style={{ width: 150, height: 150 * 4 / 3 }} src={imgSrc === '' ? thongTinPhim.hinhAnh : imgSrc} alt='' accept='image/png, image/jpeg, image/gif' />
                        </Form.Item>

                        <Form.Item label="Tác vụ">
                            <button type='submit' className='bg-blue-700 text-white p-2'>Cập nhật Phim</button>
                        </Form.Item>
                    </div>
                </div>






            </Form>
        </div>
    )
}
