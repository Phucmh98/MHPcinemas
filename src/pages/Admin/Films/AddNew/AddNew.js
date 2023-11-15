import React, { useState } from 'react'
import {
    DatePicker,
    Form,
    Input,
    InputNumber,
    Switch,
} from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { themPhimUpLoadHinhAction } from '../../../../redux/actions/QuanLyPhimActions';
import { GROUPID } from '../../../../ultil/settings/config';
import TextArea from 'antd/es/input/TextArea';
export default function AddNew(props) {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            tenPhim: '',
            trailer: '',
            moTa: '',
            ngayKhoiChieu: '',
            dangChieu: false,
            sapChieu: false,
            hot: false,
            danhGia: 0,
            hinhAnh: {},
           
        },
        onSubmit: (values) => {

            values.maNhom = GROUPID
            //Tạo đối tượng form data
            let formData = new FormData();
            for (let key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key])
                } else {
                    formData.append('File', values.hinhAnh, values.hinhAnh.name)
                }
            }
            //Gọi API đưa form data các giá trị formdata về backend
            dispatch(themPhimUpLoadHinhAction(formData))

        }
    })
    const [imgSrc, setImgSrc] = useState('')
    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    const handleChangeDatePicker = (value) => {

        let ngayKhoiChieu = moment(value).format('DD/MM/YYYY')
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
    const handleChangeFile = (e) => {
        //Lấy file ra từ e
        let file = e.target.files[0];
        if (file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/png'|| file.type === 'image/jpg') {
            //Tạo đối tượng để lọc file
            let reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = (e) => {
                setImgSrc(e.target.result)
            }

            //đem dữ liệu file lưu vài formil
            formik.setFieldValue('hinhAnh', file)
        }
    }
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
                className='container'
            >
                <h3 className='font-bold text-3xl pb-4'>THÊM MỚI PHIM</h3>
                <div className='grid grid-cols-2 gap-2 table-shadow p-5'>

                    <div className='w-full' >
                        <Form.Item label="Tên phim: ">
                            <Input name='tenPhim' onChange={formik.handleChange} />
                        </Form.Item>
                        <Form.Item label="Trailer: ">
                            <Input name='trailer' onChange={formik.handleChange} />
                        </Form.Item>
                        <Form.Item label="Mô tả: ">
                            <TextArea name='moTa' onChange={formik.handleChange} rows={14}  />
                        </Form.Item>
                        <Form.Item label="Ngày khởi chiếu: ">
                            <DatePicker format={'DD/MM/YYYY'} onChange={handleChangeDatePicker} />
                        </Form.Item>
                    </div>
                    <div className='w-full' >
                        <Form.Item label="Đang chiếu: " >
                            <Switch onChange={handleChangeSwitch('dangChieu')} />
                        </Form.Item>
                        <Form.Item label="Sắp chiếu: " >
                            <Switch onChange={handleChangeSwitch('sapChieu')} />
                        </Form.Item>
                        <Form.Item label="Hot" >
                            <Switch onChange={handleChangeSwitch('hot')} />
                        </Form.Item>

                        <Form.Item label="Số sao">
                            <InputNumber onChange={handleChangeInputNumber('danhGia')} min={1} max={10} />
                        </Form.Item>
                        <Form.Item label="Hình ảnh">
                            <input type='file' onChange={handleChangeFile} />
                            <br />
                            <img style={{ width: 150, height: 150 * 4 / 3 }} src={imgSrc} alt='...' accept='image/png, image/jpeg, image/gif' />
                        </Form.Item>

                        <Form.Item label="Tác vụ">
                            <button type='submit' className='bg-blue-700 text-white p-2'>Thêm Phim</button>
                        </Form.Item>
                    </div>
                </div>
            </Form>

        </div>
    )
}
