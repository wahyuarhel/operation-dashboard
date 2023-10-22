import { setAlertMessage, setLoadingOverlay } from "redux/slice/transactionSlice"
import store from "redux/store/store"


const getState = store.getState().transaction;
const dispatch = store.dispatch;

function openLoadingOverLay(text: string) {
  dispatch(setLoadingOverlay({
    active: true,
    placeHolder: text
  }))
}

function closeLoadingOverLay() {
  dispatch(setLoadingOverlay({
    ...getState.loadingOverlay,
    active: false,
  }))
}

function openSuccessAlertMessage(title: string) {
  dispatch(setAlertMessage({
    isOpen: true,
    type: 'success',
    title: title,
    message: null
  }))
}
function openFailedAlertMessage(title: string, message: string) {
  dispatch(setAlertMessage({
    isOpen: true,
    type: 'alert',
    title: title,
    message: message
  }));
}

function closeAlertMessage() {
  dispatch(setAlertMessage({
    ...getState.alertMessage,
    isOpen: false
  }));
};

export {
  openLoadingOverLay,
  closeLoadingOverLay,
  openFailedAlertMessage,
  openSuccessAlertMessage,
  closeAlertMessage,
}