import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import { Layout, Menu, Breadcrumb, Popover } from 'antd';
import {
    FileOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { NavLink } from "react-router-dom";
import _ from "lodash";
import { history } from "../../App";
import { TOKEN, USER_LOGIN } from "../../ultil/settings/config";
import logo from '../../assets/img/logo/logo_mhp.png'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;



const AdminTemplate = (props) => { //path, exact, Component

    const { Component, ...restProps } = props;
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    const [collapsed, setCollapsed] = useState(false);
    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };

    useEffect(() => {
        window.scrollTo(0, 0);

    })

    if (!localStorage.getItem(USER_LOGIN)) {
        alert('Bạn không có quyền truy cập vào trang này !')
        return <Redirect to='/' />
    }

    if (userLogin.maLoaiNguoiDung !== 'QuanTri') {
        alert('Bạn không có quyền truy cập vào trang này !')
        return <Redirect to='/' />

    }

    const content = () => {
        return <Fragment>
            <div className="hover:text-blue-700" style={{ cursor: 'pointer' }} onClick={() => {
                history.push('/profile')
            }}>Thông tin cá nhân</div>
            <div className="mt-1 hover:text-blue-700" style={{ cursor: 'pointer' }} onClick={() => {
                localStorage.removeItem(USER_LOGIN);
                localStorage.removeItem(TOKEN);
                history.push('/home');
                window.location.reload();
            }}>
                LOGOUT <i className="fa-solid fa-right-from-bracket"></i>
            </div>
        </Fragment>
    }

    return <Route {...restProps} render={(propsRoute) => {
        return <Fragment>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                    <div className="logo flex p-1 pl-3 items-center">
                        <img src={logo} alt="..." height={50} width={50} />
                        <div className="text-lg text-white font-bold pl-2">
                            MHP MANAGEMENT
                        </div>
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <SubMenu key="sub1" icon={<UserOutlined />} title="Users">
                            <Menu.Item key="1" icon={<UserOutlined />}>
                                <NavLink to="/admin">Users</NavLink>
                            </Menu.Item>
                            <Menu.Item key="2" icon={<UserOutlined />}>
                                <NavLink to="/admin/user/addnewuser">Add User</NavLink>
                            </Menu.Item>
                        </SubMenu>





                        <SubMenu key="sub2" icon={<FileOutlined />} title="Films">
                            <Menu.Item key="3" icon={<FileOutlined />}>
                                <NavLink to="/admin/films">Films</NavLink>
                            </Menu.Item>
                            <Menu.Item key="4" icon={<FileOutlined />}>
                                <NavLink to="/admin/films/addnew">Add new</NavLink>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }} >
                        <div className="text-right pr-10 ">

                            <div className="flex flex-row-reverse" >
                                <Popover placement="bottomRight" title={<div className='font-normal border-b-2'>Thông tin</div>} content={content}>
                                    <div className="flex " style={{ cursor: 'pointer' }}>
                                        <div className="flex items-center">
                                            <div style={{ width: 50, height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="text-2xl ml-1 rounded-full bg-red-200">{userLogin.taiKhoan.substr(0, 1)}</div>
                                        </div>
                                        <span className="profile-name ml-1" style={{ color: 'white', fontSize: '16px' }}>Chào! {userLogin.taiKhoan.toUpperCase()} <i className="fa-solid fa-caret-down"></i>

                                        </span>
                                    </div>
                                </Popover>
                            </div>
                        </div>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: '85vh' }}>
                            <Component {...propsRoute} />
                        </div>
                    </Content>
                    <Footer className="text-lg font-semibold" style={{ textAlign: 'center' }}>
                        Developed by MHP</Footer>
                </Layout>
            </Layout>
        </Fragment>
    }} />
}


export default AdminTemplate;