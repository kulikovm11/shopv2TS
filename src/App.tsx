import {Route, Routes} from 'react-router-dom'
import {
    BlogPage,
    CartPage,
    LoginPage,
    MainPage,
    NotFound,
    ProductDescriptionPage,
    RegisterPage,
    WishListPage
} from "./pages";
import {ProfilePage} from "./pages";
import {MainLayout} from "./layout";
;

const App = () => {
    return (
        <>

            <Routes>

                <Route path={'/'} element={<MainLayout/>}>
                    <Route index element={<MainPage/>}/>
                    <Route path={':prodId'} element={<ProductDescriptionPage/>}/>
                    <Route path={'profile'} element={<ProfilePage/>}/>
                    <Route path={'login'} element={<LoginPage/>}/>
                    <Route path={'register'} element={<RegisterPage/>}/>
                    <Route path={'cart'} element={<CartPage/>}/>
                    <Route path={'wish'} element={<WishListPage/>}/>
                    <Route path={'blog'} element={<BlogPage/>}/>
                    <Route path={'*'} element={<NotFound/>}/>
                </Route>

            </Routes>
        </>

);
};

export {App};
