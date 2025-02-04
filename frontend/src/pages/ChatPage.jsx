import { useGetChannelsQuery } from '../api/channelsApi';
// import { useGetMessagesQuery } from '../api/messagesApi';

export const ChatPage = () => {
  const { data = [] } = useGetChannelsQuery();
  //const { data: dataMessages } = useGetMessagesQuery();

  return (
    <>
      <div>Eto chat</div>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </>
  );
};
