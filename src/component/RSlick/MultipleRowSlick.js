import React from "react";
import { SearchOutlined } from '@ant-design/icons';
import Film_Flip from "../Film/Film_Flip";
import { useDispatch } from "react-redux";
import { ConfigProvider, Space, Tabs } from "antd";
import './MultipleRowSlick.module.css'
import { SET_FILM_ALL, SET_FILM_DANG_CHIEU, SET_FILM_SAP_CHIEU } from "../../redux/actions/types/QuanLyPhimType";
import Search from "antd/es/input/Search";
import { layDanhSachPhimAction } from "../../redux/actions/QuanLyPhimActions";


const MultipleRowsSlick = (props) => {
    const dispatch = useDispatch()
    const renderFilms = () => {
        return props.arrFilm?.map((item, index) => {
            return <div key={index} className="mt-1 flex justify-center md:justify-start" >
                <Film_Flip item={item} />
            </div>
        })
    }

    const renderFilmDefault = () => {
        return props.arrFilmDefault?.map((item, index) => {
            return <div key={index} className="mt-1 flex justify-center md:justify-start" >
                <Film_Flip item={item} />
            </div>
        })
    }



    const items = [
        {
            key: '1',
            label: <div className={` px-3 py-1 font-semibold text-2xl `} onClick={() => {
                const action = {
                    type: SET_FILM_ALL,

                }
                dispatch(action)
            }}>SHOW ALL</div>,
            children: <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min gap-1 ">
                {renderFilmDefault()}
            </div>,
        },
        {
            key: '2',
            label: <div className={` px-3 py-1 font-semibold  text-2xl`} onClick={() => {
                const action = {
                    type: SET_FILM_DANG_CHIEU,
                }
                dispatch(action)
            }}>NOW SHOWING</div>,
            children: <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min gap-1 ">
                {renderFilms()}

            </div>,
        },
        {
            key: '3',
            label: <div className={` px-3 py-1 font-semibold  text-2xl`} onClick={() => {
                const action = {
                    type: SET_FILM_SAP_CHIEU,
                }
                dispatch(action)
            }}>COMING SOON</div>,
            children: <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min gap-1 ">
                {renderFilms()}
            </div>,
        },

    ];
    const onSearch = (value) => {
        console.log('onSelect', value);
        if (value === '') {
            dispatch(layDanhSachPhimAction())

        } else {
            dispatch(layDanhSachPhimAction(value))
        }

    };

    const operations = <Space direction="vertical">
        <Search
            size="large"
            placeholder="Find movie here"
            onSearch={onSearch}
            enterButton={<SearchOutlined />}
            style={{
                backgroundColor: 'transparent'
            }}
            className='w-28 md:w-52 lg:w-80'
        />

    </Space>

    return (
        <div>
            <ConfigProvider theme={{
                token: {
                    // Seed Token
                    colorPrimary: 'rgb(240 , 151, 17)',
                    colorText: '#FFF',
                    fontFamily: `'Kanit', sans-serif`,
                    colorBgContainer: 'transparent',
                    colorTextPlaceholder: '#708090',
                },
            }}>
                <Tabs defaultActiveKey="1" items={items} tabBarExtraContent={operations} >
                </Tabs>
            </ConfigProvider>
        </div>
    );
}

export default MultipleRowsSlick;