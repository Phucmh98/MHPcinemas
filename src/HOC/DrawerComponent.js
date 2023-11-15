import React, { useState } from 'react'
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { CLOSE_DRAWER } from '../redux/actions/types/DrawerTypes';




export default function DrawerComponent(props) {



    const { visible, ComponentContentDrawer,title } = useSelector(state => state.drawerReducer);

    const dispatch = useDispatch();

    


    
    const onClose = () => {
        dispatch({ type: CLOSE_DRAWER });

    };
    return (
        <>
            {/* <button onClick={showDrawer}>showdrawer</button> */}
            <Drawer
                title={title}
                width={720}
                onClose={onClose}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
                style={{backgroundColor: 'rgb(11,28,58)'}}
               
            >
                {/* Nội dung thay đổi của drawer */}
                {ComponentContentDrawer}
     
            </Drawer>
        </>
    )
}
