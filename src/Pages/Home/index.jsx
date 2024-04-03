import { useNavigate } from 'react-router-dom';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import { signOut } from 'aws-amplify/auth';
import {
    MainMenu,
    ProfileCard
} from '../../ui-components';
import amplifyconfig from '../../amplifyconfiguration.json';

Amplify.configure(amplifyconfig);

function Home() {
    const navigate = useNavigate();
    const MainMenuOpt = {
        "MainMenu": {
            padding: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '422px',
            gap: '10px'
        },
        "Button58521661": {
            width: '80%',
            height: '20%',
            alignSelf: 'center',
            marginBottom: '0px',
            fontSize: '20px',
            onClick: () => navigate("/upload")
        },
        "Button58521669": {
            width: '80%',
            height: '20%',
            alignSelf: 'center',
            fontSize: '20px',
            onClick: () => navigate("/list")
        },
        "Button5878425": {
            alignSelf: 'center',
            width: '80%',
            height: '20%',
            fontSize: '20px',
            onClick: () => handleSignOut()
        },
        "Frame 2858521642": {
            marginTop: '15px',
            width: '70%',
        },
        "Group 2": {
            width: '100%',
            display: 'flex',
            alignSelf: 'center'
        },
        "Frame 2858521643": {
            backgroundColor: 'white'
        }
    }

    async function handleSignOut() {
        try {
            await signOut({ global: true });
            navigate("/")
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

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
            <ProfileCard />
            <MainMenu overrides={MainMenuOpt} />
        </div>
    )
}

export default Home;