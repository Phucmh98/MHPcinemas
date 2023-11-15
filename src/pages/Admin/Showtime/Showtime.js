import React, { useEffect, useState } from 'react'
import { Button, Form, InputNumber, Select } from 'antd';
import { DatePicker } from 'antd';
import { quanLyRapService } from '../../../services/QuanLyRapService';
import { useFormik } from 'formik';
import moment from 'moment';
import { quanLyDatVeService } from '../../../services/QuanLyDatVeService';
import { notifiFunction } from '../../../ultil/Notification/notification';
import { history } from '../../../App';

export default function Showtime(props) {

  const formik = useFormik({
    initialValues: {
      maPhim: props.match.params.id,
      ngayChieuGioChieu: '',
      maRap: '',
      giaVe: '',
    },
    onSubmit: async (values) => {

      try {
        const result = await quanLyDatVeService.taoLichChieu(values)
        // alert(result.data.content)
        notifiFunction('success', 'Tạo lịch chiếu thành công!')
        history.goBack()
      } catch (err) {
        console.log('err', err.respone?.data)
        notifiFunction('error', 'Tạo lịch chiếu thất bại. Bạn vụi lòng thử lại sau!')
      }
    }
  })

  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: [],
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      let result = await quanLyRapService.layThongTinHeThongRap();
      setState({
        ...state,
        heThongRapChieu: result.data.content
      })
    } catch (err) {

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onOk = (values) => {

    console.log('values', values)
  }
  const onChangeDate = (values) => {
    formik.setFieldValue('ngayChieuGioChieu', moment(values).format('DD/MM/YYYY hh:mm:ss'))
    console.log(values);
  };
  const onChangeInputNumber = (values) => {
    formik.setFieldValue('giaVe', values)
  }
  const handleChangeHeThongRap = async (value) => {
    //Từ hệ thống rạp call api lấy thông tin rạp
    try {
      let result = await quanLyRapService.layThongTinCumRap(value)
      setState({
        ...state,
        cumRapChieu: result.data.content
      })
    } catch (err) {
      console.log('err', err.respone?.data)
    }
  }
  const handleChangeCumRap = (values) => {
    formik.setFieldValue('maRap', values)
  }
  const convertSelectHTR = () => {
    return state.heThongRapChieu?.map((htr, index) => {
      return { label: htr.tenHeThongRap, value: htr.maHeThongRap }
    })
  }

  let film = {}
  if (localStorage.getItem('filmParams')) {
    film = JSON.parse(localStorage.getItem('filmParams'))
  }
  return (
    <div className='container '>
      <h3 className='text-3xl font-bold pb-5'>Tạo lịch chiếu - {props.match.params.tenphim}</h3>
      <Form
        name="basic"

        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        onSubmitCapture={formik.handleSubmit}
        className='flex justify-center'
      >

        <div className='flex table-shadow p-4 w-5/6'>
          <div className='pr-5 w-1/3'>
            <img src={film.hinhAnh} alt="..." width={250} />
          </div>
          <div className='w-2/3'>
            <Form.Item label="Hệ thống rạp">
              <Select options={convertSelectHTR()} onChange={handleChangeHeThongRap} placeholder="Chọn hệ thống rạp" />
            </Form.Item>
            <Form.Item
              label="Cụm rạp"

            >
              <Select options={state.cumRapChieu?.map((cumRap, index) => ({ label: cumRap.tenCumRap, value: cumRap.maCumRap }))} onChange={handleChangeCumRap} placeholder="Cụm rạp" />
            </Form.Item>
            <Form.Item
              label="Ngày chiếu giờ chiếu"
            >
              <DatePicker onChange={onChangeDate} onOk={onOk} showTime format='DD/MM/YYYY hh:mm:ss' />
            </Form.Item>
            <Form.Item
              label="Giá vé"
            >
              <InputNumber min={75000} max={150000} onChange={onChangeInputNumber} />
            </Form.Item>
            <Form.Item
              label="Chức năng"
            >
              <Button htmlType='submit' type='primary'> Tạo lịch chiếu </Button>
            </Form.Item>
          </div>
        </div>

      </Form>
    </div>
  )
}
