import { useState } from 'react'

import useSendbirdStateContext from '@sendbird/uikit-react/useSendbirdStateContext'
import sendbirdSelectors from '@sendbird/uikit-react/sendbirdSelectors'
import { SALESFORCE_API_URL, NICKNAME, USER_ID } from '../consts'
import { getRandomChannelName } from '../utils'

export default function ChannelListHeader() {
  const [ loading, setLoading ] = useState(false)
  const store = useSendbirdStateContext()
  const createGroupChannel = sendbirdSelectors.getCreateGroupChannel(store)
  return (
    <div className='sb-channel-list-header'>
      <div className='sb-channel-list-header__header'>Channels</div>
      <button
        className='sb-channel-list-header__button'
        disabled={loading}
        onClick={() => {
          setLoading(true)
          const title = getRandomChannelName()
          createGroupChannel({
            customType: 'SALESFORCE_SUPPORT_CHAT_CHANNEL',
            invitedUserIds: [USER_ID],
            name: title,
          })
            .then((channel) =>
              fetch(`${SALESFORCE_API_URL}/services/apexrest/cases`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Acess-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                  subject: title,
                  suppliedName: NICKNAME,
                  sendbirdUserId: USER_ID,
                  sendbirdChannelURL: channel.url,
                  isEinsteinBotCase: false,
                }),
              })
            )
            .then((response) => response.json())
            .then((data) => console.log('Case:', data))
            .catch((error) => console.error('Error:', error))
            .finally(() => setLoading(false))
        }}
      >Start chat</button>
    </div>
  )
}
