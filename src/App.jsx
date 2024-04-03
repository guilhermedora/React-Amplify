import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import Login from './Pages/Login';
import amplifyconfig from './amplifyconfiguration.json';

Amplify.configure(amplifyconfig);

function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        gap: 30
      }}
    >
      <Login />
    </div>
  )
}

export default App;