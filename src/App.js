import { Router, Switch } from 'react-router';
import './App.css';
import { createBrowserHistory } from 'history'
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import Home from './pages/Home/Home';
import News from './pages/News/News';
import Login from './pages/Login/Login';
import Detail from './pages/Detail/Detail';
import Checkout from './pages/Checkout/Checkout';
// import CheckoutTemplate from './templates/CheckoutTemplate/CheckoutTemplate';
import {  lazy } from 'react'
import CheckoutTemplate from './templates/CheckoutTemplate/CheckoutTemplate';
import { UserTemplate } from './templates/UserTemplate/UserTemplate';
import Loading from './component/Loading/Loading';
import Profile from './pages/Profile/Profile';
import AdminTemplate from './templates/AdminTemplate/AdminTemplate';
import Films from './pages/Admin/Films/Films';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import Showtime from './pages/Admin/Showtime/Showtime';
import AddNew from './pages/Admin/Films/AddNew/AddNew';
import Edit from './pages/Admin/Films/Edit/Edit';
import DrawerComponent from './HOC/DrawerComponent';
import AddNewUser from './pages/Admin/Dashboard/AddNewUser';
import EditUser from './pages/Admin/Dashboard/EditUser';
import Cinemas from './pages/Cinemas/Cinemas';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Experience from './pages/Experience/Experience';
import Membership from './pages/Membership/Membership';
import Family from './pages/Family/Family';
const CheckoutTemplateLazy = lazy(() => import('./templates/CheckoutTemplate/CheckoutTemplate'))

export const history = createBrowserHistory()
function App() {
  return (
    <div className="App">
      <Router history={history}>
        <DrawerComponent/>
        <Loading/>
        <Switch>
          <HomeTemplate path='/home' exact Component={Home} />
          <HomeTemplate path='/contact' exact Component={ErrorPage} />
          <HomeTemplate path='/news' exact Component={News} />
          <HomeTemplate path="/detail/:id" exact Component={Detail} />
          <AdminTemplate path='/profile' exact Component={Profile} />
          <HomeTemplate path='/cinemas' exact Component={Cinemas} />
          <HomeTemplate path='/experience' exact Component={Experience} />
          <HomeTemplate path='/membership' exact Component={Membership} />
          <HomeTemplate path='/Family' exact Component={Family} />
          
          

          <CheckoutTemplate path='/checkout/:maPhim/:maLichChieu' exact Component={Checkout} />


          <AdminTemplate  path='/admin/films' exact Component={Films}/>
          <AdminTemplate  path='/admin/films/addnew' exact Component={AddNew}/>
          <AdminTemplate  path='/admin/films/edit/:id' exact Component={Edit}/>
          <AdminTemplate  path='/admin/films/showtime/:id/:tenphim' exact Component={Showtime}/>
          <AdminTemplate  path='/admin' exact Component={Dashboard}/>
          <AdminTemplate  path='/admin/user/addnewuser' exact Component={AddNewUser}/>
          <AdminTemplate  path='/admin/user/edit/:taiKhoan' exact Component={EditUser}/>
          
          {/* <Suspense fallback={<h1>LOADING.....</h1>}>
            <CheckoutTemplateLazy path='/checkout/:id' exact Component={Checkout} />
          </Suspense> */}

          <UserTemplate path='/login' exact Component={Login} />
          <HomeTemplate path='/' exact Component={Home} />
          <HomeTemplate path='/errors' exact Component={ErrorPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
