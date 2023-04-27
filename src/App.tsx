import { useState } from 'react';
import SendbirdProvider from '@sendbird/uikit-react/SendbirdProvider'
import ChannelList from '@sendbird/uikit-react/ChannelList';
import Channel from '@sendbird/uikit-react/Channel';

import './App.css'
import '@sendbird/uikit-react/dist/index.css'

// import.meta.env is vite specific
// see https://vitejs.dev/guide/env-and-mode.html#env-variables
const APP_ID = import.meta.env.VITE_APP_ID ?? ''
const USER_ID = import.meta.env.VITE_USER_ID ?? ''
const NICKNAME = import.meta.env.VITE_NICKNAME ?? ''

function App() {
  const [channelUrl, setChannelUrl] = useState<string>('')
  return (
    <SendbirdProvider
        appId={APP_ID}
        userId={USER_ID}
        nickname={NICKNAME}
      >
        <div className='sendbird-support-chat'>
          <div className='sendbird-support-chat__channel-list'>
            <ChannelList
              onChannelSelect={(channel) => setChannelUrl(channel?.url)}
            />
          </div>
          <div className='sendbird-support-chat__channel'>
            <Channel channelUrl={channelUrl} />
          </div>
        </div>
      </SendbirdProvider>
  )
}

export default App
