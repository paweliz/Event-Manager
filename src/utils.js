import Resizer from 'react-image-file-resizer';
import {
  EmailShareButton,
  FacebookShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';

export const resizeFile = (file, maxWidth, maxWeight) =>
  new Promise(resolve => {
    Resizer.imageFileResizer(
      file,
      maxWidth,
      maxWeight,
      'JPEG',
      90,
      0,
      uri => {
        resolve(uri);
      },
      'file',
    );
  });

export const ShareButtons = ({ events, id }) => {
  return (
    <>
      <EmailShareButton
        subject={`Join ${events?.title} event!`}
        body={`Hello, \njoin with me to the event ${events?.title}. This is the short description of the event:\n${events.description}.\n\nClick url below, see more details and join it!`}
        separator={'\n'}
        url={`https://pawel-lizurej-event-manager.vercel.app/events/${id}`}>
        <EmailIcon size={32} />
      </EmailShareButton>
      <FacebookShareButton
        quote={`Hello, \njoin with me to the event ${events?.title}. This is the short description of the event:\n${events.description}\n\nClick url below, see more details and join it!`}
        hashtag={events?.title?.replace(/\s/g, '')}
        url={`https://pawel-lizurej-event-manager.vercel.app/events/${id}`}>
        <FacebookIcon size={32} className={'ml-1'} />
      </FacebookShareButton>
      <TwitterShareButton
        title={`Hello, join with me to the event ${events?.title}. Click url below, see more details and join it!\n`}
        url={`https://pawel-lizurej-event-manager.vercel.app/events/${id}\n`}
        hashtags={[events?.title?.replace(/\s/g, '')]}>
        <TwitterIcon size={32} className={'ml-1'} />
      </TwitterShareButton>
      <RedditShareButton
        title={`Hello, join with me to the event ${events?.title}. Click url below, see more details and join it!\n`}
        url={`https://pawel-lizurej-event-manager.vercel.app/events/${id}\n`}>
        <RedditIcon size={32} className={'ml-1'} />
      </RedditShareButton>
      <TelegramShareButton
        title={`Hello, join with me to the event ${events?.title}. Click url below, see more details and join it!\n`}
        url={`https://pawel-lizurej-event-manager.vercel.app/events/${id}\n`}>
        <TelegramIcon size={32} className={'ml-1'} />
      </TelegramShareButton>
      <WhatsappShareButton
        title={`Hello, join with me to the event ${events?.title}. Click url below, see more details and join it!\n`}
        url={`https://pawel-lizurej-event-manager.vercel.app/events/${id}\n`}>
        <WhatsappIcon size={32} className={'ml-1'} />
      </WhatsappShareButton>
    </>
  );
};
