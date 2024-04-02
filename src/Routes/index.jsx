import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import UploadScreen from '../Pages/UploadImage';
import ListScreen from '../Pages/ListImage';
import MainMenu from '../App.jsx'
import PreviewMap from '../Pages/PreviewMap/index.jsx';

function ProtectedRoutes({ redirectTo }) {
    return true ? <Outlet /> : <Navigate to={redirectTo} />
}

export default function MainRoutes() {
    return (
        <Routes>
            <Route path='/' element={<MainMenu />} />
            <Route element={<ProtectedRoutes redirectTo='/' />}>
                <Route path='/upload' element={<UploadScreen />} />
                <Route path='/list' element={<ListScreen />} />
                <Route path='/preview' element={<PreviewMap />} />
            </Route>
        </Routes>
    )
}