import { toast } from "react-toastify"


export const toaster = (type, message) => {

    const options = {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined
    }
    switch (type) {
        case 'success':
            return toast.success(message, options)
        case 'error':
            return toast.error(message, options)
        case 'info':
            return toast.info(message, options)
        case 'warn':
            return toast.warn(message, options)
        default:
            break;
    }
    return toast(message, {

    })
}