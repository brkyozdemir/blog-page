import { atom } from 'recoil';

const tokenState = atom({
    key: "token",
    default: "token"
})

export { tokenState };