import { GROUPID } from "../ultil/settings/config";
import { baseService } from "./baseService"

export class QuanLyNguoiDungService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }
    dangNhap = (thongTinDangNhap) => {
        return this.post(`/api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap)
    }
    layThongTinNguoiDung = () => {
        return this.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`)
    }
    dangKy = (dataDangKy) => {
        return this.post(`/api/QuanLyNguoiDung/DangKy`,dataDangKy)
    }
    thongTinNguoiDung = (tokenId) => {
        return this.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`,tokenId)
    }
    capNhatThongTinNguoiDung = (dataCatNhat) => {
        return this.post(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,dataCatNhat)
    }
    layDanhSachNguoiDung = () => {
        return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`)
    }
    timKiemNguoiDung = (tuKhoa) => {
        return this.get(`/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${GROUPID}&tuKhoa=${tuKhoa}`)
    }
    xoaNguoiDung = (taiKhoan) => {
        return this.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
    }
    themNguoiDung = (dataNguoiDung) => {
        return this.post(`/api/QuanLyNguoiDung/ThemNguoiDung`,dataNguoiDung)
    }

}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();