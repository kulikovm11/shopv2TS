import {useDispatch,useSelector,TypedUseSelectorHook} from 'react-redux'
import type {RootState,AppDispatch} from '../redux'

const useAppDispatch = () => useDispatch<AppDispatch>()
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export {useAppDispatch,useAppSelector}
