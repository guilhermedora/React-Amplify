import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Login from '../App.jsx';
import Home from '../Pages/Home';
import ListScreen from '../Pages/ListImage';
import PreviewMap from '../Pages/PreviewMap';
import UploadScreen from '../Pages/UploadImage';

function ProtectedRoutes({ redirectTo }) {
    return true ? <Outlet /> : <Navigate to={redirectTo} />
}

export default function MainRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route element={<ProtectedRoutes redirectTo='/' />}>
                <Route path='/home' element={<Home />} />
                <Route path='/upload' element={<UploadScreen />} />
                <Route path='/list' element={<ListScreen />} />
                <Route path='/preview' element={<PreviewMap />} />
            </Route>
        </Routes>
    )
}