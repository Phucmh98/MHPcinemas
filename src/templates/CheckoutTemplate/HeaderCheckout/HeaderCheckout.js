import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom/cjs/react-router-dom'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import { history } from '../../../App'
import { Popover } from 'antd'
import { TOKEN, USER_LOGIN } from '../../../ultil/settings/config'
import logoMHP from '../../../assets/img/logo/logo_mhp.png';
export default function HeaderCheckout(props) {

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)
    const renderLogin = () => {
        if (_.isEmpty(userLogin)) {
            return <Fragment>
                <button onClick={() => {
                    history.push('/login')
                }} className="self-center px-8 py-3 rounded">Sign In</button>
                <button className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900"
                    onClick={() => {
                        history.push('/register')
                    }}>Sign up</button>
            </Fragment>
        }
        return <div className="text-right pr-10 ">
            <Popover placement="bottomRight" title='User' content={contentHeaderCheckout}>
                <div className="flex flex-row-reverse items-center" style={{ cursor: 'pointer' }}>
                    <span className="profile-name ml-1 font-medium" style={{ color: 'white', fontSize: '16px' }}>Hello! {userLogin.taiKhoan.toUpperCase()} <i className="fa-solid fa-caret-down"></i>

                    </span>
                    <div className="flex items-center">
                        <div
                            style={{
                                width: 50,
                                height: 50,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'transparent',
                                border: '2px solid orange',
                                borderRadius: '50%',
                            }}
                            className="text-2xl ml-1 rounded-full uppercase"
                        >
                            {userLogin.taiKhoan.substr(0, 1)}
                        </div>
                    </div>
                </div>
            </Popover>
        </div>
    }
    const contentHeaderCheckout = () => {
        return <Fragment>
            <div className="mt-1 hover:text-blue-700 font-medium" style={{ cursor: 'pointer' }} onClick={() => {
                localStorage.removeItem(USER_LOGIN);
                localStorage.removeItem(TOKEN);
                history.push('/home');
                window.location.reload();
            }}>
                LOGOUT <i className="fa-solid fa-right-from-bracket"></i>
            </div>
        </Fragment>
    }

    return (
        <header className="text-white  w-full z-50 " style={{ position: 'absolute' }}>

            <nav className="navbar navbar-expand-lg  justify-content-between container  px-0" >
                <NavLink to='/' rel="noopener noreferrer" aria-label="Back to homepage" className="flex items-center hover:text-yellow-500 hover:no-underline transition ease-in-out duration-300 ">
                    <div className='flex '>
                        <img src={logoMHP} alt="mhpcinema" style={{ height: 60, width: 60 }} />
                        <div className='pl-2  font-bold tracking-wider '>
                            <span className='text-xl'>MHP</span>
                            <p className='text-xl'>CINEMAS</p>
                        </div>
                    </div>
                </NavLink>
                <div className="items-center flex-shrink-0 hidden lg:flex">
                    {renderLogin()}
                </div>
            </nav>
        </header>

    )
}
