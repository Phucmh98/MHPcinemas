import { history } from "../../App"
import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDung"
import { notifiFunction } from "../../ultil/Notification/notification"
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction"
import { OPEN_LOGIN_NOTIFI_FAIL, OPEN_NOTIFI_FAIL, OPEN_NOTIFI_SUCCESS } from "./types/DrawerTypes"
import { CHINH_SUA_NGUOI_DUNG, DANG_NHAP_ACTION, LAY_DANH_SACH_NGUOI_DUNG, LAY_THONG_TIN_TAI_KHOAN, SET_THONG_TIN_NGUOI_DUNG } from "./types/QuanLyNguoiDungType"

export const dangNhapAction = (thongTinDangNhap) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction)
            const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);
            if (result.data.statusCode === 200) {
                await dispatch(hideLoadingAction);
                await dispatch({
                    type: DANG_NHAP_ACTION,
                    thongTinDangNhap: result.data.content
                });
                history.goBack();
            }
        } catch (err) {
            dispatch(hideLoadingAction)
            console.log(err.response?.data)
            
            dispatch({
                type: OPEN_LOGIN_NOTIFI_FAIL,
                contentLogin: err.response?.data.content
            })
        }
    }
}
export const layThongTinNguoiDungAction = () => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction)

            const result = await quanLyNguoiDungService.layThongTinNguoiDung();
            if (result.data.statusCode === 200) {

                await dispatch({
                    type: SET_THONG_TIN_NGUOI_DUNG,
                    thongTinNguoiDung: result.data.content
                })
                await dispatch(hideLoadingAction)
            }
        } catch (err) {
            dispatch(hideLoadingAction)
            console.log(err.response?.data)
        }
    }
}
export const dangKyAction = (dataDangKy) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.dangKy(dataDangKy);
            if (result.data.statusCode === 200) {
                dispatch({
                    type: OPEN_NOTIFI_SUCCESS
                })
            }
        } catch (err) {
            console.log(err.response?.data)
            dispatch({
                type: OPEN_NOTIFI_FAIL,
                content: err.response?.data.content
            })
        }
    }
}
export const layThongTinTaiKhoan = (tokenId) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.thongTinNguoiDung(tokenId);
            if (result.data.statusCode === 200) {                
                dispatch({
                    type: LAY_THONG_TIN_TAI_KHOAN,
                    dataThongTinTaiKhoan: result.data.content
                })
            }
        } catch (err) {
            console.log(err.response?.data)
        }
    }
}
export const catNhapThongTinNguoiDungAction = (dataCatNhat) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.capNhatThongTinNguoiDung(dataCatNhat);
            
            if (result.data.statusCode === 200) {
                notifiFunction('success', 'Cập nhật thông tin cá nhân thành công!')
                history.goBack()
            }      
        } catch (err) {
            console.log(err.response?.data)
            notifiFunction('error', `Cập nhật thất bại. ${err.response?.data.content}!`)
        }
    }
}
export const layDanhSachNguoiDungAction = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.layDanhSachNguoiDung();
            
            if (result.data.statusCode === 200) {
                dispatch({
                    type: LAY_DANH_SACH_NGUOI_DUNG,
                    danhSachNguoiDung: result.data.content
                })
            }
        } catch (err) {
            console.log(err.response?.data)
        }
    }
}
export const TimKiemNguoiDungAction = (tuKhoa) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.timKiemNguoiDung(tuKhoa);
            
            if (result.data.statusCode === 200) {
                dispatch({
                    type: LAY_DANH_SACH_NGUOI_DUNG,
                    danhSachNguoiDung: result.data.content
                })
            }
        } catch (err) {
            console.log(err.response?.data)
        }
    }
}
export const xoaNguoiDungAction = (taiKhoan) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.xoaNguoiDung(taiKhoan);

            if (result.data.statusCode === 200) {
                dispatch(layDanhSachNguoiDungAction())
            }
            notifiFunction('success', 'Xóa tài khoản thành công!')
        } catch (err) {
            console.log(err.response?.data)
            notifiFunction('error', `${err.response?.data.content}`)
        }
    }
}
export const themNguoiDungAction = (dataNguoiDung) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.themNguoiDung(dataNguoiDung);
            console.log(result)
            if (result.data.statusCode === 200) {
                notifiFunction('success', 'Thêm mới người dùng thành công!')
                history.push('/admin')
            }
        } catch (err) {
            console.log(err.response?.data)
            notifiFunction('error', `${err.response?.data.content}`)
        }
    }
}


export const layThongTinNguoiDungChinhSuaAction = (dataNguoiDung) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.timKiemNguoiDung(dataNguoiDung);
            if (result.data.statusCode === 200) {
                dispatch({
                    type: CHINH_SUA_NGUOI_DUNG,
                    thongTinNguoiDungChinhSua: result.data.content
                })
            }

        } catch (err) {
            console.log(err.response?.data)

        }
    }
}