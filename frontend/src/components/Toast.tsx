import { toast } from 'react-toastify';

function Toast(type, message) {
  toast(message, { autoClose: 3000, type: type });
}

export default Toast;
