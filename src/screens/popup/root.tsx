import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { X } from 'lucide-react';


export default function PopupRoot() {
  function closePopup() {
    window.parent.postMessage({
      type: 'myCustomEvent',
    }, '*');
  }

  function activateCreatorKickback() {
    window.parent.postMessage({
      type: 'open-url-yenoh',
      url: 'https://www.newegg.com/?nrtv_cid=7k6mf4dqcngtz&utm_source=howl-Steve%20Chan&utm_medium=affiliate&utm_campaign=afc-howl-Steve%20Chan-7k6mf4dqcngtz'
    }, '*');
  }

  return (
    <>
      <Button variant="ghost" size="icon" className='fixed top-1 right-1' onClick={closePopup}>
        <X className='w-[24px] h-[24px]' />
      </Button>
      <Typography display="heading-sm" as="h1">
        Affiliate program found!
      </Typography>
      <Button onClick={activateCreatorKickback}>
        Activate creator kickback
      </Button>
    </>
  )
}
