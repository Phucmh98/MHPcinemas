import React from 'react'
import { Button, ConfigProvider, Input, Modal } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined, SmileOutlined, MailOutlined } from '@ant-design/icons';
import { withFormik } from 'formik'
import * as Yup from 'yup';
import { connect, useDispatch, useSelector } from 'react-redux';


import { useEffect } from 'react';



import { CLOSE_DRAWER, RESET_NOTIFI } from '../../redux/actions/types/DrawerTypes';
import { dangKyAction } from '../../redux/actions/QuanLyNguoiDungAction';
function Register(props) {
    const { notifi, content } = useSelector(state => state.drawerReducer);

    const dispatch = useDispatch();
    const {
        errors,
        handleChange,
        handleSubmit,
    } = props;

    useEffect(() => {
        if (notifi !== null) {
            if (notifi) {
                success();
            } else {
                error();
            }
        }
    }, [notifi]);



    const success = () => {
        Modal.success({
            title: 'ĐĂNG KÝ THÀNH CÔNG',
            content: 'Mời bạn trải nghiệm sản phẩm của chúng tôi',
            onOk: () => {
                dispatch({
                    type: RESET_NOTIFI
                });
                dispatch({
                    type: CLOSE_DRAWER
                })

            }
        });
    };


    const error = () => {
        Modal.error({
            title: 'REGISTER FAIL',
            content: content,
            onOk: () => {
                dispatch({
                    type: RESET_NOTIFI
                })
            }
        });
    };
    return (
        <ConfigProvider theme={{
            token: {

                fontFamily: `'Kanit', sans-serif`,

            },
        }}>
            <form onSubmit={handleSubmit} className="container"  >
                <div className='move_register' style={{ height: '100%' }}>

                    <div className="d-flex flex-column justify-content-center align-items-center bg_login_register " style={{ height: '100%' }} >
                        <h3 className="text-center" style={{ fontSize: 40, color: 'white', fontWeight: 'bold', lineHeight: '1.5' }}>REGISTER</h3>
                        <div>

                            <div className="d-flex mt-3" >
                                <Input onChange={handleChange} style={{ width: '100%', minWidth: 300, borderRadius: '20px' }} name="taiKhoan" size="large" placeholder="User" prefix={<UserOutlined />} className='borderInput' />
                            </div>
                            <div className="text-red-600">{errors.taiKhoan}</div>
                            <div className="d-flex mt-3">
                                <Input onChange={handleChange} style={{ width: '100%', minWidth: 300, borderRadius: '20px' }} type="password" name="matKhau" size="large" placeholder="Password" prefix={<LockOutlined />} className='borderInput' />

                            </div>
                            <div className="text-red-600">{errors.matKhau}</div>
                        </div>

                        <div>
                            <div className="d-flex mt-3">
                                <Input onChange={handleChange} style={{ width: '100%', minWidth: 300, borderRadius: '20px' }} type="password" name="matKhauConfirm" size="large" placeholder="Password Confirm" prefix={<LockOutlined />} className='borderInput' /></div>
                            <div className="text-red-600">{errors.matKhauConfirm}</div>
                        </div>


                        <div>
                            <div className="d-flex mt-3">
                                <Input onChange={handleChange} style={{ width: '100%', minWidth: 300, borderRadius: '20px' }} type="email" name="email" size="large" placeholder=" Email" prefix={<MailOutlined />} className='borderInput' /></div>
                            <div className="text-red-600">{errors.email}</div>
                        </div>
                        <div>
                            <div className="d-flex mt-3">
                                <Input onChange={handleChange} style={{ width: '100%', minWidth: 300, borderRadius: '20px' }} type="tel" name="soDt" size="large" placeholder="Phone Number" prefix={<PhoneOutlined />} className='borderInput' /></div>
                            <div className="text-red-600">{errors.soDt}</div>
                        </div>
                        <div >
                            <div className="d-flex mt-3">
                                <Input onChange={handleChange} style={{ width: '100%', minWidth: 300, borderRadius: '20px' }} name="hoTen" size="large" placeholder="Name" prefix={<SmileOutlined />} className='borderInput' /></div >
                            <div className="text-red-600">{errors.hoTen}</div>
                        </div >
                        <div className='row justify-center'>
                            <Button htmlType="submit" size="large" style={{ minWidth: 150, backgroundColor: 'rgb(225, 103, 13)', color: '#fff' }} className="mt-5 col-6 btn_login" onClick={

                                () => { }

                            }>Ok</Button>

                            <Button size="large" style={{ minWidth: 150, backgroundColor: 'transparent', color: '#fff' }} className="mt-5 col-6 btn_register" onClick={() => {
                                dispatch({
                                    type: CLOSE_DRAWER
                                })
                            }}>Cancel</Button>
                        </div>
                    </div>
                </div>
            </form>
        </ConfigProvider>

    )
}

const RegisterWithFormik = withFormik({
    mapPropsToValues: () => ({
        taiKhoan: '',
        matKhau: '',
        matKhauConfirm: '', // Thêm trường này cho xác nhận mật khẩu
        email: '',
        soDt: '',
        maNhom: '',
        hoTen: ''
    }),
    validationSchema: Yup.object().shape({
        taiKhoan: Yup.string().required('User is required!'),
        matKhau: Yup.string().required('Password is required!').min(6, 'Password must have min 6 characters').max(32, 'Password have max 32 characters'),
        matKhauConfirm: Yup.string()
            .oneOf([Yup.ref('matKhau'), null], 'Passwords must match')
            .required('Password confirmation is required'),
        email: Yup.string().required('Email is required!').email('Email is invalid!'),
        soDt: Yup.string().required('Phone number is required').matches(/^\d+$/, 'Phone number must be a number'),
        hoTen: Yup.string().required('Name is required!')
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        const { taiKhoan, matKhau, email, soDt, maNhom, hoTen } = values;

        const dataDangKy = {
            taiKhoan,
            matKhau,
            email,
            soDt,
            maNhom,
            hoTen
        };
        
        props.dispatch(dangKyAction(dataDangKy))
        setSubmitting(true)
    },
    displayName: 'Register',
})(Register);




export default connect()(RegisterWithFormik);