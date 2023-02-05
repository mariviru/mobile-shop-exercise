import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMobileScreen, faCartShopping, faBagShopping, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { ContextProvider } from "./utils/context";

import Header from './components/Header';
import Index from './pages/Index';
import Detail from './pages/Detail';

import './App.scss';

library.add(faMobileScreen, faCartShopping, faBagShopping, faMagnifyingGlass);

function App() {
  return (
    <ContextProvider>
      <main className="o-wrapper">
        <Router>
          <Header />
          <div className="o-container">
            <Routes>
              <Route exact path="/" element={<Index/>} />
              <Route path="/detail/:productId" element={<Detail/>} />
            </Routes>
          </div>
        </Router>
      </main>
    </ContextProvider>
  );
}

export default App;
