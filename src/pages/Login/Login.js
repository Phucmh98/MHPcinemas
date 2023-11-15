
import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux';
import { dangNhapAction } from '../../redux/actions/QuanLyNguoiDungAction';
import { OPEN_FORM_REGISTER, RESET_NOTIFI } from '../../redux/actions/types/DrawerTypes';
import './Login.css'
import { Modal } from 'antd';
import Register from '../../component/Register/Register';

export default function Login(props) {
    const dispatch = useDispatch()
    const { notifiLogin, contentLogin } = useSelector(state => state.drawerReducer);
    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: '',
        },
        onSubmit: values => {
            
            const action = dangNhapAction(values);
            dispatch(action)
        },
    });
    useEffect(() => {
        if (notifiLogin !== null) {

            error();

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [notifiLogin]);

    const error = () => {
        Modal.error({
            title: 'LOGIN FAIL',
            content: contentLogin,
            onOk: () => {
                dispatch({
                    type: RESET_NOTIFI
                })
            }
        });
    };
    return (
        <div className='login-form-container'>
            <div className="login-form">
                <div className="text">
                    <div className='flex justify-center'>
                        <img src="./img/Logo/logo_mhp.png" alt="" style={{ height: 100, width: 100 }} />
                    </div>
                    <h3>Quick booking & quick payment</h3>
                </div>
                <form onSubmit={formik.handleSubmit} style={{ marginTop: '40px' }}>
                    <div className="field">
                        <div className="fas fa-envelope" />
                        <input className='input-login' name='taiKhoan' onChange={formik.handleChange} type="text" placeholder="User" />
                    </div>
                    <div className="field">
                        <div className="fas fa-lock" />
                        <input className='input-login' name='matKhau' onChange={formik.handleChange} type="password" placeholder="Password" />
                    </div>
                    <button className='btn-login'>LOGIN</button>
                    <div className="link cursor-pointer">
                        Not a member?
                        <span onClick={() => {
                            dispatch({
                                type: OPEN_FORM_REGISTER,
                                Component: <Register />,
                                title: ''
                            })
                        }}> Sign Up</span>
                    </div>
                </form>
            </div>
        </div>
    )
}
