import { useRef, useState } from 'react'

import useSendbirdStateContext from '@sendbird/uikit-react/useSendbirdStateContext'
import sendbirdSelectors from '@sendbird/uikit-react/sendbirdSelectors'
import { SALESFORCE_API_URL, NICKNAME, USER_ID, SALESFORCE_SUPPORT_CHAT_CHANNEL } from '../consts'
import { getRandomChannelName } from '../utils'
import { useGetCoverImg } from './hooks/useGetCoverImg'

export default function ChannelListHeader() {
  const [ loading, setLoading ] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)
  const getCoverImage = useGetCoverImg(imgRef)
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
          const coverImg = getCoverImage()
          createGroupChannel({
            customType: SALESFORCE_SUPPORT_CHAT_CHANNEL,
            invitedUserIds: [USER_ID],
            name: title,
            coverUrl: coverImg,
          })
            .then((channel) =>
              fetch(`${SALESFORCE_API_URL}/services/apexrest/cases/`, {
                method: 'POST',
                headers: {
                  'Referrer-Policy': 'no-referrer',
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
      <img
        className='sb-channel-list-header__hidden_img'
        src='../assets/channel-cover.jpg'
        ref={imgRef}
      />
    </div>
  )
}
