import { Dialog , Loading} from 'quasar'
export function showErrorMessage(errorMEssage){
    Loading.hide()
    Dialog.create({
        title: 'Error',
        message: errorMEssage
    })
}