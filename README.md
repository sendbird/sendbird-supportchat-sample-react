# Sendbird Support Chat Sample for React
This is an example of [Sendbird Support Chat](https://sendbird.com/docs/support-chat/v1/overview) for React, implemented using [Sendbird UIKit](https://sendbird.com/docs/uikit/v3/react/overview).
<p>
Sendbird Support Chat: Salesforce Connector is a Sendbird Chat integration into your existing Salesforce Service Cloud that offers support focused chat experience with vast new features for agent productivity. With this Support Chat Salesforce sample app, you can quick start your client-side implementation.
</p>

# Getting started

## Requirements

```
node > 16.17.1
npm > 8
yarn can be used too
```

## Steps to run

Assuming you alraedy have [setup](https://sendbird.com/docs/support-chat/v1/overview)
sendbird support chat in your salesforce org.

1. Clone this repository.
2. Install dependencies with `npm install`.
3. Create a `.env` file in the root directory of the project.
  a. Use `.env.example` as a reference
  b. Fill in the values for the variables in `.env` file.
4. Install the project with `npm install`.
5. Run the project with `npm run dev`.

For more information, see [our documentation](https://sendbird.com/docs/support-chat/v1/salesforce-connector/integrate-with-salesforce-service-cloud#2-step-5-client-side-implementation).

## Architecture

* Chat can be found inside `src/components/App.tsx`
* Chat is implemented using [Sendbird UIKit](https://sendbird.com/docs/uikit/v3/react/overview)
* Channel list header is overriden to show custom header `src/components/ChannelListHeader.tsx`
* Support chat channels are almost similar to group channels, except they have these custom types
```
{
  customType: SALESFORCE_SUPPORT_CHAT_CHANNEL,
}
```
* Custom cover image is set for support chat channels using .env
```
VITE_CHANNEL_COVER_IMAGE
```

After the channel is initialized, we have to connect to Salesforce using the following API
```
fetch(`${SALESFORCE_API_URL}/services/apexrest/cases/`, {
  method: 'POST',
  body: JSON.stringify({
    subject: title,
    suppliedName: NICKNAME,
    sendbirdUserId: USER_ID,
    sendbirdChannelURL: channel.url,
    isEinsteinBotCase: false,
  }),
})
```
* Note > Salesforce API URL can have CORS issues, so we recommend using a proxy server to make the API call or disabling cors through salesforce dashboard

* Only after the above API is successful, Salesforce is notified about the new chat and the agent can start chatting with the customer.

## Disabled features

* Leave channel
* Invite members
* Reactions, Threads, Replies, Voice Message, Mentions
* Message search
* Message delete

> See `src/components/App.css` to see how we hide certain menus.
> Other features were disabled by passing `disable*` props to the components.
