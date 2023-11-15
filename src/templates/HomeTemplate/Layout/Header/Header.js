import React, { Fragment, useState } from 'react'
import { NavLink } from 'react-router-dom/cjs/react-router-dom'
import { history } from '../../../../App'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import './Header.css'
import logo from '../../../../assets/img/logo/logo_mhp.png'
import { Popover } from 'antd'
import { TOKEN, USER_LOGIN } from '../../../../ultil/settings/config'
import { OPEN_FORM_REGISTER } from '../../../../redux/actions/types/DrawerTypes'
import Register from '../../../../component/Register/Register'
import { Disclosure, Menu } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function Header(props) {
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)
    const dispatch = useDispatch()
    const renderLogin = () => {
        if (_.isEmpty(userLogin)) {
            return <div className='flex'>
                <div onClick={() => {
                    history.push('/login')
                }} className="self-center px-3 py-3  font-medium hover-film tracking-wide cursor-pointer hidden md:block">Sign In</div>
                <div className="self-center px-3 py-3 font-medium hover-film tracking-wide cursor-pointer hidden md:block"
                    onClick={() => {
                        dispatch({
                            type: OPEN_FORM_REGISTER,
                            Component: <Register />,
                            title: ''
                        })
                    }}>Sign up</div>
            </div>
        }
        return <div className="text-right">
            <Popover placement="bottomRight" title={<div className='font-normal border-b-2'>User infomation</div>} content={contentHeaderCheckout}>
                <div className="flex flex-row-reverse items-center mr-4" style={{ cursor: 'pointer' }}>
                    <span className="profile-name ml-2 font-medium hidden md:block" style={{ color: 'white', fontSize: '16px' }}>Hello! {userLogin.taiKhoan.toUpperCase()} <i className="fa-solid fa-caret-down"></i>

                    </span>
                    <div className="flex items-center">
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'transparent',
                                border: '2px solid orange',
                                borderRadius: '50%',
                            }}
                            className="text-base lg:text-2xl rounded-full uppercase lg:w-12 lg:h-12 w-9 h-9"
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


    const [isNavOpen, setIsNavOpen] = useState(false);


    const currentPath = window.location.pathname;

    const navigation = [
        { name: 'Home', href: '/home', current: currentPath === '/home' },
        { name: 'Cinemas', href: '/cinemas', current: currentPath === '/cinemas' },
        { name: 'Experience', href: '/experience', current: currentPath === '/experience' },
        { name: 'Membership', href: '/membership', current: currentPath === '/membership' },
        { name: 'Family', href: '/family', current: currentPath === '/family' },
    ];

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (


        <Disclosure as="nav" className="bg-gray-800 header-bg fixed text-white w-full pt-2 " style={{ zIndex: 100, height: 76 }}>
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-white  hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-center sm:justify-center">
                                <div className="flex flex-shrink-0 items-center">
                                    <NavLink to='/' rel="noopener noreferrer" aria-label="Back to homepage" className="flex items-center hover:text-yellow-500 hover:no-underline transition ease-in-out duration-300 ">
                                        <div className='flex px-5'>
                                            <img src={logo} alt="mhpcinema" style={{ height: 60, width: 60 }} />
                                            <div className='pl-2 hidden lg:block font-bold tracking-wider '>
                                                <span className=' text-xl'>MHP</span>
                                                <p className='text-xl'>CINEMAS</p>
                                            </div>
                                        </div>
                                    </NavLink>

                                </div>
                                <div className="hidden md:ml-6 md:block">
                                    <div className="flex space-x-4 justify-center items-center">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current ? ' text-yellow-500 hover:text-yellow-500 hover:no-underline text-base font-light' : ' text-base font-light hover:text-yellow-500 hover:no-underline transition ease-in-out duration-300',
                                                    'rounded-md px-3 py-2 text-sm font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                        
                                    </div>
                                </div>
                                <div className="absolute items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 mx-5 hidden md:flex">
                                    <Menu as="div" className="relative">
                                        {renderLogin()}
                                    </Menu>
                                </div>
                            </div>

                        </div>
                    </div>

                    <Disclosure.Panel className="md:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2 bg-gray-900">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>




    )
}
