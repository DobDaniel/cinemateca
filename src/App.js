import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Details from "./components/Details";
import DetailsPerson from "./components/DetailsPerson";
import DetailsShow from "./components/DetailsShow";
import MainView from "./components/MainView";
import Popular from "./components/Popular";
function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/cinemateca" exact component={MainView} />
                <Route path="/movie/:movieID" component={Details} />
                <Route path="/show/:showID" component={DetailsShow} />
                <Route path="/person/:personID" component={DetailsPerson} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
