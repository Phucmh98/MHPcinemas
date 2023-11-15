import { quanLyRapService } from "../../services/QuanLyRapService"
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction"
import { SET_CHI_TIET_PHIM, SET_HE_THONG_RAP_CHIEU } from "./types/QuanLyRapType"

export const layDanhSachHeThongRapAction = () => {
    return async dispatch => {
        try {
            dispatch(displayLoadingAction)
            const result = await quanLyRapService.layDanhSachHeThongRap()

            if (result.status === 200) {
                await dispatch({
                    type: SET_HE_THONG_RAP_CHIEU,
                    heThongRapChieu: result.data.content
                })
                await dispatch(hideLoadingAction);
            }
        } catch (err) {
            dispatch(hideLoadingAction)
            console.log('err', err.response?.data)
        }
    }
}


export const layThongTinChiTietPhim = (id) => {
    return async dispatch => {

        try {
            dispatch(displayLoadingAction)
            const result = await quanLyRapService.layThongTinLichChieuPhim(id);

            //lấy dự liệu đưa lên reducer
            if (result.status === 200) {
                await dispatch({
                    type: SET_CHI_TIET_PHIM,
                    filmDetail: result.data.content
                })
                await dispatch(hideLoadingAction);
            }
        } catch (err) {
            dispatch(hideLoadingAction);
            console.log('err', err)
        }
    }
}