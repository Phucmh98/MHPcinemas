
import { quanLyDatVeService } from "../../services/QuanLyDatVeService"
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction"
import { CHUYEN_TAB, DAT_VE, DAT_VE_HOAN_TAT, SET_CHI_TIET_PHONG_VE } from "./types/QuanLyDatVeType"


export const layChiTietPhongVeAction = (maLichChieu) => {
    return async dispatch => {
        try {
            dispatch(displayLoadingAction)
            const result = await quanLyDatVeService.layChitietPhongVe(maLichChieu)
            
            if (result.status === 200) {
                await dispatch({
                    type: SET_CHI_TIET_PHONG_VE,
                    chiTietPhongVe: result.data.content
                })
                await dispatch(hideLoadingAction);
            }
        } catch (err) {

            dispatch(hideLoadingAction)
            console.log('err', err.respone?.data)
            console.log('err')
        }
    }
}

export const datVeAction = (ThongTinDatVe = new ThongTinDatVe()) => {
    return async dispatch => {
        try {
            dispatch(displayLoadingAction)
            const result = await quanLyDatVeService.datVe(ThongTinDatVe)

            //Dặt vé thành công gọi api load lại phòng vé
            await dispatch(layChiTietPhongVeAction(ThongTinDatVe.maLichChieu))
            await dispatch({ type: DAT_VE_HOAN_TAT })

            await dispatch(hideLoadingAction)
            dispatch({
                type: CHUYEN_TAB,

            })
        } catch (err) {
            console.log(err.respone?.data)
            dispatch(hideLoadingAction)
        }
    }
}
export const datGheAction = (ghe, maLichChieu) => {


    return async (dispatch, getState) => {

        //Đưa thông tin ghế lên reducer
        await dispatch({
            type: DAT_VE,
            gheDuocChon: ghe
        });

        //Call api về backend 
        let danhSachGheDangDat = getState().QuanLyDatVeReducer.danhSachGheDangDat;
        let taiKhoan = getState().QuanLyNguoiDungReducer.userLogin.taiKhoan;

        // console.log('danhSachGheDangDat', danhSachGheDangDat);
        // console.log('taiKhoan', taiKhoan);
        // console.log('maLichChieu', maLichChieu);
        //Biến mảng thành chuỗi
        danhSachGheDangDat = JSON.stringify(danhSachGheDangDat);

        //Call api signalR
        // connection.invoke('datGhe', taiKhoan, danhSachGheDangDat, maLichChieu.toLocaleString());




    }

}