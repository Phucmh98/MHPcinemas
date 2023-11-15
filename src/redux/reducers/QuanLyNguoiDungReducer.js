import { TOKEN, USER_LOGIN } from "../../ultil/settings/config"
import { CHINH_SUA_NGUOI_DUNG, DANG_NHAP_ACTION, LAY_DANH_SACH_NGUOI_DUNG, LAY_THONG_TIN_TAI_KHOAN, SET_THONG_TIN_NGUOI_DUNG } from "../actions/types/QuanLyNguoiDungType"

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const stateDefault = {
    userLogin: user,
    thongTinNguoiDung: {

    },
    dataThongTinTaiKhoan: {

    },
    danhSachNguoiDung: {},
    thongTinNguoiDungChinhSua: {},
}

export const QuanLyNguoiDungReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case DANG_NHAP_ACTION: {

            const { thongTinDangNhap } = action;
            console.log('action', thongTinDangNhap.accessToken)
            localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinDangNhap));
            localStorage.setItem(TOKEN, thongTinDangNhap.accessToken);
            return { ...state, userLogin: thongTinDangNhap }
        }
        case SET_THONG_TIN_NGUOI_DUNG: {
            state.thongTinNguoiDung = action.thongTinNguoiDung
            return { ...state }
        }
        case LAY_THONG_TIN_TAI_KHOAN: {
            state.dataThongTinTaiKhoan = action.dataThongTinTaiKhoan
            return { ...state }
        }
        case LAY_DANH_SACH_NGUOI_DUNG: {
            const danhSachNguoiDung = action.danhSachNguoiDung.map(item => ({
                ...item,
                // Thay đổi các thuộc tính có giá trị null thành chuỗi trống
                taiKhoan: item.taiKhoan || 'N/A',
                hoTen: item.hoTen || 'N/A',
                email: item.email || 'N/A',
                soDt: item.soDt || 'N/A',
                matKhau: item.matKhau || 'N/A',
                maLoaiNguoiDung: "KhachHang"
                // ... thêm các thuộc tính khác
            }));

            return { ...state, danhSachNguoiDung };
        }
        case CHINH_SUA_NGUOI_DUNG: {
            state.thongTinNguoiDungChinhSua = action.thongTinNguoiDungChinhSua
            return { ...state }
        }

        default:
            return { ...state }
    }

}