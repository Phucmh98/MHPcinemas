import React from 'react'
import { CLOSE_DRAWER, OPEN_DRAWER, OPEN_FORM_REGISTER, OPEN_LOGIN_NOTIFI_FAIL, OPEN_NOTIFI_FAIL, OPEN_NOTIFI_SUCCESS, RESET_NOTIFI } from '../actions/types/DrawerTypes'


const initialState = {
    visible: false,
    title: '',
    content: '',
    contentLogin: '',
    ComponentContentDrawer: <p>default</p>,

    notifi: null,
    notifiLogin: null
}

export const drawerReducer = (state = initialState, action) => {
    switch (action.type) {

        case OPEN_DRAWER:
            return { ...state, visible: true }
        case CLOSE_DRAWER:
            return { ...state, visible: false }
        case OPEN_FORM_REGISTER: {

            state.visible = true;
            state.ComponentContentDrawer = action.Component;
            state.title = action.title;
            return { ...state }
        }
        case OPEN_NOTIFI_SUCCESS: {
            state.notifi = true;
            state.visible = false;
            return { ...state }

        }
        case OPEN_NOTIFI_FAIL: {
            state.notifi = false;
            state.content = action.content
            return { ...state }

        }
        case OPEN_LOGIN_NOTIFI_FAIL: {
          
            state.notifiLogin = false;
            state.contentLogin = action.contentLogin
            return { ...state }

        }
        case RESET_NOTIFI: {
            return { ...state, notifi: null, content: '', notifiLogin: null, contentLogin: '' }

        }

        default:
            return state
    }
}
