
import { ThongTinLichChieu } from '../../_core/models/ThongTinDatVe'
import { CHUYEN_TAB, DAT_VE, DAT_VE_HOAN_TAT, SET_CHI_TIET_PHONG_VE } from '../actions/types/QuanLyDatVeType'
const stateDefault = {
    chiTietPhongVe: new ThongTinLichChieu(),
    danhSachGheDangDat: [],
    danhSachGheKhachDat: [],
    tabActive: '1'
}

export const QuanLyDatVeReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case SET_CHI_TIET_PHONG_VE: {
            state.chiTietPhongVe = action.chiTietPhongVe
            // console.log('action',action)
            return { ...state }
        }
        case DAT_VE: {
            //cật nhật danh sách ghế đang đặt
            let danhSachGheCapNhat = [...state.danhSachGheDangDat]
            let index = danhSachGheCapNhat.findIndex(gheDD => gheDD.maGhe === action.gheDuocChon.maGhe)
            if (index !== -1) {
                //nếu tìm thấy ghế được chọn trong mản có nghĩa là trước click vào  rồi => xóa đi
                danhSachGheCapNhat.splice(index, 1)
            } else {
                danhSachGheCapNhat.push(action.gheDuocChon)
            }
            return { ...state, danhSachGheDangDat: danhSachGheCapNhat }
        }
        case DAT_VE_HOAN_TAT: {
            state.danhSachGheDangDat = [];
            return { ...state }
        }
        case CHUYEN_TAB: {
            state.tabActive = '2';
            return { ...state }
        }
        case 'CHANGE_TAB_ACTIVE': {
            state.tabActive = action.number
            return { ...state }
        }
        case 'DAT_GHE':{
            state.danhSachGheKhachDat = action.arrGheKhachDat;
            return {...state}
        }

        default: return { ...state }
    }
}