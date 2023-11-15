import { history } from "../../App"
import { quanLyPhimService } from "../../services/QuanLyPhimService"
import { notifiFunction } from "../../ultil/Notification/notification"
import { SET_DANH_SACH_PHIM, SET_THONG_TIN_PHIM } from "./types/QuanLyPhimType"


export const layDanhSachPhimAction = (tenPhim = '') => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.layDanhSachPhim(tenPhim)
            //sau khi lấy dự liệu từ api về => redux (reducer)
            dispatch({
                type: SET_DANH_SACH_PHIM,
                arrFilm: result.data.content
            })
        } catch (errors) {
            console.log('errors', errors)
        }
    }
}

export const themPhimUpLoadHinhAction = (formData) => {
    return async (dispatch) => {
        try {
            let result = await quanLyPhimService.themPhimUploadHinh(formData)
            notifiFunction('success', 'Thêm phim mới thành công!')
            console.log('result', result.data.content)
        } catch (err) {
            console.log(err)
            console.log(err.response?.data)
            console.log(err.response)
            notifiFunction('error', 'Thêm phim thất bại!')
        }
    }
}

export const capNhatPhimUpLoadAction = (formData) => {
    return async (dispatch) => {
        try {
            let result = await quanLyPhimService.capNhatPhimUpload(formData)
            history.push('/admin/films')
            dispatch(layDanhSachPhimAction())
            notifiFunction('success', 'Cật nhật thông tin thành công!')
        } catch (err) {
            console.log(err.response?.data)
            notifiFunction('error', 'Cật nhật thông tin thất bại! Bạn vui lòng thử lại.')
        }
    }
}

export const layThongTinPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {
            let result = await quanLyPhimService.layThongTinPhim(maPhim)
            dispatch({
                type: SET_THONG_TIN_PHIM,
                thongTinPhim: result.data.content
            })
        } catch (err) {
            console.log(err.response?.data)

        }
    }
}

export const xoaPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {
            let result = await quanLyPhimService.xoaPhim(maPhim)
            notifiFunction('success', 'Xóa phim thành công!')
            //sau khi xóa load lại danh sách 
            dispatch(layDanhSachPhimAction())

        } catch (err) {
            notifiFunction('error', 'Xóa phim thất bại')
            console.log(err.response?.data)
        }
    }
}

