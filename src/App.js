import { Route, Switch, Redirect } from 'react-router-dom';
import Slots from './pages/Slots';
import AllDates from './pages/AllDates';
import SlotDetail from './pages/SlotDetail';
import NewSlot from './pages/NewSlot';
import NotFound from './pages/NotFound';
import Layout from './components/layout/Layout';
import AddSlot from './pages/AddSlot';
import SearchForm from './pages/SearchForm';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <Redirect to='/datelist' />
        </Route>
        <Route path='/datelist' exact>
          <AllDates />
        </Route>
        <Route path='/datelist/:dateId'>
          <Slots/>
        </Route>
        <Route path='/slot/:dateId/:slotId'>
          <SlotDetail/>
        </Route>
        <Route path='/new-slot'>
          <NewSlot />
        </Route>
        <Route path='/add-slot'>
          <AddSlot />
        </Route>
        <Route path='/search-slot'>
          <SearchForm />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
