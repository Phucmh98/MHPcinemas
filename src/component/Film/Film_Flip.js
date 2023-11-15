import React, { useState } from 'react'
import './Film_Flip.css'
import { history } from '../../App'
import Modal from 'react-modal';



export default function Film_Flip(props) {
    const { item } = props;
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };


    const renderPopUp = () => {
        return <Modal
            style={{
                overlay: {
                    zIndex: 1000,
                },
                content: {
                    zIndex: 2000,
                },
            }}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="YouTube Video Popup"
            ariaHideApp={false}
        >
            <div className="iframe-container">
                <iframe
                    title="YouTube Video"
                    src={item.trailer}
                    allowFullScreen
                ></iframe>
            </div>
        </Modal>
    }
    return (
        <>
            {renderPopUp()}
            <div className="flip-card-inner">
                <div className="flip-card-top ml-7 mr-2" >
                    <div className="flip-card-img" style={{ backgroundImage: `url(${item.hinhAnh})` }}></div>
                    <div className="image-overlay" onClick={() => {
                        history.push(`/detail/${item.maPhim}`)
                    }}></div>
                    <button className='btn-play-trailer' onClick={openModal}>
                        <i className="fa-solid fa-play"></i>
                    </button>

                </div>
                <div className="flip-card-bot" >
                    <div className="text-2xl font-bold leading-8 text-white tracking-tight w-72 pl-2">{item.tenPhim}</div>
                </div>
            </div>
        </>

    )
}
