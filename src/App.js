import logo from './logo.svg';
import './App.css';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import EnrolledCourses from './views/EnrolledCourses';
import AllCourses from './views/AllCourses';
import Navbar from './components/Navbar';
import LoginDialog from "./components/LoginDialog";
import MessageDialog from "./components/util/MessageDialog";

function App() {
    return (
        <Router>
            <Navbar/>
            <Switch>
                <Route path="/enrolled-courses" exact>
                    <EnrolledCourses/>
                </Route>
                <Route path="/debug" exact>
                    <MessageDialog />
                </Route>
                <Route path="/" exact>
                    <AllCourses/>
                </Route>
                <Route path="/*">
                    <div>
                        404 page not found
                    </div>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
